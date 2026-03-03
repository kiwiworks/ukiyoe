<script lang="ts">
	import { PageHeader, Badge, Button } from 'ukiyoe/core';
	import { Code } from '@lucide/svelte';
	import ExampleViewer from '$lib/ExampleViewer.svelte';
	import SettingsExample from './SettingsExample.svelte';
	import source from './SettingsExample.svelte?raw';

	let showSource = $state(false);
</script>

<svelte:head>
	<title>Settings Example - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Settings" subtitle="Tabbed settings form showcasing form components">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="Example" />
		<Badge size="xs" variant="info" text="Pro Plan" />
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
		<SettingsExample />
	</ExampleViewer>
</div>
