import type { Component } from 'svelte';
export interface SmartSelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    shortcut?: string;
    disabled?: boolean;
    group?: string;
}
export interface SmartSelectAction {
    id: string;
    label: string;
    description?: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    shortcut?: string;
    onSelect: () => void;
}
export type SmartSelectSize = 'xs' | 'sm' | 'md' | 'lg';
export interface SmartSelectProps {
    /** Selected value (bindable) */
    value?: string;
    /** Available options */
    options?: SmartSelectOption[];
    /** Actions that can be triggered */
    actions?: SmartSelectAction[];
    /** Size preset */
    size?: SmartSelectSize;
    /** Disable interactions */
    disabled?: boolean;
    /** Show loading spinner */
    loading?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** Empty state message */
    emptyMessage?: string;
    /** HTML id attribute */
    id?: string;
    /** Accessible label */
    'aria-label'?: string;
    /** Whether the field value is invalid */
    'aria-invalid'?: boolean;
    /** ID of element describing this select */
    'aria-describedby'?: string;
    /** Additional CSS classes */
    class?: string;
    /** Value change handler for option selection */
    onValueChange?: (value: string) => void;
    /** Custom filter function */
    filter?: (option: SmartSelectOption, query: string) => boolean;
    /** Highlight matching text in results */
    highlightMatch?: boolean;
    /** Custom class for highlighted text */
    highlightClass?: string;
}
declare const SmartSelect: Component<SmartSelectProps, {}, "value">;
type SmartSelect = ReturnType<typeof SmartSelect>;
export default SmartSelect;
