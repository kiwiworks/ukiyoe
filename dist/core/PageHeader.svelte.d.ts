export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: import('svelte').Component;
    backHref?: string;
    class?: string;
    badges?: import('svelte').Snippet;
    actions?: import('svelte').Snippet;
}
declare const PageHeader: import("svelte").Component<PageHeaderProps, {}, "">;
type PageHeader = ReturnType<typeof PageHeader>;
export default PageHeader;
