export interface SectionCardProps {
    title: string;
    icon?: import('svelte').Component;
    collapsible?: boolean;
    defaultOpen?: boolean;
    href?: string;
    class?: string;
    actions?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    empty?: import('svelte').Snippet;
}
declare const SectionCard: import("svelte").Component<SectionCardProps, {}, "">;
type SectionCard = ReturnType<typeof SectionCard>;
export default SectionCard;
