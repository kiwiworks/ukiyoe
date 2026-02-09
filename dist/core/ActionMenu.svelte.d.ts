export type ActionMenuSize = 'xs' | 'sm' | 'md' | 'lg';
export interface ActionMenuProps {
    /** Button label */
    label: string;
    /** Size preset */
    size?: ActionMenuSize;
    /** Icon snippet to display before label */
    icon?: import('svelte').Snippet;
    /** Menu items */
    children: import('svelte').Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const ActionMenu: import("svelte").Component<ActionMenuProps, {}, "">;
type ActionMenu = ReturnType<typeof ActionMenu>;
export default ActionMenu;
