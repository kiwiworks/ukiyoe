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

<div class="flex items-center gap-2 {className}">
	<span class="text-xs text-text-muted">{label}</span>
	<Select
		value={currentValue}
		{options}
		size="sm"
		disabled={ctx.isLoading}
		onchange={handleChange}
		class="w-20"
	/>
</div>
