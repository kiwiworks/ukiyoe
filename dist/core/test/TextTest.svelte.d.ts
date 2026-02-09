import type { TextSize, TextVariant, TextWeight, TextElement } from '../Text.svelte';
type $$ComponentProps = {
    text?: string;
    size?: TextSize;
    variant?: TextVariant;
    weight?: TextWeight;
    as?: TextElement;
    mono?: boolean;
    truncate?: boolean;
};
declare const TextTest: import("svelte").Component<$$ComponentProps, {}, "">;
type TextTest = ReturnType<typeof TextTest>;
export default TextTest;
