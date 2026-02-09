<script lang="ts" module>
	export type { OpenApiViewerProps } from './types.js';
</script>

<script lang="ts">
	import type { OpenApiViewerProps, Endpoint } from './types.js';
	import { extractEndpoints, groupEndpointsByTag, getApiInfo } from './utils.js';
	import { cn } from '../utils/cn.js';
	import EndpointList from './EndpointList.svelte';
	import EndpointDetail from './EndpointDetail.svelte';
	import { Heading, Badge, Text, Markdown } from '../index.js';

	let { spec, baseUrl, class: className = '' }: OpenApiViewerProps = $props();

	const endpoints = $derived(extractEndpoints(spec));
	const groups = $derived(groupEndpointsByTag(endpoints, spec));
	const apiInfo = $derived(getApiInfo(spec));

	let selectedEndpoint = $state<Endpoint | null>(null);

	function handleSelectEndpoint(endpoint: Endpoint) {
		selectedEndpoint = endpoint;
	}
</script>

<div class={cn('flex flex-col h-full', className)}>
	<!-- Header -->
	<header class="shrink-0 pb-md border-b border-border-subtle">
		<div class="flex items-center gap-sm">
			<Heading level={1} size="lg">{apiInfo.title}</Heading>
			<Badge size="sm" variant="default" text={`v${apiInfo.version}`} />
		</div>
		{#if apiInfo.description}
			<div class="mt-sm prose prose-sm prose-invert max-w-none">
				<Markdown content={apiInfo.description} />
			</div>
		{/if}
	</header>

	<div class="flex flex-1 overflow-hidden mt-md">
		<!-- Endpoint List Sidebar -->
		<aside class="w-72 shrink-0 overflow-y-auto border-r border-border-subtle pr-md">
			<EndpointList {groups} {selectedEndpoint} onSelect={handleSelectEndpoint} />
		</aside>

		<!-- Endpoint Detail -->
		<main class="flex-1 overflow-y-auto pl-lg">
			{#if selectedEndpoint}
				<EndpointDetail endpoint={selectedEndpoint} {spec} {baseUrl} />
			{:else}
				<div class="flex flex-col items-center justify-center h-full text-center">
					<Text variant="muted" size="lg">Select an endpoint to view details</Text>
					<Text variant="muted" size="sm" class="mt-sm">
						{endpoints.length} endpoints available
					</Text>
				</div>
			{/if}
		</main>
	</div>
</div>
