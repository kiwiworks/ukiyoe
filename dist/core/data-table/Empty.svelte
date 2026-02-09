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

<div class="flex items-center justify-center p-8 text-text-muted text-[11px] font-mono {className}">
	{#if children}
		{@render children()}
	{:else}
		{message}
	{/if}
</div>
