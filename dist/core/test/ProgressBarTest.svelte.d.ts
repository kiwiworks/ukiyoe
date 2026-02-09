import type { ProgressBarSize, ProgressBarVariant } from '../ProgressBar.svelte';
type $$ComponentProps = {
    value?: number;
    max?: number;
    size?: ProgressBarSize;
    variant?: ProgressBarVariant;
    showValue?: boolean;
    indeterminate?: boolean;
};
declare const ProgressBarTest: import("svelte").Component<$$ComponentProps, {}, "">;
type ProgressBarTest = ReturnType<typeof ProgressBarTest>;
export default ProgressBarTest;
