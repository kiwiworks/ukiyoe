<script lang="ts">
	import { PageHeader, Badge, Button } from 'ukiyoe/core';
	import { Code } from '@lucide/svelte';
	import ExampleViewer from '$lib/ExampleViewer.svelte';
	import ChatExample from './ChatExample.svelte';
	import source from './ChatExample.svelte?raw';

	let showSource = $state(false);
</script>

<svelte:head>
	<title>Chat Interface Example - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Chat Interface" subtitle="AI conversation UI built from agentic components">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="Example" />
		<Badge size="xs" variant="info" text="claude-3.5-sonnet" />
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
		<ChatExample />
	</ExampleViewer>
</div>
