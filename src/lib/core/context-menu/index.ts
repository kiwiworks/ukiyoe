// Props types
export type { ContextMenuRootProps } from './Root.svelte';
export type { ContextMenuItemVariant, ContextMenuItemProps } from './Item.svelte';
export type { ContextMenuDividerProps } from './Divider.svelte';

// Import components
import Root from './Root.svelte';
import Item from './Item.svelte';
import Divider from './Divider.svelte';

// Individual component exports
export { Root, Item, Divider };

// Compound component export
export const ContextMenu = Object.assign(Root, {
	Root,
	Item,
	Divider
});
