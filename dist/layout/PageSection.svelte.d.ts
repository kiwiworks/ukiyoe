export type PageSectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export interface PageSectionProps {
    /** Section title */
    title?: string;
    /** Section description */
    description?: string;
    /** Spacing above the section */
    spacing?: PageSectionSpacing;
    /** Additional CSS classes */
    class?: string;
    /** Title slot for custom headers */
    header?: import('svelte').Snippet;
    /** Children content */
    children?: import('svelte').Snippet;
}
declare const PageSection: import("svelte").Component<PageSectionProps, {}, "">;
type PageSection = ReturnType<typeof PageSection>;
export default PageSection;
