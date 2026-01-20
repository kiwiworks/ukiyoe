<script lang="ts" module>
	import type { OpenAPIV3, OpenAPIV3_1 } from './types.js';

	type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;
	type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;

	export interface ParametersTableProps {
		/** Array of parameter objects */
		parameters: (ParameterObject | ReferenceObject)[];
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { DataTable, Badge, Text } from '../index.js';
	import SchemaView from './SchemaView.svelte';

	let { parameters, class: className = '' }: ParametersTableProps = $props();

	// Filter out references (they should be resolved by the parser, but just in case)
	const resolvedParams = $derived(
		parameters.filter((p): p is ParameterObject => !('$ref' in p))
	);

	// Extract type from schema
	function getParamType(param: ParameterObject): string {
		const schema = param.schema as OpenAPIV3.SchemaObject | undefined;
		if (!schema) return 'any';
		if (schema.type === 'array') {
			const items = schema.items as OpenAPIV3.SchemaObject | undefined;
			return `${items?.type ?? 'any'}[]`;
		}
		return schema.type ?? 'any';
	}

	// Get location badge variant
	function getLocationVariant(location: string): 'default' | 'brand' | 'success' | 'warning' | 'danger' {
		switch (location) {
			case 'path': return 'brand';
			case 'query': return 'default';
			case 'header': return 'warning';
			case 'cookie': return 'danger';
			default: return 'default';
		}
	}

	const columns = [
		{ key: 'name', header: 'Name' },
		{ key: 'in', header: 'In' },
		{ key: 'type', header: 'Type' },
		{ key: 'required', header: 'Required' },
		{ key: 'description', header: 'Description' }
	];

	const rows = $derived(resolvedParams.map(param => ({
		name: param.name ?? '',
		in: param.in ?? '',
		type: getParamType(param),
		required: param.required ?? false,
		description: param.description ?? '',
		deprecated: param.deprecated ?? false,
		schema: param.schema
	})));
</script>

<div class={cn('', className)}>
	<DataTable {columns} data={rows} keyField="name" compact>
		{#snippet cell({ column, row })}
			{#if column.key === 'name'}
				<code class={cn('font-mono text-sm', row.deprecated && 'line-through text-text-muted')}>
					{row.name}
				</code>
			{:else if column.key === 'in'}
				<Badge variant={getLocationVariant(row.in)} size="xs" text={row.in} />
			{:else if column.key === 'type'}
				<code class="font-mono text-xs text-text-secondary">{row.type}</code>
			{:else if column.key === 'required'}
				{#if row.required}
					<Badge variant="danger" size="xs" text="required" />
				{:else}
					<Text variant="muted" size="xs">optional</Text>
				{/if}
			{:else if column.key === 'description'}
				<Text variant="secondary" size="xs">{row.description}</Text>
			{/if}
		{/snippet}
	</DataTable>
</div>
