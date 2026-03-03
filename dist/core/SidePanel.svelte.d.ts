export type SidePanelPosition = 'left' | 'right';
export interface SidePanelProps {
    /** Title displayed in the panel header */
    title: string;
    /** Whether the panel is open */
    open?: boolean;
    /** Width of the panel in pixels */
    width?: number;
    /** Position of the panel (left or right side) */
    position?: SidePanelPosition;
    /** Whether to show backdrop overlay */
    showOverlay?: boolean;
    /** Close when clicking overlay */
    closeOnOverlayClick?: boolean;
    /** Callback when panel is closed */
    onClose?: () => void;
    /** Additional CSS classes */
    class?: string;
    /** Header slot content (e.g., search input) */
    header?: import('svelte').Snippet;
    /** Main scrollable content */
    children: import('svelte').Snippet;
    /** Sticky footer content */
    footer?: import('svelte').Snippet;
}
declare const SidePanel: import("svelte").Component<SidePanelProps, {}, "open">;
type SidePanel = ReturnType<typeof SidePanel>;
export default SidePanel;
