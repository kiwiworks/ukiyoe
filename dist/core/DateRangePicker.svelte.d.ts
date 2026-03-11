import type { DateValue } from '@internationalized/date';
import type { DateRange } from 'bits-ui';
export type DateRangePickerSize = 'xs' | 'sm' | 'md' | 'lg';
export interface DateModifier {
    /** Match function - return true if date should be modified */
    match: (date: Date) => boolean;
    /** Optional CSS class to apply to matching dates */
    class?: string;
    /** Disable matching dates */
    disabled?: boolean;
}
export interface DateRangePickerProps {
    /** Selected date range (bindable) */
    value?: DateRange | undefined;
    /** Date modifiers for customizing date appearance/behavior */
    modifiers?: DateModifier[];
    /** Size preset */
    size?: DateRangePickerSize;
    /** Placeholder text when no range selected */
    placeholder?: string;
    /** Disable interactions */
    disabled?: boolean;
    /** Number of months to display */
    numberOfMonths?: number;
    /** Minimum selectable date */
    minValue?: DateValue;
    /** Maximum selectable date */
    maxValue?: DateValue;
    /** Allow selecting dates marked as disabled by modifiers (still styled, but selectable) */
    allowUnavailable?: boolean;
    /** HTML id attribute */
    id?: string;
    /** Accessible label for screen readers */
    'aria-label'?: string;
    /** ID of element describing this picker */
    'aria-describedby'?: string;
    /** Whether the field value is invalid */
    'aria-invalid'?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Value change handler */
    onValueChange?: (value: DateRange | undefined) => void;
}
declare const DateRangePicker: import("svelte").Component<DateRangePickerProps, {}, "value">;
type DateRangePicker = ReturnType<typeof DateRangePicker>;
export default DateRangePicker;
