export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';
export interface ToolCallDisplayProps {
    /** Tool function name */
    name: string;
    /** Visual status indicator */
    status?: ToolCallStatus;
    /** Compact one-liner summary (e.g. "Read src/index.ts") */
    summary?: string;
    /** Duration in milliseconds, shown right-aligned */
    duration?: number;
    /** Call identifier (shown in expanded detail) */
    id?: string;
    /** Tool call arguments (shown in expanded detail) */
    arguments?: unknown;
    /** Tool call result (shown in expanded detail) */
    result?: unknown;
    /** Expand state */
    expanded?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const ToolCallDisplay: import("svelte").Component<ToolCallDisplayProps, {}, "expanded">;
type ToolCallDisplay = ReturnType<typeof ToolCallDisplay>;
export default ToolCallDisplay;
