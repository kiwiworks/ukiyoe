import type { Snippet, Component } from 'svelte';
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg';
export type ChipVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
export interface ChipProps {
    /** Display label */
    label?: string;
    /** Whether the chip is currently active/selected */
    active?: boolean;
    /** Visual variant */
    variant?: ChipVariant;
    /** Chip size */
    size?: ChipSize;
    /** Icon component rendered before the label */
    icon?: Component;
    /** Whether the chip is disabled */
    disabled?: boolean;
    /** Called when the chip is toggled — return value or use bind:active */
    onToggle?: (active: boolean) => void;
    /** Called when the dismiss button is clicked. Presence enables the dismiss button. */
    onDismiss?: () => void;
    /** Custom content (overrides label + icon) */
    children?: Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const Chip: Component<ChipProps, {}, "active">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
