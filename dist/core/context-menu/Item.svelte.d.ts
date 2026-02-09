export type ContextMenuItemVariant = 'default' | 'danger';
export interface ContextMenuItemProps {
    /** Visual variant */
    variant?: ContextMenuItemVariant;
    /** Disable interactions */
    disabled?: boolean;
    /** Click handler */
    onclick?: () => void;
    /** Icon snippet */
    icon?: import('svelte').Snippet;
    /** Item content */
    children: import('svelte').Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const Item: import("svelte").Component<ContextMenuItemProps, {}, "">;
type Item = ReturnType<typeof Item>;
export default Item;
