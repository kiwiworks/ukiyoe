<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DataTableToolbarProps {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children: Snippet;
	}
</script>

<script lang="ts">
	let { class: className = '', children }: DataTableToolbarProps = $props();
</script>

<div class="data-table-toolbar {className}">
	{@render children()}
</div>

<style>
	.data-table-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-subtle);
		background: var(--bg-primary);
	}
</style>
