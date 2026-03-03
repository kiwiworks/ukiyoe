<script lang="ts">
	import type { Snippet } from 'svelte';
	import { HighlightedCodeBlock } from 'ukiyoe/core';

	interface Props {
		source: string;
		expanded?: boolean;
		children: Snippet;
	}

	let { source, expanded = $bindable(false), children }: Props = $props();
</script>

<div>
	{@render children()}

	{#if expanded}
		<div class="mt-lg border border-border-subtle rounded-lg overflow-hidden bg-bg-secondary">
			<HighlightedCodeBlock code={source} language="svelte" showLineNumbers />
		</div>
	{/if}
</div>
