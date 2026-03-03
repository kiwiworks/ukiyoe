export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';
export interface CheckboxProps {
    /** Checked state (bindable) */
    checked?: boolean;
    /** Disable interactions */
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    /** Size preset */
    size?: CheckboxSize;
    /** HTML id attribute for label association */
    id?: string;
    /** HTML name attribute for form submission */
    name?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this checkbox */
    'aria-describedby'?: string;
    /** Indicates checkbox has invalid value */
    'aria-invalid'?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Value change handler */
    onValueChange?: (checked: boolean) => void;
    /** Label content rendered beside the checkbox */
    children?: import('svelte').Snippet;
}
import { Checkbox } from 'bits-ui';
declare const Checkbox: import("svelte").Component<CheckboxProps, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
