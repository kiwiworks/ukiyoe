export type KbdSize = 'xs' | 'sm' | 'md';
export interface KbdProps {
    /** The key or key combination to display */
    keys?: string | string[];
    /** Size preset */
    size?: KbdSize;
    /** Additional CSS classes */
    class?: string;
    /** Children snippet for custom content */
    children?: import('svelte').Snippet;
}
declare const Kbd: import("svelte").Component<KbdProps, {}, "">;
type Kbd = ReturnType<typeof Kbd>;
export default Kbd;
