export interface ErrorPageProps {
    /** HTTP status code */
    status?: number;
    /** Error title */
    title?: string;
    /** Error message/description */
    message?: string;
    /** Stack trace (only shown if showStack is true) */
    stack?: string;
    /** Show stack trace */
    showStack?: boolean;
    /** Back button text */
    backText?: string;
    /** Back button href */
    backHref?: string;
    /** Home button text */
    homeText?: string;
    /** Home button href */
    homeHref?: string;
    /** Show home button */
    showHome?: boolean;
    /** Show back button */
    showBack?: boolean;
    /** Retry callback */
    onRetry?: () => void;
    /** Show retry button */
    showRetry?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Custom content slot */
    children?: import('svelte').Snippet;
}
declare const ErrorPage: import("svelte").Component<ErrorPageProps, {}, "">;
type ErrorPage = ReturnType<typeof ErrorPage>;
export default ErrorPage;
