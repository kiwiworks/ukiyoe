import type { Snippet } from 'svelte';
export type SocialPlatform = 'github' | 'twitter' | 'discord' | 'linkedin' | 'npm' | 'youtube' | 'mastodon' | 'bluesky';
export type SocialButtonVariant = 'filled' | 'outline' | 'ghost';
export type SocialButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export interface SocialButtonProps {
    /** Social platform - determines icon and brand colors */
    platform: SocialPlatform;
    /** External link URL */
    href: string;
    /** Optional text label (icon-only if omitted) */
    label?: string;
    /** Size preset */
    size?: SocialButtonSize;
    /** Style variant - filled uses brand color background */
    variant?: SocialButtonVariant;
    /** Show external link indicator arrow */
    showExternalIndicator?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Custom badge snippet (right side) */
    badge?: Snippet;
    /** GitHub star count or custom snippet */
    stars?: number | Snippet;
    /** GitHub fork count */
    forks?: number;
    /** Discord online member count */
    members?: number;
    /** npm weekly downloads */
    downloads?: number | string;
    /** npm package version */
    version?: string;
}
/** Platform brand colors from official guidelines */
export declare const platformColors: Record<SocialPlatform, {
    bg: string;
    hover: string;
    text: string;
}>;
declare const SocialButton: import("svelte").Component<SocialButtonProps, {}, "">;
type SocialButton = ReturnType<typeof SocialButton>;
export default SocialButton;
