import type { Snippet } from 'svelte';
export type BrandIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type BrandIconAnimation = 'none' | 'wave' | 'pulse' | 'breathe';
export interface BrandIconProps {
    /** Size preset or custom pixel value */
    size?: BrandIconSize;
    /** Stroke color (monochromatic) - available as var(--ukiyoe-color) in custom SVG */
    color?: string;
    /** Background color - available as var(--ukiyoe-bg) in custom SVG */
    backgroundColor?: string;
    /** Animation style */
    animation?: BrandIconAnimation;
    /** Animation duration in seconds - available as var(--ukiyoe-duration) in custom SVG */
    animationDuration?: number;
    /** Whether animation is paused */
    paused?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Accessible label */
    ariaLabel?: string;
    /** Whether to show the background circle */
    showCircle?: boolean;
    /** Custom SVG content (replaces default design). Use var(--ukiyoe-color) for stroke/fill. */
    children?: Snippet;
}
declare const BrandIcon: import("svelte").Component<BrandIconProps, {}, "">;
type BrandIcon = ReturnType<typeof BrandIcon>;
export default BrandIcon;
