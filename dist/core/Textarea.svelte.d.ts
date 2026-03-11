export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg';
export interface TextareaProps {
    value?: string;
    placeholder?: string;
    size?: TextareaSize;
    rows?: number;
    disabled?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: boolean;
    id?: string;
    name?: string;
    /** HTML autocomplete attribute for browser autofill */
    autocomplete?: HTMLTextAreaElement['autocomplete'];
    'aria-label'?: string;
    'aria-describedby'?: string;
    class?: string;
    onValueChange?: (value: string) => void;
    onFocus?: (event: FocusEvent & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
    onBlur?: (event: FocusEvent & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
}
declare const Textarea: import("svelte").Component<TextareaProps, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
