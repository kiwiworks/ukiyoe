<script lang="ts" module>
	export interface DataTablePaginationProps {
		/** Show page size selector */
		showPageSize?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronLeft, ChevronRight, Loader2 } from '@lucide/svelte';
	import Select from '../Select.svelte';
	import { getDataTableContext } from './context.svelte';

	let { showPageSize = false, class: className = '' }: DataTablePaginationProps = $props();

	const ctx = getDataTableContext();

	function handlePrev() {
		if (ctx.isServerPaginated && ctx.onServerPrevPage) {
			ctx.onServerPrevPage();
		} else {
			ctx.prevPage();
		}
	}

	function handleNext() {
		if (ctx.isServerPaginated && ctx.onServerNextPage) {
			ctx.onServerNextPage();
		} else {
			ctx.nextPage();
		}
	}

	const pageSizeOptions = $derived(
		ctx.pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))
	);

	const currentPageSize = $derived(
		String(ctx.isServerPaginated ? (ctx.serverPagination?.pageSize ?? ctx.pageSize) : ctx.pageSize)
	);

	function handlePageSizeChange(value: string) {
		const size = parseInt(value);
		if (ctx.isServerPaginated && ctx.onServerPageSizeChange) {
			ctx.onServerPageSizeChange(size);
		} else {
			ctx.setPageSize(size);
		}
	}

	const showPagination = $derived(ctx.isServerPaginated || ctx.totalItems > 0);
</script>

{#if showPagination}
	<div class="flex items-center justify-between px-4 py-3 border-t border-border-subtle bg-bg-primary {className}">
		<div class="flex items-center gap-4">
			{#if showPageSize}
				<div class="flex items-center gap-2">
					<span class="text-xs text-text-muted">Show</span>
					<Select
						value={currentPageSize}
						options={pageSizeOptions}
						size="sm"
						disabled={ctx.isLoading}
						onchange={handlePageSizeChange}
						class="w-20"
					/>
				</div>
			{/if}
			<span class="text-[10px] text-text-muted">
				{#if ctx.isLoading}
					<Loader2 size={12} class="animate-spin" />
				{:else if ctx.totalItems !== null}
					{ctx.startItem}–{ctx.endItem} of {ctx.totalItems}
				{:else}
					{ctx.startItem}–{ctx.endItem}
				{/if}
			</span>
		</div>
		<div class="flex items-center gap-2">
			<button
				class="flex items-center justify-center w-7 h-7 bg-bg-secondary border border-border-subtle rounded-sm text-text-primary cursor-pointer transition-all duration-150 enabled:hover:bg-bg-hover enabled:hover:border-border-strong disabled:opacity-40 disabled:cursor-not-allowed"
				disabled={!ctx.canGoPrev || ctx.isLoading}
				onclick={handlePrev}
			>
				<ChevronLeft size={14} />
			</button>
			<span class="text-[10px] text-text-muted min-w-[60px] text-center">
				{#if ctx.totalPages !== null}
					{ctx.displayPage} / {ctx.totalPages}
				{:else}
					Page {ctx.displayPage}
				{/if}
			</span>
			<button
				class="flex items-center justify-center w-7 h-7 bg-bg-secondary border border-border-subtle rounded-sm text-text-primary cursor-pointer transition-all duration-150 enabled:hover:bg-bg-hover enabled:hover:border-border-strong disabled:opacity-40 disabled:cursor-not-allowed"
				disabled={!ctx.canGoNext || ctx.isLoading}
				onclick={handleNext}
			>
				<ChevronRight size={14} />
			</button>
		</div>
	</div>
{/if}
