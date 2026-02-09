/**
 * MandelbrotAvatar - Deterministic fractal visualization from UUID.
 *
 * Renders a small Mandelbrot region derived from the UUID as a background,
 * with an optional icon overlay. Use for portfolios, accounts, or any entity with an ID.
 */
export type MandelbrotAvatarRounded = 'none' | 'sm' | 'md' | 'full';
export interface MandelbrotAvatarProps {
    uuid: string;
    size?: number;
    rounded?: MandelbrotAvatarRounded;
    children?: import('svelte').Snippet;
}
declare const MandelbrotAvatar: import("svelte").Component<MandelbrotAvatarProps, {}, "">;
type MandelbrotAvatar = ReturnType<typeof MandelbrotAvatar>;
export default MandelbrotAvatar;
