export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface GridProps {
    /** Number of columns */
    cols?: GridColumns;
    /** Number of columns on small screens */
    colsSm?: GridColumns;
    /** Number of columns on medium screens */
    colsMd?: GridColumns;
    /** Number of columns on large screens */
    colsLg?: GridColumns;
    /** Gap between items */
    gap?: GridGap;
    /** Additional CSS classes */
    class?: string;
    /** Children content */
    children?: import('svelte').Snippet;
}
declare const Grid: import("svelte").Component<GridProps, {}, "">;
type Grid = ReturnType<typeof Grid>;
export default Grid;
