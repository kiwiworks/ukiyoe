export interface DataTablePaginationProps {
    /** Show page size selector */
    showPageSize?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const Pagination: import("svelte").Component<DataTablePaginationProps, {}, "">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
