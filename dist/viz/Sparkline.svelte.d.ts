export type SparklineColor = 'positive' | 'negative' | 'neutral' | 'auto';
export interface SparklineProps {
    /** Array of numeric data points */
    data: number[];
    /** Width in pixels */
    width?: number;
    /** Height in pixels */
    height?: number;
    /** Line color mode */
    color?: SparklineColor;
    /** Show filled area under line */
    fill?: boolean;
    /** Show data point dots */
    showDots?: boolean;
    /** Accessible label for the chart (describes the data) */
    ariaLabel?: string;
    /** Additional CSS classes */
    class?: string;
}
declare const Sparkline: import("svelte").Component<SparklineProps, {}, "">;
type Sparkline = ReturnType<typeof Sparkline>;
export default Sparkline;
