export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg';
export interface RadioGroupProps {
    /** Selected value (bindable) */
    value?: string;
    /** Available options */
    options: RadioOption[] | string[];
    /** Size preset */
    size?: RadioGroupSize;
    /** Disable interactions */
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    /** Layout orientation */
    orientation?: 'horizontal' | 'vertical';
    /** HTML name attribute for form submission */
    name?: string;
    /** Required field */
    required?: boolean;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this radio group */
    'aria-describedby'?: string;
    /** Indicates radio group has invalid value */
    'aria-invalid'?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Change event handler */
    onchange?: (value: string) => void;
}
import { RadioGroup } from 'bits-ui';
declare const RadioGroup: import("svelte").Component<RadioGroupProps, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
