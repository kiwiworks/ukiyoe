import type { Snippet } from 'svelte';
export type DescriptionListColumns = 1 | 2 | 3;
export type DescriptionListGap = 'sm' | 'md' | 'lg';
export interface DescriptionListRootProps {
    /** Number of columns for the grid layout */
    columns?: DescriptionListColumns;
    /** Gap between items */
    gap?: DescriptionListGap;
    /** Additional CSS classes */
    class?: string;
    /** Description list items */
    children: Snippet;
}
declare const Root: import("svelte").Component<DescriptionListRootProps, {}, "">;
type Root = ReturnType<typeof Root>;
export default Root;
