export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger';
export interface ProgressBarProps {
    value?: number;
    max?: number;
    size?: ProgressBarSize;
    variant?: ProgressBarVariant;
    showValue?: boolean;
    indeterminate?: boolean;
    class?: string;
}
declare const ProgressBar: import("svelte").Component<ProgressBarProps, {}, "">;
type ProgressBar = ReturnType<typeof ProgressBar>;
export default ProgressBar;
