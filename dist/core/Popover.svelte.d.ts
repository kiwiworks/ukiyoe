import type { Snippet } from 'svelte';
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export interface PopoverProps {
    open?: boolean;
    side?: PopoverSide;
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    class?: string;
    trigger: Snippet;
    children: Snippet;
}
import { Popover } from 'bits-ui';
declare const Popover: import("svelte").Component<PopoverProps, {}, "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
