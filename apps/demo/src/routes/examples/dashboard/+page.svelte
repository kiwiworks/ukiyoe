<script lang="ts">
	import { PageHeader, Badge, Button } from 'ukiyoe/core';
	import { Code } from '@lucide/svelte';
	import ExampleViewer from '$lib/ExampleViewer.svelte';
	import DashboardExample from './DashboardExample.svelte';
	import source from './DashboardExample.svelte?raw';

	let showSource = $state(false);
</script>

<svelte:head>
	<title>Dashboard Example - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Dashboard" subtitle="Trading analytics dashboard composed from ukiyoe components">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="Example" />
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
		<DashboardExample />
	</ExampleViewer>
</div>
