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
    'aria-label'?: string;
    'aria-describedby'?: string;
    class?: string;
    oninput?: (event: Event & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
    onchange?: (event: Event & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
    onfocus?: (event: FocusEvent & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
    onblur?: (event: FocusEvent & {
        currentTarget: HTMLTextAreaElement;
    }) => void;
}
declare const Textarea: import("svelte").Component<TextareaProps, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
