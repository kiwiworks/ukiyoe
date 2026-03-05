import type { Snippet } from 'svelte';
export interface SelectableCardProps {
    /** Whether the card is selected */
    selected?: boolean;
    /** Whether the card is disabled */
    disabled?: boolean;
    /** Show a check indicator when selected */
    showCheck?: boolean;
    /** Called when the card is pressed */
    onSelect?: (selected: boolean) => void;
    /** Card content */
    children: Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const SelectableCard: import("svelte").Component<SelectableCardProps, {}, "selected">;
type SelectableCard = ReturnType<typeof SelectableCard>;
export default SelectableCard;
