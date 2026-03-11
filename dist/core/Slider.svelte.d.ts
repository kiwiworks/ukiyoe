export type SliderSize = 'xs' | 'sm' | 'md' | 'lg';
export interface SliderProps {
    /** Current value(s) (bindable) */
    value?: number[];
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Disable interactions */
    disabled?: boolean;
    /** Size preset */
    size?: SliderSize;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this slider */
    'aria-describedby'?: string;
    /** Whether the field value is invalid */
    'aria-invalid'?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Value change handler */
    onValueChange?: (value: number[]) => void;
}
import { Slider } from 'bits-ui';
declare const Slider: import("svelte").Component<SliderProps, {}, "value">;
type Slider = ReturnType<typeof Slider>;
export default Slider;
