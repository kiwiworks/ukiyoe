export type StatusBadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type StatusBadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export interface StatusBadgeProps {
    label: string;
    variant: StatusBadgeVariant;
    icon?: import('svelte').Component;
    pulse?: boolean;
    size?: StatusBadgeSize;
    class?: string;
}
declare const StatusBadge: import("svelte").Component<StatusBadgeProps, {}, "">;
type StatusBadge = ReturnType<typeof StatusBadge>;
export default StatusBadge;
