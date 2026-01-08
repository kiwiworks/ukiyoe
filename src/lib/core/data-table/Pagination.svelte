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
	<div class="data-table-footer {className}">
		<div class="footer-left">
			{#if showPageSize}
				<div class="page-size-selector">
					<span class="page-size-label">Show</span>
					<Select
						value={currentPageSize}
						options={pageSizeOptions}
						size="sm"
						disabled={ctx.isLoading}
						onchange={handlePageSizeChange}
						class="page-size-select"
					/>
				</div>
			{/if}
			<span class="pagination-info">
				{#if ctx.isLoading}
					<Loader2 size={12} class="spinner" />
				{:else if ctx.totalItems !== null}
					{ctx.startItem}–{ctx.endItem} of {ctx.totalItems}
				{:else}
					{ctx.startItem}–{ctx.endItem}
				{/if}
			</span>
		</div>
		<div class="pagination-controls">
			<button
				class="pagination-btn"
				disabled={!ctx.canGoPrev || ctx.isLoading}
				onclick={handlePrev}
			>
				<ChevronLeft size={14} />
			</button>
			<span class="page-indicator">
				{#if ctx.totalPages !== null}
					{ctx.displayPage} / {ctx.totalPages}
				{:else}
					Page {ctx.displayPage}
				{/if}
			</span>
			<button
				class="pagination-btn"
				disabled={!ctx.canGoNext || ctx.isLoading}
				onclick={handleNext}
			>
				<ChevronRight size={14} />
			</button>
		</div>
	</div>
{/if}

<style>
	.data-table-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-primary);
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

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

	.pagination-info {
		font-size: 10px;
		color: var(--text-muted);
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pagination-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.pagination-btn:hover:not(:disabled) {
		background: var(--bg-hover);
		border-color: var(--border-strong);
	}

	.pagination-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.page-indicator {
		font-size: 10px;
		color: var(--text-muted);
		min-width: 60px;
		text-align: center;
	}

	.pagination-info :global(.spinner) {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
