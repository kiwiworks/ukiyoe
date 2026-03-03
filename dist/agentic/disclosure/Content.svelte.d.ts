export interface DisclosureContentProps {
    /** Additional CSS classes */
    class?: string;
    /** Content */
    children: import('svelte').Snippet;
}
declare const Content: import("svelte").Component<DisclosureContentProps, {}, "">;
type Content = ReturnType<typeof Content>;
export default Content;
