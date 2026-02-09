export type MetricCardVariant = 'default' | 'positive' | 'negative' | 'warning' | 'brand';
export type MetricCardSize = 'xs' | 'sm' | 'md' | 'lg';
export interface MetricCardProps {
    /** Label text displayed above the value */
    label: string;
    /** The metric value to display */
    value: string | number;
    /** Optional icon component */
    icon?: import('svelte').Component;
    /** Color variant */
    variant?: MetricCardVariant;
    /** Size preset */
    size?: MetricCardSize;
    /** Additional CSS classes */
    class?: string;
}
declare const MetricCard: import("svelte").Component<MetricCardProps, {}, "">;
type MetricCard = ReturnType<typeof MetricCard>;
export default MetricCard;
