export interface NotFoundProps {
    /** Page title */
    title?: string;
    /** Description message */
    description?: string;
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
    /** Additional CSS classes */
    class?: string;
    /** Custom content slot */
    children?: import('svelte').Snippet;
}
declare const NotFound: import("svelte").Component<NotFoundProps, {}, "">;
type NotFound = ReturnType<typeof NotFound>;
export default NotFound;
