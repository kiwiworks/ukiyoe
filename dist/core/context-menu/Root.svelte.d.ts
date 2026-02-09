export interface ContextMenuRootProps {
    /** Trigger area content */
    children: import('svelte').Snippet;
    /** Menu items */
    items: import('svelte').Snippet;
    /** Disable context menu */
    disabled?: boolean;
    /** Additional CSS classes for the menu content */
    class?: string;
}
declare const Root: import("svelte").Component<ContextMenuRootProps, {}, "">;
type Root = ReturnType<typeof Root>;
export default Root;
