export type ButtonVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';
export interface ButtonProps {
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** HTML button type attribute */
    type?: ButtonType;
    /** Disable interactions */
    disabled?: boolean;
    /** Visual active/pressed state */
    active?: boolean;
    /** Show loading spinner and disable interactions */
    loading?: boolean;
    /** Render as anchor element with this href */
    href?: string;
    /** Make button full-width */
    fullWidth?: boolean;
    /** Accessible label for icon-only buttons */
    'aria-label'?: string;
    /** Additional CSS classes */
    class?: string;
    /** Inline styles */
    style?: string;
    /** Click handler */
    onclick?: (event: MouseEvent) => void;
    /** Button content */
    children: import('svelte').Snippet;
}
declare const Button: import("svelte").Component<ButtonProps, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
