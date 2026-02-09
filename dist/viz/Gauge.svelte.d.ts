export type GaugeSize = 'sm' | 'md' | 'lg';
export type GaugeVariant = 'arc' | 'bar' | 'circle';
export interface GaugeColorStop {
    value: number;
    color: string;
}
export interface GaugeProps {
    /** Current value to display */
    value: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Label text below the gauge */
    label?: string;
    /** Show numeric value */
    showValue?: boolean;
    /** Size preset */
    size?: GaugeSize;
    /** Visual variant */
    variant?: GaugeVariant;
    /** Color gradient stops based on value thresholds */
    colorStops?: GaugeColorStop[];
    /** Additional CSS classes */
    class?: string;
}
declare const Gauge: import("svelte").Component<GaugeProps, {}, "">;
type Gauge = ReturnType<typeof Gauge>;
export default Gauge;
