import type { Snippet } from 'svelte';
export interface PanelProps {
    title: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    headerActions?: Snippet;
    children: Snippet;
    class?: string;
}
declare const Panel: import("svelte").Component<PanelProps, {}, "">;
type Panel = ReturnType<typeof Panel>;
export default Panel;
