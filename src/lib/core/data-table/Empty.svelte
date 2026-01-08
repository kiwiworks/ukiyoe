<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DataTableEmptyProps {
		/** Message to display */
		message?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom content */
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { message = 'No data', class: className = '', children }: DataTableEmptyProps = $props();
</script>

<div class="empty-state {className}">
	{#if children}
		{@render children()}
	{:else}
		{message}
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: var(--text-muted);
		font-size: 11px;
		font-family: var(--font-mono);
	}
</style>
