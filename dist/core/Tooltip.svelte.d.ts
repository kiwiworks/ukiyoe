import type { Snippet } from 'svelte';
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export interface TooltipProps {
    content: string;
    side?: TooltipSide;
    sideOffset?: number;
    delayDuration?: number;
    class?: string;
    children: Snippet;
}
import { Tooltip } from 'bits-ui';
declare const Tooltip: import("svelte").Component<TooltipProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
