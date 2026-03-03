export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputAlign = 'left' | 'center' | 'right';
export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local';
export interface InputProps {
    type?: InputType;
    value?: string;
    placeholder?: string;
    size?: InputSize;
    align?: InputAlign;
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: boolean;
    prefix?: string;
    suffix?: string;
    id?: string;
    name?: string;
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
