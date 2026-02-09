export type EmptyStateSize = 'xs' | 'sm' | 'md' | 'lg';
export interface EmptyStateProps {
    icon?: import('svelte').Component;
    title: string;
    description?: string;
    loading?: boolean;
    size?: EmptyStateSize;
    compact?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
}
declare const EmptyState: import("svelte").Component<EmptyStateProps, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
