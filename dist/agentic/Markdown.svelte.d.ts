export interface MarkdownProps {
    /** Markdown content to render */
    content: string;
    /** Show line numbers in code blocks */
    showLineNumbers?: boolean;
    /** Additional CSS classes */
    class?: string;
}
declare const Markdown: import("svelte").Component<MarkdownProps, {}, "">;
type Markdown = ReturnType<typeof Markdown>;
export default Markdown;
