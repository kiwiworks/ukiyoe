export interface ProgressRingProps {
    /** Progress value (0-100) */
    value: number;
    /** Ring diameter in pixels */
    size?: number;
    /** Ring color (CSS color value) */
    color?: string;
    /** Label text below the ring */
    label?: string;
    /** Show percentage value in center */
    showValue?: boolean;
    /** Ring stroke width in pixels */
    strokeWidth?: number;
    /** Additional CSS classes */
    class?: string;
}
declare const ProgressRing: import("svelte").Component<ProgressRingProps, {}, "">;
type ProgressRing = ReturnType<typeof ProgressRing>;
export default ProgressRing;
