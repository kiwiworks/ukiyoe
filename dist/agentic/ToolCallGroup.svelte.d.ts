export type ToolCallGroupStatus = 'pending' | 'running' | 'success' | 'error' | 'partial';
export interface ToolCallGroupProps {
    /** Group label (auto-derived from count if absent) */
    label?: string;
    /** Visual status indicator */
    status?: ToolCallGroupStatus;
    /** Total number of calls in group */
    count?: number;
    /** Number of completed calls (for progress hint) */
    completed?: number;
    /** Aggregate duration in milliseconds */
    duration?: number;
    /** Expand state */
    expanded?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Grouped tool call children */
    children: import('svelte').Snippet;
}
declare const ToolCallGroup: import("svelte").Component<ToolCallGroupProps, {}, "expanded">;
type ToolCallGroup = ReturnType<typeof ToolCallGroup>;
export default ToolCallGroup;
