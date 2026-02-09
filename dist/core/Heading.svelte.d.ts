export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface HeadingProps {
    level?: HeadingLevel;
    size?: HeadingSize;
    id?: string;
    anchor?: boolean;
    class?: string;
    children: import('svelte').Snippet;
}
declare const Heading: import("svelte").Component<HeadingProps, {}, "">;
type Heading = ReturnType<typeof Heading>;
export default Heading;
