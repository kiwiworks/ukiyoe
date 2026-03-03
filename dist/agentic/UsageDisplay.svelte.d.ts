export type UsageDisplaySize = 'xs' | 'sm' | 'md';
export interface UsageDisplayProps {
    /** Stat items to display */
    items: import('../core/StatsGrid.svelte').StatItem[];
    /** Size preset */
    size?: UsageDisplaySize;
    /** Additional CSS classes */
    class?: string;
}
declare const UsageDisplay: import("svelte").Component<UsageDisplayProps, {}, "">;
type UsageDisplay = ReturnType<typeof UsageDisplay>;
export default UsageDisplay;
