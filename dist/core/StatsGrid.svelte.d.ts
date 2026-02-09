export type StatsGridVariant = 'default' | 'positive' | 'negative' | 'warning';
export type StatsGridSize = 'xs' | 'sm' | 'md' | 'lg';
export type StatsGridColumns = 2 | 3 | 4;
export interface StatItem {
    label: string;
    value: string | number;
    variant?: StatsGridVariant;
}
export interface StatsGridProps {
    items: StatItem[];
    columns?: StatsGridColumns;
    size?: StatsGridSize;
    class?: string;
}
declare const StatsGrid: import("svelte").Component<StatsGridProps, {}, "">;
type StatsGrid = ReturnType<typeof StatsGrid>;
export default StatsGrid;
