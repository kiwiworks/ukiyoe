export type ListItemVariant = 'default' | 'success' | 'warning' | 'error';
export interface ListItemProps {
    variant?: ListItemVariant;
    interactive?: boolean;
    selected?: boolean;
    class?: string;
    icon?: import('svelte').Snippet;
    left?: import('svelte').Snippet;
    right?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
}
declare const ListItem: import("svelte").Component<ListItemProps, {}, "">;
type ListItem = ReturnType<typeof ListItem>;
export default ListItem;
