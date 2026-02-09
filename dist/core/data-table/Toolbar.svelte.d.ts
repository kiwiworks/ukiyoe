import type { Snippet } from 'svelte';
export interface DataTableToolbarProps {
    /** Additional CSS classes */
    class?: string;
    /** Children content */
    children: Snippet;
}
declare const Toolbar: import("svelte").Component<DataTableToolbarProps, {}, "">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
