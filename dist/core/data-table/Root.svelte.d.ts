import type { Snippet } from 'svelte';
import type { Column, ServerPaginationState, SortDirection, RowKey, RowPathKey } from './types';
export interface DataTableRootProps<T = Record<string, unknown>> {
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
    /** Page size options for pagination */
    pageSizeOptions?: number[];
    /** Default page size */
    defaultPageSize?: number;
    /** Keys to search (defaults to all column keys) */
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
    /** Server search term (controlled) */
    serverSearchTerm?: string;
    /** Debounce delay for server search (ms) */
    serverSearchDebounceMs?: number;
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
    /** Compact row height */
    compact?: boolean;
    /** Striped rows */
    striped?: boolean;
    /** Hoverable rows */
    hoverable?: boolean;
    /** Sticky header */
    stickyHeader?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Children content */
    children: Snippet;
}
declare function $$render<T extends object>(): {
    props: DataTableRootProps<T>;
    exports: {};
    bindings: "";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends object> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends object>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends object>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Root: $$IsomorphicComponent;
type Root<T extends object> = InstanceType<typeof Root<T>>;
export default Root;
