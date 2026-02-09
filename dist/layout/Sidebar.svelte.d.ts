import type { Snippet } from 'svelte';
export interface SidebarProps {
    width?: number;
    collapsed?: boolean;
    onToggle?: () => void;
    children: Snippet;
    class?: string;
}
declare const Sidebar: import("svelte").Component<SidebarProps, {}, "collapsed">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
