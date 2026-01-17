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

<div class="flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border-subtle rounded-md text-text-muted flex-1 max-w-[300px] {className}">
	<Search size={14} />
	{#if ctx.onServerSearch}
		<input
			type="text"
			{placeholder}
			value={ctx.serverSearchTerm}
			oninput={(e) => ctx.onServerSearch?.(e.currentTarget.value)}
			class="bg-transparent border-none outline-none text-text-primary text-[11px] font-mono w-full placeholder:text-text-muted"
		/>
	{:else}
		<input
			type="text"
			{placeholder}
			value={ctx.searchQuery}
			oninput={(e) => ctx.setSearchQuery(e.currentTarget.value)}
			class="bg-transparent border-none outline-none text-text-primary text-[11px] font-mono w-full placeholder:text-text-muted"
		/>
	{/if}
</div>
