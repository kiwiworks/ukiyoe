export interface EquityPoint {
    /** Date string (ISO) or Date object */
    date?: string | Date;
    /** Unix timestamp (seconds or milliseconds) */
    timestamp?: number;
    /** Equity/portfolio value at this point */
    value: number;
}
export interface TradeMarker {
    /** Trade entry time */
    date?: string | Date;
    timestamp?: number;
    /** Trade type */
    side: 'buy' | 'sell' | 'long' | 'short';
    /** Profit/loss amount (optional, for coloring) */
    pnl?: number;
    /** Label to show on hover */
    label?: string;
}
export interface EquityChartProps {
    /** Equity curve data points */
    equityCurve: EquityPoint[];
    /** Optional trade markers to display */
    trades?: TradeMarker[];
    /** Chart width in pixels, or 'auto' for responsive */
    width?: number | 'auto';
    /** Chart height in pixels */
    height?: number;
    /** Show drawdown subplot below main chart */
    showDrawdown?: boolean;
    /** Show area fill under the equity line */
    showFill?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const EquityChart: import("svelte").Component<EquityChartProps, {}, "">;
type EquityChart = ReturnType<typeof EquityChart>;
export default EquityChart;
