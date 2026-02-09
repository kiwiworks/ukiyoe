export type { ContextMenuRootProps } from './Root.svelte';
export type { ContextMenuItemVariant, ContextMenuItemProps } from './Item.svelte';
export type { ContextMenuDividerProps } from './Divider.svelte';
import Root from './Root.svelte';
import Item from './Item.svelte';
import Divider from './Divider.svelte';
export { Root, Item, Divider };
export declare const ContextMenu: import("svelte").Component<import("./Root.svelte").ContextMenuRootProps, {}, ""> & {
    Root: import("svelte").Component<import("./Root.svelte").ContextMenuRootProps, {}, "">;
    Item: import("svelte").Component<import("./Item.svelte").ContextMenuItemProps, {}, "">;
    Divider: import("svelte").Component<import("./Divider.svelte").ContextMenuDividerProps, {}, "">;
};
