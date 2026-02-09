export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextVariant = 'primary' | 'secondary' | 'muted' | 'positive' | 'negative' | 'warning';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextElement = 'p' | 'span' | 'div' | 'label';
export interface TextProps {
    size?: TextSize;
    variant?: TextVariant;
    weight?: TextWeight;
    as?: TextElement;
    mono?: boolean;
    truncate?: boolean;
    class?: string;
    children: import('svelte').Snippet;
}
declare const Text: import("svelte").Component<TextProps, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;
