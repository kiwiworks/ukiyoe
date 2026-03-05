import type { Snippet } from 'svelte';
export type ChipGroupType = 'single' | 'multiple';
export interface ChipGroupProps {
    /** Selection mode — single allows one active chip, multiple allows many */
    type?: ChipGroupType;
    /** Currently selected value(s) — string for single, string[] for multiple */
    value?: string | string[];
    /** Whether the entire group is disabled */
    disabled?: boolean;
    /** Orientation for keyboard navigation */
    orientation?: 'horizontal' | 'vertical';
    /** Whether keyboard navigation wraps around */
    loop?: boolean;
    /** Called when the selection changes */
    onValueChange?: (value: string | string[]) => void;
    /** Chip items rendered inside the group */
    children: Snippet;
    /** Additional CSS classes for the container */
    class?: string;
}
declare const ChipGroup: import("svelte").Component<ChipGroupProps, {}, "value">;
type ChipGroup = ReturnType<typeof ChipGroup>;
export default ChipGroup;
