<script lang="ts" module>
	export interface DataTableSearchProps {
		/** Placeholder text */
		placeholder?: string;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { getDataTableContext } from './context.svelte';

	let { placeholder = 'Search...', class: className = '' }: DataTableSearchProps = $props();

	const ctx = getDataTableContext();
</script>

<div class="search-box {className}">
	<Search size={14} />
	{#if ctx.onServerSearch}
		<input
			type="text"
			{placeholder}
			value={ctx.serverSearchTerm}
			oninput={(e) => ctx.onServerSearch?.(e.currentTarget.value)}
		/>
	{:else}
		<input
			type="text"
			{placeholder}
			value={ctx.searchQuery}
			oninput={(e) => ctx.setSearchQuery(e.currentTarget.value)}
		/>
	{/if}
</div>

<style>
	.search-box {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-muted);
		flex: 1;
		max-width: 300px;
	}

	.search-box input {
		background: none;
		border: none;
		outline: none;
		color: var(--text-primary);
		font-size: 11px;
		font-family: var(--font-mono);
		width: 100%;
	}

	.search-box input::placeholder {
		color: var(--text-muted);
	}
</style>
