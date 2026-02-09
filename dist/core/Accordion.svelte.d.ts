import type { Snippet } from 'svelte';
export interface AccordionItem {
    value: string;
    title: string;
    content?: string;
}
export interface AccordionProps {
    items: AccordionItem[];
    type?: 'single' | 'multiple';
    value?: string | string[];
    class?: string;
    children?: Snippet<[AccordionItem]>;
}
import { Accordion } from 'bits-ui';
declare const Accordion: import("svelte").Component<AccordionProps, {}, "value">;
type Accordion = ReturnType<typeof Accordion>;
export default Accordion;
