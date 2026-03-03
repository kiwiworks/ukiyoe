export type AgentTaskStatus = 'pending' | 'running' | 'success' | 'error';
export interface AgentTaskProgress {
    current: number;
    total: number;
    label?: string;
}
export interface AgentTaskProps {
    /** Agent/task name */
    name: string;
    /** Description of what the agent is doing */
    description?: string;
    /** Visual status indicator */
    status?: AgentTaskStatus;
    /** Progress tracking */
    progress?: AgentTaskProgress;
    /** Elapsed time in seconds */
    elapsed?: number;
    /** Expand state */
    expanded?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Nested tool calls, groups, or sub-agents */
    children?: import('svelte').Snippet;
    /** Trailing content (e.g. UsageDisplay after completion) */
    trailing?: import('svelte').Snippet;
}
declare const AgentTask: import("svelte").Component<AgentTaskProps, {}, "expanded">;
type AgentTask = ReturnType<typeof AgentTask>;
export default AgentTask;
