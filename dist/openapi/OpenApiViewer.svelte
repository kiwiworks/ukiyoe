<script lang="ts" module>
	export type { OpenApiViewerProps } from './types.js';
</script>

<script lang="ts">
	import type { OpenApiViewerProps as OpenApiViewerPropsType, Endpoint } from './types.js';
	import { extractEndpoints, groupEndpointsByTag, getApiInfo } from './utils.js';
	import { cn } from '../utils/cn.js';
	import EndpointList from './EndpointList.svelte';
	import EndpointDetail from './EndpointDetail.svelte';
	import { Heading, Badge, Text, Markdown, Button } from '../index.js';
	import { Menu, X } from '@lucide/svelte';

	let { spec, baseUrl, class: className = '' }: OpenApiViewerPropsType = $props();

	const endpoints = $derived(extractEndpoints(spec));
	const groups = $derived(groupEndpointsByTag(endpoints, spec));
	const apiInfo = $derived(getApiInfo(spec));

	let selectedEndpoint = $state<Endpoint | null>(null);
	let sidebarOpen = $state(false);

	function handleSelectEndpoint(endpoint: Endpoint) {
		selectedEndpoint = endpoint;
		sidebarOpen = false;
	}
</script>

<div class={cn('flex flex-col h-full', className)}>
	<!-- Header -->
	<header class="shrink-0 pb-md border-b border-border-subtle">
		<div class="flex items-center gap-sm">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => (sidebarOpen = !sidebarOpen)}
				class="md:hidden"
				aria-label="Toggle sidebar"
			>
				{#if sidebarOpen}
					<X size={18} />
				{:else}
					<Menu size={18} />
				{/if}
			</Button>
			<Heading level={1} size="lg">{apiInfo.title}</Heading>
			<Badge size="sm" variant="default" text={`v${apiInfo.version}`} />
		</div>
		{#if apiInfo.description}
			<div class="mt-sm prose prose-sm prose-invert max-w-none">
				<Markdown content={apiInfo.description} />
			</div>
		{/if}
	</header>

	<div class="relative flex flex-1 overflow-hidden mt-md">
		<!-- Mobile backdrop -->
		{#if sidebarOpen}
			<button
				type="button"
				class="fixed inset-0 bg-black/30 z-[9] md:hidden"
				onclick={() => (sidebarOpen = false)}
				aria-label="Close sidebar"
			></button>
		{/if}

		<!-- Endpoint List Sidebar -->
		<aside
			class={cn(
				'w-72 shrink-0 overflow-y-auto border-r border-border-subtle pr-md',
				'max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-10 max-md:bg-bg-primary max-md:shadow-lg max-md:pl-md',
				sidebarOpen ? 'max-md:block' : 'max-md:hidden'
			)}
		>
			<EndpointList {groups} {selectedEndpoint} onSelect={handleSelectEndpoint} />
		</aside>

		<!-- Endpoint Detail -->
		<main class="flex-1 overflow-y-auto pl-lg max-md:pl-0">
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
