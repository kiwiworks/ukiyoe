export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg';
export interface SwitchProps {
    /** Checked state (bindable) */
    checked?: boolean;
    /** Disable interactions */
    disabled?: boolean;
    /** Size preset */
    size?: SwitchSize;
    /** HTML id attribute for label association */
    id?: string;
    /** HTML name attribute for form submission */
    name?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this switch */
    'aria-describedby'?: string;
    /** Additional CSS classes */
    class?: string;
    /** Value change handler */
    onValueChange?: (checked: boolean) => void;
    /** Label content rendered beside the switch */
    children?: import('svelte').Snippet;
}
import { Switch } from 'bits-ui';
declare const Switch: import("svelte").Component<SwitchProps, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
