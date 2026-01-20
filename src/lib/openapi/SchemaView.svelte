<script lang="ts" module>
	import type { OpenAPIV3, OpenAPIV3_1 } from './types.js';

	type SchemaObject = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;
	type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;

	export interface SchemaViewProps {
		/** The schema to display */
		schema: SchemaObject | ReferenceObject | boolean;
		/** Nesting depth (for indentation) */
		depth?: number;
		/** Property name (when rendering as part of an object) */
		propertyName?: string;
		/** Whether this property is required */
		isRequired?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { Badge, Text, CodeBlock, Markdown, Button } from '../index.js';
	import SchemaView from './SchemaView.svelte';

	let {
		schema,
		depth = 0,
		propertyName,
		isRequired = false,
		class: className = ''
	}: SchemaViewProps = $props();

	// Handle boolean schemas (JSON Schema allows true/false)
	const isBooleanSchema = $derived(typeof schema === 'boolean');

	// Handle references (should be resolved, but handle gracefully)
	const isReference = $derived(!isBooleanSchema && '$ref' in (schema as object));

	// Cast to SchemaObject for easier access
	const schemaObj = $derived(isBooleanSchema || isReference ? null : (schema as SchemaObject));

	// Get the type display string
	function getTypeDisplay(s: SchemaObject | null): string {
		if (!s) return 'any';
		if (s.type === 'array') {
			const items = s.items as SchemaObject | undefined;
			if (items?.type) return `${items.type}[]`;
			return 'array';
		}
		if (Array.isArray(s.type)) {
			return s.type.join(' | ');
		}
		return s.type ?? 'any';
	}

	// Check if schema has nested properties
	const hasProperties = $derived(
		schemaObj?.properties && Object.keys(schemaObj.properties).length > 0
	);
	const hasItems = $derived(schemaObj?.type === 'array' && schemaObj?.items);
	const hasComposition = $derived(!!(schemaObj?.oneOf || schemaObj?.anyOf || schemaObj?.allOf));

	// Get required properties set
	const requiredProps = $derived(new Set(schemaObj?.required ?? []));

	// Determine if we should show expanded view
	const isExpandable = $derived(hasProperties || hasItems || hasComposition);

	// Track manual expansion override (null = use auto-expand based on depth)
	let expandOverride = $state<boolean | null>(null);

	// Auto-expand first 2 levels, but allow user override
	const isExpanded = $derived(expandOverride ?? depth < 2);

	// Format example as JSON
	const exampleJson = $derived(
		schemaObj?.example !== undefined ? JSON.stringify(schemaObj.example, null, 2) : null
	);
</script>

<div class={cn('', className)}>
	{#if isBooleanSchema}
		<!-- Boolean schema -->
		<div class="flex items-center gap-sm">
			{#if propertyName}
				<code class="font-mono text-sm text-text-primary">{propertyName}</code>
			{/if}
			<Badge variant="default" size="xs" text={schema ? 'any' : 'never'} />
		</div>
	{:else if isReference}
		<!-- Unresolved reference -->
		{@const ref = (schema as ReferenceObject).$ref}
		<div class="flex items-center gap-sm">
			{#if propertyName}
				<code class="font-mono text-sm text-text-primary">{propertyName}</code>
			{/if}
			<Badge variant="brand" size="xs" text="$ref" />
			<code class="font-mono text-xs text-text-muted">{ref}</code>
		</div>
	{:else if schemaObj}
		<!-- Normal schema -->
		<div class="space-y-xs">
			<!-- Property header -->
			<div class="flex items-center gap-sm flex-wrap">
				{#if propertyName}
					<code
						class={cn(
							'font-mono text-sm',
							schemaObj.deprecated ? 'line-through text-text-muted' : 'text-text-primary'
						)}
					>
						{propertyName}
					</code>
				{/if}

				<Badge variant="default" size="xs" text={getTypeDisplay(schemaObj)} />

				{#if isRequired}
					<Badge variant="danger" size="xs" text="required" />
				{/if}

				{#if schemaObj.deprecated}
					<Badge variant="warning" size="xs" text="deprecated" />
				{/if}

				{#if schemaObj.nullable}
					<Badge variant="default" size="xs" text="nullable" />
				{/if}

				{#if schemaObj.readOnly}
					<Badge variant="default" size="xs" text="read-only" />
				{/if}

				{#if schemaObj.writeOnly}
					<Badge variant="default" size="xs" text="write-only" />
				{/if}

				{#if isExpandable}
					<Button
						variant="ghost"
						size="xs"
						onclick={() => (expandOverride = !isExpanded)}
						class="!p-0 !min-w-0 text-text-muted hover:text-text-secondary"
					>
						{isExpanded ? '▼' : '▶'}
					</Button>
				{/if}
			</div>

			<!-- Description -->
			{#if schemaObj.description}
				<div class="pl-md prose prose-xs prose-invert max-w-none">
					<Markdown content={schemaObj.description} />
				</div>
			{/if}

			<!-- Constraints -->
			{#if schemaObj.enum}
				<div class="pl-md">
					<Text variant="muted" size="xs">
						Enum: {schemaObj.enum.map((v: unknown) => JSON.stringify(v)).join(', ')}
					</Text>
				</div>
			{/if}

			{#if schemaObj.format}
				<div class="pl-md">
					<Text variant="muted" size="xs">Format: {schemaObj.format}</Text>
				</div>
			{/if}

			{#if schemaObj.pattern}
				<div class="pl-md">
					<Text variant="muted" size="xs">
						Pattern: <code class="font-mono">{schemaObj.pattern}</code>
					</Text>
				</div>
			{/if}

			{#if schemaObj.minimum !== undefined || schemaObj.maximum !== undefined}
				<div class="pl-md">
					<Text variant="muted" size="xs">
						Range: {schemaObj.minimum ?? '-∞'} to {schemaObj.maximum ?? '∞'}
					</Text>
				</div>
			{/if}

			{#if schemaObj.minLength !== undefined || schemaObj.maxLength !== undefined}
				<div class="pl-md">
					<Text variant="muted" size="xs">
						Length: {schemaObj.minLength ?? 0} to {schemaObj.maxLength ?? '∞'}
					</Text>
				</div>
			{/if}

			<!-- Expanded content -->
			{#if isExpanded && isExpandable}
				<div class="pl-lg border-l border-border-subtle ml-sm mt-sm space-y-sm">
					<!-- Object properties -->
					{#if hasProperties}
						{@const properties = schemaObj.properties ?? {}}
						{#each Object.entries(properties) as [propName, propSchema]}
							<SchemaView
								schema={propSchema as SchemaObject | ReferenceObject}
								depth={depth + 1}
								propertyName={propName}
								isRequired={requiredProps.has(propName)}
							/>
						{/each}
					{/if}

					<!-- Array items -->
					{#if hasItems}
						{@const items = schemaObj.items as SchemaObject | ReferenceObject}
						<div class="space-y-xs">
							<Text variant="muted" size="xs">Array items:</Text>
							<SchemaView schema={items} depth={depth + 1} />
						</div>
					{/if}

					<!-- Composition (oneOf, anyOf, allOf) -->
					{#if schemaObj.oneOf}
						<div class="space-y-xs">
							<Text variant="muted" size="xs">One of:</Text>
							{#each schemaObj.oneOf as variant, i}
								<SchemaView schema={variant} depth={depth + 1} propertyName={`Option ${i + 1}`} />
							{/each}
						</div>
					{/if}

					{#if schemaObj.anyOf}
						<div class="space-y-xs">
							<Text variant="muted" size="xs">Any of:</Text>
							{#each schemaObj.anyOf as variant, i}
								<SchemaView schema={variant} depth={depth + 1} propertyName={`Option ${i + 1}`} />
							{/each}
						</div>
					{/if}

					{#if schemaObj.allOf}
						<div class="space-y-xs">
							<Text variant="muted" size="xs">All of:</Text>
							{#each schemaObj.allOf as variant, i}
								<SchemaView schema={variant} depth={depth + 1} propertyName={`Part ${i + 1}`} />
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Example -->
			{#if exampleJson && depth === 0}
				<div class="mt-md">
					<Text variant="muted" size="xs" class="mb-xs">Example:</Text>
					<CodeBlock code={exampleJson} language="json" />
				</div>
			{/if}
		</div>
	{/if}
</div>
