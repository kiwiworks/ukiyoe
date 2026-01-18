// Types
export type {
	Breakpoint,
	Column,
	ServerPaginationState,
	SortDirection,
	DataTableContext
} from './types';

// Props types
export type { DataTableProps } from './DataTable.svelte';
export type { DataTableRootProps } from './Root.svelte';
export type { DataTableToolbarProps } from './Toolbar.svelte';
export type { DataTableSearchProps } from './Search.svelte';
export type { DataTablePageSizeSelectProps } from './PageSizeSelect.svelte';
export type { DataTableTableProps } from './Table.svelte';
export type { DataTableHeaderProps } from './Header.svelte';
export type { DataTableBodyProps } from './Body.svelte';
export type { DataTablePaginationProps } from './Pagination.svelte';
export type { DataTableEmptyProps } from './Empty.svelte';

// Context helpers
export { getDataTableContext, setDataTableContext } from './context.svelte';

// Import components
import DataTableComponent from './DataTable.svelte';
import Root from './Root.svelte';
import Toolbar from './Toolbar.svelte';
import Search from './Search.svelte';
import PageSizeSelect from './PageSizeSelect.svelte';
import Table from './Table.svelte';
import Header from './Header.svelte';
import Body from './Body.svelte';
import Pagination from './Pagination.svelte';
import Empty from './Empty.svelte';

// Individual component exports
export {
	Root,
	Toolbar,
	Search,
	PageSizeSelect,
	Table,
	Header,
	Body,
	Pagination,
	Empty
};

// Default convenience component with compound sub-components attached
export const DataTable = Object.assign(DataTableComponent, {
	Root,
	Toolbar,
	Search,
	PageSizeSelect,
	Table,
	Header,
	Body,
	Pagination,
	Empty
});
