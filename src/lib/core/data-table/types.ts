import type { Snippet } from 'svelte';

/** Tailwind breakpoints for responsive column hiding */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Column definition for DataTable component.
 */
export interface Column<TRow = Record<string, unknown>> {
	/** Data key to access value from row */
	key: string;
	/** Column header label */
	header: string;
	/** Text alignment */
	align?: 'left' | 'center' | 'right';
	/** Whether column is sortable (default: true if table is sortable) */
	sortable?: boolean;
	/** Fixed width (e.g., '100px', '20%') */
	width?: string;
	/** Custom value formatter */
	format?: (value: unknown, row: TRow) => string;
	/** CSS class for cell styling */
	class?: string;
	/** Whether to render as monospace */
	mono?: boolean;
	/** Hide column below this breakpoint (e.g., 'lg' hides on mobile/tablet) */
	hideAt?: Breakpoint;
}

/**
 * Server-side pagination state for DataTable.
 */
export interface ServerPaginationState {
	/** Current page number (0-indexed) */
	currentPage: number;
	/** Items per page */
	pageSize: number;
	/** Total number of items (if known) */
	totalCount: number | null;
	/** Total number of pages (if totalCount is known) */
	totalPages: number | null;
	/** Whether there's a next page */
	hasNextPage: boolean;
	/** Whether there's a previous page */
	hasPreviousPage: boolean;
	/** Whether currently loading */
	isLoading: boolean;
	/** Start item index for display (1-indexed) */
	startItem: number;
	/** End item index for display */
	endItem: number;
}

export type SortDirection = 'asc' | 'desc';

export interface DataTableContext<T = Record<string, unknown>> {
	// Core data
	data: T[];
	columns: Column<T>[];
	keyField: string;

	// Table styling
	compact: boolean;
	striped: boolean;
	hoverable: boolean;
	stickyHeader: boolean;

	// Sorting state
	sortable: boolean;
	sortKey: string;
	sortDir: SortDirection;
	toggleSort: (key: string) => void;

	// Search state
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	searchKeys: string[];

	// Pagination state
	currentPage: number;
	pageSize: number;
	pageSizeOptions: number[];
	setPage: (page: number) => void;
	setPageSize: (size: number) => void;
	nextPage: () => void;
	prevPage: () => void;

	// Server pagination
	serverPagination: ServerPaginationState | undefined;
	onServerNextPage: (() => void) | undefined;
	onServerPrevPage: (() => void) | undefined;
	onServerPageSizeChange: ((size: number) => void) | undefined;
	onServerSearch: ((term: string) => void) | undefined;
	serverSearchTerm: string;

	// Computed
	filteredData: () => T[];
	sortedData: () => T[];
	paginatedData: () => T[];
	totalItems: number;
	totalPages: number;
	startItem: number;
	endItem: number;
	canGoPrev: boolean;
	canGoNext: boolean;
	displayPage: number;
	isLoading: boolean;
	isServerPaginated: boolean;

	// Events
	onRowClick: ((row: T) => void) | undefined;

	// Helpers
	getNestedValue: (obj: Record<string, unknown>, path: string) => unknown;
	formatValue: (value: unknown, row: T, column: Column<T>) => string;

	// Snippets for customization
	cellSnippet: Snippet<[{ row: T; column: Column<T>; value: unknown }]> | undefined;
	rowSnippet: Snippet<[{ row: T; index: number }]> | undefined;
	headerSnippet: Snippet<[{ column: Column<T> }]> | undefined;
	emptySnippet: Snippet | undefined;
	emptyMessage: string;
}
