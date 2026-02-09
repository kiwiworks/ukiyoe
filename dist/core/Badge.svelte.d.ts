export type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'brand';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    pulse?: boolean;
    showDot?: boolean;
    text?: string;
    children?: import('svelte').Snippet;
}
declare const Badge: import("svelte").Component<BadgeProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
