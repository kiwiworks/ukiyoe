export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';
export interface SelectProps {
    /** Selected value (bindable) */
    value?: string;
    /** Available options */
    options: SelectOption[] | string[];
    /** Size preset */
    size?: SelectSize;
    /** Disable interactions */
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    /** Required field */
    required?: boolean;
    /** Placeholder text when no value selected */
    placeholder?: string;
    /** HTML id attribute for label association */
    id?: string;
    /** HTML name attribute for form submission */
    name?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this select */
    'aria-describedby'?: string;
    /** Indicates select has invalid value */
    'aria-invalid'?: boolean;
    /** Show clear button when value is selected */
    clearable?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Change event handler */
    onchange?: (value: string) => void;
}
import { Select } from 'bits-ui';
declare const Select: import("svelte").Component<SelectProps, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
