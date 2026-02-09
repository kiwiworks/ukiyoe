import type { CheckboxSize } from '../Checkbox.svelte';
type $$ComponentProps = {
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: CheckboxSize;
    ariaLabel?: string;
    onchange?: (checked: boolean) => void;
};
declare const CheckboxTest: import("svelte").Component<$$ComponentProps, {}, "checked">;
type CheckboxTest = ReturnType<typeof CheckboxTest>;
export default CheckboxTest;
