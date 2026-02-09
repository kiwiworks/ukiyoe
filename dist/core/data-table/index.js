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
export { Root, Toolbar, Search, PageSizeSelect, Table, Header, Body, Pagination, Empty };
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
