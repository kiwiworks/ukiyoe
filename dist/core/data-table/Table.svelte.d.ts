import type { Snippet } from 'svelte';
export interface DataTableTableProps {
    /** Additional CSS classes */
    class?: string;
    /** Children (Header and Body) */
    children: Snippet;
}
declare const Table: import("svelte").Component<DataTableTableProps, {}, "">;
type Table = ReturnType<typeof Table>;
export default Table;
