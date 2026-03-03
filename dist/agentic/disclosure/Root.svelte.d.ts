export interface DisclosureRootProps {
    /** Whether the disclosure is expanded */
    expanded?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Content */
    children: import('svelte').Snippet;
}
declare const Root: import("svelte").Component<DisclosureRootProps, {}, "expanded">;
type Root = ReturnType<typeof Root>;
export default Root;
