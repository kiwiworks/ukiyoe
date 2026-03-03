<script lang="ts">
	import { PageHeader, Badge, Button } from 'ukiyoe/core';
	import { Code } from '@lucide/svelte';
	import ExampleViewer from '$lib/ExampleViewer.svelte';
	import ApiExplorerExample from './ApiExplorerExample.svelte';
	import source from './ApiExplorerExample.svelte?raw';

	let showSource = $state(false);
</script>

<svelte:head>
	<title>API Explorer Example - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="API Explorer" subtitle="OpenAPI spec viewer powered by ukiyoe's OAS3 components">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="Example" />
		<Badge size="xs" variant="muted" text="OAS 3.1" />
	{/snippet}
	{#snippet actions()}
		<Button variant={showSource ? 'outline' : 'ghost'} size="xs" onClick={() => showSource = !showSource}>
			<Code size={14} />
			{showSource ? 'Hide' : 'View'} Source
		</Button>
	{/snippet}
</PageHeader>

<div class="mt-lg">
	<ExampleViewer {source} bind:expanded={showSource}>
		<ApiExplorerExample />
	</ExampleViewer>
</div>
