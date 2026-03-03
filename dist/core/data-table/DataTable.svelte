<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { Column, ServerPaginationState, SortDirection, RowKey, RowPathKey } from './types';

	export interface DataTableProps<T = Record<string, unknown>> {
		/** Array of data rows */
		data: T[];
		/** Column definitions */
		columns: Column<T>[];
		/** Unique key field for each row */
		keyField: RowKey<T>;
		/** Enable sorting */
		sortable?: boolean;
		/** Default sort column key */
		defaultSortKey?: RowPathKey<T> | '';
		/** Default sort direction */
		defaultSortDir?: SortDirection;
		/** Enable client-side pagination */
		paginate?: boolean;
		/** Page size */
		pageSize?: number;
		/** Page size options */
		pageSizeOptions?: number[];
		/** Enable client-side search */
		searchable?: boolean;
		/** Search placeholder */
		searchPlaceholder?: string;
		/** Keys to search */
		searchKeys?: RowPathKey<T>[];
		/** Server-side pagination state */
		serverPagination?: ServerPaginationState;
		/** Server next page handler */
		onNextPage?: () => void;
		/** Server prev page handler */
		onPrevPage?: () => void;
		/** Server page size change handler */
		onPageSizeChange?: (size: number) => void;
		/** Server search handler */
		onSearch?: (term: string, page: number, pageSize: number) => void;
		/** Server search term */
		serverSearchTerm?: string;
		/** Debounce delay for server search (ms) */
		serverSearchDebounceMs?: number;
		/** Compact row height */
		compact?: boolean;
		/** Sticky header */
		stickyHeader?: boolean;
		/** Striped rows */
		striped?: boolean;
		/** Hoverable rows */
		hoverable?: boolean;
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
	}
</script>

<script lang="ts" generics="T extends object">
	import Root from './Root.svelte';
	import Toolbar from './Toolbar.svelte';
	import Search from './Search.svelte';
	import PageSizeSelect from './PageSizeSelect.svelte';
	import Table from './Table.svelte';
	import Header from './Header.svelte';
	import Body from './Body.svelte';
	import Pagination from './Pagination.svelte';

	let {
		data,
		columns,
		keyField,
		sortable = false,
		defaultSortKey = '',
		defaultSortDir = 'asc',
		paginate = false,
		pageSize = 10,
		pageSizeOptions = [10, 25, 50, 100],
		searchable = false,
		searchPlaceholder = 'Search...',
		searchKeys = [],
		serverPagination,
		onNextPage,
		onPrevPage,
		onPageSizeChange,
		onSearch,
		serverSearchTerm = '',
		serverSearchDebounceMs = 250,
		compact = false,
		stickyHeader = true,
		striped = false,
		hoverable = true,
		onRowClick,
		cell,
		row,
		header,
		empty,
		emptyMessage = 'No data',
		class: className = ''
	}: DataTableProps<T> = $props();

	const showToolbar = $derived(searchable || !!onSearch || (paginate && !serverPagination));
	const showPagination = $derived(paginate || !!serverPagination);
</script>

<Root
	{data}
	{columns}
	{keyField}
	{sortable}
	{defaultSortKey}
	{defaultSortDir}
	{pageSizeOptions}
	defaultPageSize={pageSize}
	{searchKeys}
	{serverPagination}
	{onNextPage}
	{onPrevPage}
	{onPageSizeChange}
	{onSearch}
	{serverSearchTerm}
	{serverSearchDebounceMs}
	{onRowClick}
	{cell}
	{row}
	{header}
	{empty}
	{emptyMessage}
	{compact}
	{striped}
	{hoverable}
	{stickyHeader}
	class={className}
>
	{#if showToolbar}
		<Toolbar>
			{#if searchable || onSearch}
				<Search placeholder={searchPlaceholder} />
			{/if}
			{#if paginate && !serverPagination}
				<PageSizeSelect />
			{/if}
		</Toolbar>
	{/if}

	<Table>
		<Header />
		<Body />
	</Table>

	{#if showPagination}
		<Pagination showPageSize={!!serverPagination && !!onPageSizeChange} />
	{/if}
</Root>
