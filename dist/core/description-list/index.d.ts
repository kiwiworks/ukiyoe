export type { DescriptionListColumns, DescriptionListGap, DescriptionListRootProps } from './Root.svelte';
export type { DescriptionListItemProps } from './Item.svelte';
import Root from './Root.svelte';
import Item from './Item.svelte';
export { Root, Item };
export declare const DescriptionList: import("svelte").Component<import("./Root.svelte").DescriptionListRootProps, {}, ""> & {
    Root: import("svelte").Component<import("./Root.svelte").DescriptionListRootProps, {}, "">;
    Item: import("svelte").Component<import("./Item.svelte").DescriptionListItemProps, {}, "">;
};
