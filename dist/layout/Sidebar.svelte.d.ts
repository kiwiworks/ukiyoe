import type { Snippet } from 'svelte';
export type SidebarMode = 'sidebar' | 'drawer';
export interface SidebarProps {
    width?: number;
    collapsed?: boolean;
    /** Display mode: 'sidebar' (default inline) or 'drawer' (fixed overlay) */
    mode?: SidebarMode;
    /** Whether the drawer is open (only used in drawer mode, bindable) */
    drawerOpen?: boolean;
    onToggle?: () => void;
    children: Snippet;
    class?: string;
}
declare const Sidebar: import("svelte").Component<SidebarProps, {}, "collapsed" | "drawerOpen">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
