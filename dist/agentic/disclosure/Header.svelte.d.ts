export interface DisclosureHeaderProps {
    /** Header title text */
    title: string;
    /** Use monospace font for title */
    mono?: boolean;
    /** Icon snippet rendered before the title */
    icon?: import('svelte').Snippet;
    /** Trailing snippet rendered after the title */
    trailing?: import('svelte').Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const Header: import("svelte").Component<DisclosureHeaderProps, {}, "">;
type Header = ReturnType<typeof Header>;
export default Header;
