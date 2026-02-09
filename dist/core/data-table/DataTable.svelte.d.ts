import type { Snippet } from 'svelte';
import type { Column, ServerPaginationState, SortDirection } from './types';
export interface DataTableProps<T = Record<string, unknown>> {
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
    /** Server search term */
    serverSearchTerm?: string;
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
    cell?: Snippet<[{
        row: T;
        column: Column<T>;
        value: unknown;
    }]>;
    /** Custom row renderer */
    row?: Snippet<[{
        row: T;
        index: number;
    }]>;
    /** Custom header cell renderer */
    header?: Snippet<[{
        column: Column<T>;
    }]>;
    /** Custom empty state */
    empty?: Snippet;
    /** Empty state message */
    emptyMessage?: string;
    /** Additional CSS classes */
    class?: string;
}
declare function $$render<T extends Record<string, unknown>>(): {
    props: DataTableProps<T>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const DataTable: $$IsomorphicComponent;
type DataTable<T extends Record<string, unknown>> = InstanceType<typeof DataTable<T>>;
export default DataTable;
