export interface ReasoningTraceProps {
    /** Reasoning content text */
    content: string;
    /** Whether the trace is expanded */
    expanded?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const ReasoningTrace: import("svelte").Component<ReasoningTraceProps, {}, "expanded">;
type ReasoningTrace = ReturnType<typeof ReasoningTrace>;
export default ReasoningTrace;
