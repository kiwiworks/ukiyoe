export type ThinkingStatus = 'thinking' | 'searching' | 'executing' | 'writing' | 'reading' | 'complete';
export interface ThinkingProgress {
    current: number;
    total: number;
    label?: string;
}
export interface ThinkingIndicatorProps {
    /** Current activity status */
    status: ThinkingStatus;
    /** Custom label to display */
    label?: string;
    /** Elapsed time in seconds */
    elapsed?: number;
    /** Progress tracking */
    progress?: ThinkingProgress;
    /** Allow collapsing to show expanded content */
    collapsible?: boolean;
    /** Expanded thinking content */
    children?: import('svelte').Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const ThinkingIndicator: import("svelte").Component<ThinkingIndicatorProps, {}, "">;
type ThinkingIndicator = ReturnType<typeof ThinkingIndicator>;
export default ThinkingIndicator;
