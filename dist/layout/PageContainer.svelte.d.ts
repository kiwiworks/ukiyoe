export type PageContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export interface PageContainerProps {
    /** Maximum width of the container */
    size?: PageContainerSize;
    /** Center the container horizontally */
    centered?: boolean;
    /** Add horizontal padding */
    padded?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Children content */
    children?: import('svelte').Snippet;
}
declare const PageContainer: import("svelte").Component<PageContainerProps, {}, "">;
type PageContainer = ReturnType<typeof PageContainer>;
export default PageContainer;
