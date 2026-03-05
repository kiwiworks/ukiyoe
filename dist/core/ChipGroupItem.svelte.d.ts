import type { Snippet, Component } from 'svelte';
import type { ChipSize, ChipVariant } from './Chip.svelte';
export interface ChipGroupItemProps {
    /** Unique value identifying this item in the group */
    value: string;
    /** Display label */
    label?: string;
    /** Visual variant */
    variant?: ChipVariant;
    /** Chip size */
    size?: ChipSize;
    /** Icon component rendered before the label */
    icon?: Component;
    /** Whether this item is disabled */
    disabled?: boolean;
    /** Called when the dismiss button is clicked. Presence enables the dismiss button. */
    onDismiss?: () => void;
    /** Custom content (overrides label + icon) */
    children?: Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const ChipGroupItem: Component<ChipGroupItemProps, {}, "">;
type ChipGroupItem = ReturnType<typeof ChipGroupItem>;
export default ChipGroupItem;
