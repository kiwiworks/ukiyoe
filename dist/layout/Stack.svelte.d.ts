export type StackDirection = 'vertical' | 'horizontal';
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface StackProps {
    /** Stack direction */
    direction?: StackDirection;
    /** Gap between items */
    gap?: StackGap;
    /** Align items on cross axis */
    align?: StackAlign;
    /** Justify items on main axis */
    justify?: StackJustify;
    /** Wrap items */
    wrap?: boolean;
    /** Render as inline element */
    inline?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Children content */
    children?: import('svelte').Snippet;
}
declare const Stack: import("svelte").Component<StackProps, {}, "">;
type Stack = ReturnType<typeof Stack>;
export default Stack;
