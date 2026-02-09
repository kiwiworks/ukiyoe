interface Trade {
    entryTime: number;
    exitTime: number;
    side: string;
    entryPrice: number;
    exitPrice: number;
    pnl: number;
    pnlPct: number;
}
interface EquityPoint {
    timestamp: number;
    equity: number;
}
interface Props {
    trades: Trade[];
    equityCurve?: EquityPoint[];
    height?: number;
    class?: string;
}
declare const BacktestChart: import("svelte").Component<Props, {}, "">;
type BacktestChart = ReturnType<typeof BacktestChart>;
export default BacktestChart;
