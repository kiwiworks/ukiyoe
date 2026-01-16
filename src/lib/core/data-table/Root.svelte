<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { Column, ServerPaginationState, SortDirection } from './types';

	export interface DataTableRootProps<T = Record<string, unknown>> {
		/** Array of data rows */
		data: T[];
		/** Column definitions */
		columns: Column<T>[];
		/** Unique key field for each row */
		keyField: string;
		/** Enable sorting */
		sortable?: boolean;
		/** Default sort column key */
		defaultSortKey?: string;
		/** Default sort direction */
		defaultSortDir?: SortDirection;
		/** Page size options for pagination */
		pageSizeOptions?: number[];
		/** Default page size */
		defaultPageSize?: number;
		/** Keys to search (defaults to all column keys) */
		searchKeys?: string[];
		/** Server-side pagination state */
		serverPagination?: ServerPaginationState;
		/** Server next page handler */
		onNextPage?: () => void;
		/** Server prev page handler */
		onPrevPage?: () => void;
		/** Server page size change handler */
		onPageSizeChange?: (size: number) => void;
		/** Server search handler */
		onSearch?: (term: string) => void;
		/** Server search term (controlled) */
		serverSearchTerm?: string;
		/** Row click handler */
		onRowClick?: (row: T) => void;
		/** Custom cell renderer */
		cell?: Snippet<[{ row: T; column: Column<T>; value: unknown }]>;
		/** Custom row renderer */
		row?: Snippet<[{ row: T; index: number }]>;
		/** Custom header cell renderer */
		header?: Snippet<[{ column: Column<T> }]>;
		/** Custom empty state */
		empty?: Snippet;
		/** Empty state message */
		emptyMessage?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children: Snippet;
	}
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { setDataTableContext } from './context.svelte';
	import type { DataTableContext } from './types';

	let {
		data,
		columns,
		keyField,
		sortable = false,
		defaultSortKey = '',
		defaultSortDir = 'asc',
		pageSizeOptions = [10, 25, 50, 100],
		defaultPageSize = 10,
		searchKeys = [],
		serverPagination,
		onNextPage,
		onPrevPage,
		onPageSizeChange,
		onSearch,
		serverSearchTerm = '',
		onRowClick,
		cell,
		row,
		header,
		empty,
		emptyMessage = 'No data',
		class: className = '',
		children
	}: DataTableRootProps<T> = $props();

	// Internal state - initialized with literals, synced via effects
	let sortKey = $state('');
	let sortDir = $state<SortDirection>('asc');
	let searchQuery = $state('');
	let currentPage = $state(0);
	let pageSize = $state(10);

	// Sync with prop changes
	$effect.pre(() => {
		sortKey = defaultSortKey;
	});

	$effect.pre(() => {
		sortDir = defaultSortDir;
	});

	$effect.pre(() => {
		pageSize = defaultPageSize;
	});

	// Reset page when search changes
	$effect(() => {
		if (searchQuery) {
			currentPage = 0;
		}
	});

	const isServerPaginated = $derived(!!serverPagination);

	// Helper to get nested values like 'user.name'
	function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
		return path.split('.').reduce<unknown>((acc, part) => {
			if (acc && typeof acc === 'object' && part in acc) {
				return (acc as Record<string, unknown>)[part];
			}
			return undefined;
		}, obj);
	}

	// Format cell value
	function formatValue(value: unknown, rowData: T, column: Column<T>): string {
		if (column.format) {
			return column.format(value, rowData);
		}
		if (value == null) return '';
		return String(value);
	}

	// Filter data by search
	const filteredData = $derived(() => {
		if (!searchQuery.trim()) return data;

		const query = searchQuery.toLowerCase();
		const keys = searchKeys.length > 0 ? searchKeys : columns.map((c) => c.key);

		return data.filter((rowData) =>
			keys.some((key) => {
				const value = getNestedValue(rowData as Record<string, unknown>, key);
				return value != null && String(value).toLowerCase().includes(query);
			})
		);
	});

	// Sort filtered data
	const sortedData = $derived(() => {
		const filtered = filteredData();
		if (!sortable || !sortKey) return filtered;

		return [...filtered].sort((a, b) => {
			const aVal = getNestedValue(a as Record<string, unknown>, sortKey);
			const bVal = getNestedValue(b as Record<string, unknown>, sortKey);

			let cmp = 0;
			if (aVal == null && bVal == null) cmp = 0;
			else if (aVal == null) cmp = -1;
			else if (bVal == null) cmp = 1;
			else if (typeof aVal === 'number' && typeof bVal === 'number') {
				cmp = aVal - bVal;
			} else if (typeof aVal === 'string' && typeof bVal === 'string') {
				const aNum = parseFloat(aVal);
				const bNum = parseFloat(bVal);
				if (!isNaN(aNum) && !isNaN(bNum)) {
					cmp = aNum - bNum;
				} else {
					cmp = aVal.localeCompare(bVal);
				}
			} else {
				cmp = String(aVal).localeCompare(String(bVal));
			}

			return sortDir === 'asc' ? cmp : -cmp;
		});
	});

	// Paginate sorted data
	const paginatedData = $derived(() => {
		const sorted = sortedData();
		if (isServerPaginated) return sorted;
		if (pageSize <= 0) return sorted;

		const start = currentPage * pageSize;
		return sorted.slice(start, start + pageSize);
	});

	// Pagination computed values
	const totalItems = $derived(
		isServerPaginated
			? (serverPagination?.totalCount ?? filteredData().length)
			: filteredData().length
	);
	const totalPages = $derived(
		isServerPaginated
			? (serverPagination?.totalPages ?? 1)
			: Math.ceil(totalItems / pageSize)
	);
	const startItem = $derived(
		isServerPaginated
			? (serverPagination?.startItem ?? 1)
			: currentPage * pageSize + 1
	);
	const endItem = $derived(
		isServerPaginated
			? (serverPagination?.endItem ?? paginatedData().length)
			: Math.min((currentPage + 1) * pageSize, totalItems)
	);
	const canGoPrev = $derived(
		isServerPaginated
			? (serverPagination?.hasPreviousPage ?? false)
			: currentPage > 0
	);
	const canGoNext = $derived(
		isServerPaginated
			? (serverPagination?.hasNextPage ?? false)
			: currentPage < totalPages - 1
	);
	const displayPage = $derived(
		isServerPaginated
			? (serverPagination?.currentPage ?? 0) + 1
			: currentPage + 1
	);
	const isLoading = $derived(serverPagination?.isLoading ?? false);

	// Actions
	function toggleSort(key: string) {
		if (!sortable) return;
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'desc';
		}
	}

	function setSearchQuery(query: string) {
		searchQuery = query;
	}

	function setPage(page: number) {
		currentPage = Math.max(0, Math.min(page, totalPages - 1));
	}

	function setPageSize(size: number) {
		pageSize = size;
		currentPage = 0;
	}

	function nextPage() {
		if (currentPage < totalPages - 1) currentPage++;
	}

	function prevPage() {
		if (currentPage > 0) currentPage--;
	}

	// Create and provide context
	const ctx: DataTableContext<T> = {
		get data() { return data; },
		get columns() { return columns; },
		get keyField() { return keyField; },
		get sortable() { return sortable; },
		get sortKey() { return sortKey; },
		get sortDir() { return sortDir; },
		toggleSort,
		get searchQuery() { return searchQuery; },
		setSearchQuery,
		get searchKeys() { return searchKeys; },
		get currentPage() { return currentPage; },
		get pageSize() { return pageSize; },
		get pageSizeOptions() { return pageSizeOptions; },
		setPage,
		setPageSize,
		nextPage,
		prevPage,
		get serverPagination() { return serverPagination; },
		get onServerNextPage() { return onNextPage; },
		get onServerPrevPage() { return onPrevPage; },
		get onServerPageSizeChange() { return onPageSizeChange; },
		get onServerSearch() { return onSearch; },
		get serverSearchTerm() { return serverSearchTerm; },
		get filteredData() { return filteredData; },
		get sortedData() { return sortedData; },
		get paginatedData() { return paginatedData; },
		get totalItems() { return totalItems; },
		get totalPages() { return totalPages; },
		get startItem() { return startItem; },
		get endItem() { return endItem; },
		get canGoPrev() { return canGoPrev; },
		get canGoNext() { return canGoNext; },
		get displayPage() { return displayPage; },
		get isLoading() { return isLoading; },
		get isServerPaginated() { return isServerPaginated; },
		get onRowClick() { return onRowClick; },
		getNestedValue,
		formatValue,
		get cellSnippet() { return cell; },
		get rowSnippet() { return row; },
		get headerSnippet() { return header; },
		get emptySnippet() { return empty; },
		get emptyMessage() { return emptyMessage; }
	};

	setDataTableContext(ctx as DataTableContext<Record<string, unknown>>);
</script>

<div class="data-table-root {className}">
	{@render children()}
</div>

<style>
	.data-table-root {
		display: flex;
		flex-direction: column;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
	}
</style>
