import type { Snippet } from 'svelte';
export interface DescriptionListItemProps {
    /** Label for this field */
    label: string;
    /** Whether to apply monospace font to the value */
    mono?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Value content */
    children: Snippet;
}
declare const Item: import("svelte").Component<DescriptionListItemProps, {}, "">;
type Item = ReturnType<typeof Item>;
export default Item;
