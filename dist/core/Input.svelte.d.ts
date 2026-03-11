import type { Snippet } from 'svelte';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputAlign = 'left' | 'center' | 'right';
export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local';
export type InputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
export interface InputProps {
    type?: InputType;
    value?: string;
    placeholder?: string;
    size?: InputSize;
    align?: InputAlign;
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    /** Show eye toggle for password fields (default: true when type is password) */
    showPasswordToggle?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: boolean;
    /** Left adornment — plain string or Snippet for icons/custom content */
    prefix?: string | Snippet;
    /** Right adornment — plain string or Snippet for icons/custom content (loading spinner takes priority) */
    suffix?: string | Snippet;
    id?: string;
    name?: string;
    /** HTML autocomplete attribute for browser autofill */
    autocomplete?: HTMLInputElement['autocomplete'];
    /** Input mode hint for virtual keyboards */
    inputmode?: InputMode;
    'aria-label'?: string;
    'aria-describedby'?: string;
    class?: string;
    onValueChange?: (value: string) => void;
    onFocus?: (event: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
    onBlur?: (event: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
}
declare const Input: import("svelte").Component<InputProps, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
