import type { SwitchSize } from '../Switch.svelte';
type $$ComponentProps = {
    checked?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    ariaLabel?: string;
    onValueChange?: (checked: boolean) => void;
};
declare const SwitchTest: import("svelte").Component<$$ComponentProps, {}, "checked">;
type SwitchTest = ReturnType<typeof SwitchTest>;
export default SwitchTest;
