import type { Snippet } from 'svelte';
export type HeaderSize = 'sm' | 'md' | 'lg';
export interface HeaderProps {
    /** Header title text */
    title: string;
    /** Optional subtitle */
    subtitle?: string;
    /** Size variant */
    size?: HeaderSize;
    /** Fixed to top of viewport */
    fixed?: boolean;
    /** Show the brand indicator dot */
    showIndicator?: boolean;
    /** Custom icon/logo slot */
    icon?: Snippet;
    /** Actions slot (right side) */
    children?: Snippet;
    /** Additional CSS classes */
    class?: string;
}
declare const Header: import("svelte").Component<HeaderProps, {}, "">;
type Header = ReturnType<typeof Header>;
export default Header;
