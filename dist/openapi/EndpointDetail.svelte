<script lang="ts" module>
	import type { Endpoint, OpenAPI, OpenAPIV3, OpenAPIV3_1 } from './types.js';

	export interface EndpointDetailProps {
		/** The endpoint to display */
		endpoint: Endpoint;
		/** The full OpenAPI spec (for schema lookups) */
		spec: OpenAPI.Document;
		/** Base URL for resolving relative server URLs */
		baseUrl?: string;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { getMethodColor, getMethodBgColor } from './utils.js';
	import { Heading, Text, Badge, Tabs, Alert, Markdown } from '../index.js';
	import ParametersTable from './ParametersTable.svelte';
	import SchemaView from './SchemaView.svelte';
	import EndpointTester from './EndpointTester.svelte';

	let { endpoint, spec, baseUrl, class: className = '' }: EndpointDetailProps = $props();

	const operation = $derived(
		endpoint.operation as OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject
	);

	// Extract parameters
	const parameters = $derived(operation.parameters ?? []);
	const hasParameters = $derived(parameters.length > 0);

	// Extract request body
	const requestBody = $derived(
		operation.requestBody as
			| OpenAPIV3.RequestBodyObject
			| OpenAPIV3_1.RequestBodyObject
			| undefined
	);
	const hasRequestBody = $derived(!!requestBody);

	// Extract responses
	const responses = $derived(operation.responses ?? {});
	const responseEntries = $derived(Object.entries(responses));
	const hasResponses = $derived(responseEntries.length > 0);

	// Determine available tabs
	const availableTabs = $derived.by(() => {
		const t: { value: string; label: string }[] = [];
		t.push({ value: 'try', label: 'Try It' });
		if (hasParameters) t.push({ value: 'parameters', label: `Parameters (${parameters.length})` });
		if (hasRequestBody) t.push({ value: 'request', label: 'Request Body' });
		if (hasResponses)
			t.push({ value: 'responses', label: `Responses (${responseEntries.length})` });
		return t;
	});

	let activeTab = $state('try');

	// Reset active tab when endpoint changes or if current tab is not available
	$effect(() => {
		const tabValues = availableTabs.map((t) => t.value);
		if (!tabValues.includes(activeTab)) {
			activeTab = tabValues[0] ?? 'parameters';
		}
	});
</script>

<div class={cn('space-y-lg', className)}>
	<!-- Header -->
	<div class="space-y-sm">
		<div class="flex items-center gap-md flex-wrap">
			<span
				class={cn(
					'px-md py-xs rounded-md font-mono text-sm uppercase font-bold',
					getMethodBgColor(endpoint.method),
					getMethodColor(endpoint.method)
				)}
			>
				{endpoint.method}
			</span>
			<code class="font-mono text-lg text-text-primary">{endpoint.path}</code>
			{#if endpoint.deprecated}
				<Badge variant="warning" size="xs" text="Deprecated" />
			{/if}
		</div>

		{#if endpoint.summary}
			<Heading level={2} size="md">{endpoint.summary}</Heading>
		{/if}

		{#if endpoint.description}
			<div class="prose prose-sm prose-invert max-w-none">
				<Markdown content={endpoint.description} />
			</div>
		{/if}

		{#if endpoint.operationId}
			<Text variant="muted" size="xs">
				Operation ID: <code class="font-mono">{endpoint.operationId}</code>
			</Text>
		{/if}
	</div>

	{#if endpoint.deprecated}
		<Alert variant="warning">
			This endpoint is deprecated and may be removed in a future version.
		</Alert>
	{/if}

	<!-- Content -->
	{#if availableTabs.length > 0}
		<Tabs tabs={availableTabs} bind:value={activeTab}>
			{#snippet children(tabValue)}
				{#if tabValue === 'try'}
					<EndpointTester {endpoint} {spec} {baseUrl} />
				{:else if tabValue === 'parameters' && hasParameters}
					<ParametersTable {parameters} />
				{:else if tabValue === 'request' && hasRequestBody}
					<div class="space-y-md">
						{#if requestBody?.description}
							<div class="prose prose-sm prose-invert max-w-none">
								<Markdown content={requestBody.description} />
							</div>
						{/if}
						{#if requestBody?.required}
							<Badge variant="danger" size="xs" text="Required" />
						{/if}
						{#if requestBody?.content}
							{@const contentTypes = Object.entries(requestBody.content)}
							{#each contentTypes as [contentType, mediaType]}
								<div class="space-y-sm">
									<Text variant="muted" size="xs">
										Content-Type: <code class="font-mono">{contentType}</code>
									</Text>
									{#if mediaType?.schema}
										<SchemaView schema={mediaType.schema} />
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				{:else if tabValue === 'responses' && hasResponses}
					<div class="space-y-lg">
						{#each responseEntries as [statusCode, response]}
							{@const res = response as OpenAPIV3.ResponseObject | OpenAPIV3_1.ResponseObject}
							<div class="space-y-sm">
								<div class="flex items-center gap-sm">
									<Badge
										variant={statusCode.startsWith('2')
											? 'success'
											: statusCode.startsWith('4')
												? 'warning'
												: statusCode.startsWith('5')
													? 'danger'
													: 'default'}
										size="sm"
										text={statusCode}
									/>
									{#if res.description}
										<Text variant="secondary" size="sm">{res.description}</Text>
									{/if}
								</div>
								{#if res.content}
									{@const contentTypes = Object.entries(res.content)}
									{#each contentTypes as [contentType, mediaType]}
										<div class="space-y-xs pl-lg">
											<Text variant="muted" size="xs">
												Content-Type: <code class="font-mono">{contentType}</code>
											</Text>
											{#if mediaType?.schema}
												<SchemaView schema={mediaType.schema} />
											{/if}
										</div>
									{/each}
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			{/snippet}
		</Tabs>
	{:else}
		<Text variant="muted">No parameters, request body, or responses defined.</Text>
	{/if}
</div>
