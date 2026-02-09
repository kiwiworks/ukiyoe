export type WidgetVariant = 'default' | 'compact' | 'borderless';
export interface WidgetProps {
    title?: string;
    subtitle?: string;
    variant?: WidgetVariant;
    class?: string;
    headerActions?: import('svelte').Snippet;
    children: import('svelte').Snippet;
}
declare const Widget: import("svelte").Component<WidgetProps, {}, "">;
type Widget = ReturnType<typeof Widget>;
export default Widget;
