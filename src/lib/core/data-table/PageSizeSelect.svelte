<script lang="ts" module>
	export interface DataTablePageSizeSelectProps {
		/** Label text */
		label?: string;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import Select from '../Select.svelte';
	import { getDataTableContext } from './context.svelte';

	let { label = 'Show', class: className = '' }: DataTablePageSizeSelectProps = $props();

	const ctx = getDataTableContext();

	const options = $derived(
		ctx.pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))
	);

	const currentValue = $derived(
		String(ctx.isServerPaginated ? (ctx.serverPagination?.pageSize ?? ctx.pageSize) : ctx.pageSize)
	);

	function handleChange(value: string) {
		const size = parseInt(value);
		if (ctx.isServerPaginated && ctx.onServerPageSizeChange) {
			ctx.onServerPageSizeChange(size);
		} else {
			ctx.setPageSize(size);
		}
	}
</script>

<div class="page-size-selector {className}">
	<span class="page-size-label">{label}</span>
	<Select
		value={currentValue}
		{options}
		size="sm"
		disabled={ctx.isLoading}
		onchange={handleChange}
		class="page-size-select"
	/>
</div>

<style>
	.page-size-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.page-size-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.page-size-selector :global(.page-size-select) {
		width: 5rem;
	}
</style>
