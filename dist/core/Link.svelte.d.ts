export type LinkVariant = 'default' | 'muted' | 'brand';
export interface LinkProps {
    href: string;
    variant?: LinkVariant;
    external?: boolean;
    class?: string;
    children: import('svelte').Snippet;
}
declare const Link: import("svelte").Component<LinkProps, {}, "">;
type Link = ReturnType<typeof Link>;
export default Link;
