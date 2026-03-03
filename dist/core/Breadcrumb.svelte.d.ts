import type { ComponentType } from 'svelte';
export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: ComponentType;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    showHome?: boolean;
}
declare const Breadcrumb: import("svelte").Component<BreadcrumbProps, {}, "">;
type Breadcrumb = ReturnType<typeof Breadcrumb>;
export default Breadcrumb;
