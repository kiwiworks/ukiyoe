<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DataTableTableProps {
		/** Compact row height */
		compact?: boolean;
		/** Striped rows */
		striped?: boolean;
		/** Hoverable rows */
		hoverable?: boolean;
		/** Sticky header */
		stickyHeader?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children (Header and Body) */
		children: Snippet;
	}
</script>

<script lang="ts">
	let {
		compact = false,
		striped = false,
		hoverable = true,
		stickyHeader = true,
		class: className = '',
		children
	}: DataTableTableProps = $props();
</script>

<div class="table-wrapper {className}" class:sticky-header={stickyHeader}>
	<table class:compact class:striped class:hoverable>
		{@render children()}
	</table>
</div>

<style>
	.table-wrapper {
		overflow: auto;
		flex: 1;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 11px;
		font-family: var(--font-mono);
	}

	table.compact {
		font-size: 10px;
	}

	:global(table.compact th),
	:global(table.compact td) {
		padding: 0.375rem 0.75rem;
	}

	:global(table.striped tbody tr:nth-child(odd)) {
		background: var(--bg-primary);
	}

	:global(table.hoverable tbody tr:hover) {
		background: var(--bg-hover);
	}

	.sticky-header :global(thead) {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
