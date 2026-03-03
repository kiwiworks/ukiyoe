export interface DisclosureSectionProps {
    /** Section label */
    label: string;
    /** Additional CSS classes */
    class?: string;
    /** Content */
    children: import('svelte').Snippet;
}
declare const Section: import("svelte").Component<DisclosureSectionProps, {}, "">;
type Section = ReturnType<typeof Section>;
export default Section;
