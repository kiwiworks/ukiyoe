// Types
export type { DescriptionListColumns, DescriptionListGap, DescriptionListRootProps } from './Root.svelte';
export type { DescriptionListItemProps } from './Item.svelte';

// Import components
import Root from './Root.svelte';
import Item from './Item.svelte';

// Individual component exports
export { Root, Item };

// Compound component export
export const DescriptionList = Object.assign(Root, {
	Root,
	Item
});
