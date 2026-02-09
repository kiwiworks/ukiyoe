import type { Snippet } from 'svelte';
export interface DataTableEmptyProps {
    /** Message to display */
    message?: string;
    /** Additional CSS classes */
    class?: string;
    /** Custom content */
    children?: Snippet;
}
declare const Empty: import("svelte").Component<DataTableEmptyProps, {}, "">;
type Empty = ReturnType<typeof Empty>;
export default Empty;
