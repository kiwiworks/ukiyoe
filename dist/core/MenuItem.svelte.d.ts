export type MenuItemVariant = 'default' | 'danger' | 'admin';
export interface MenuItemProps {
    /** Visual variant */
    variant?: MenuItemVariant;
    /** Disable interactions */
    disabled?: boolean;
    /** Click handler */
    onclick?: () => void;
    /** Icon snippet */
    icon?: import('svelte').Snippet;
    /** Item content */
    children: import('svelte').Snippet;
}
declare const MenuItem: import("svelte").Component<MenuItemProps, {}, "">;
type MenuItem = ReturnType<typeof MenuItem>;
export default MenuItem;
