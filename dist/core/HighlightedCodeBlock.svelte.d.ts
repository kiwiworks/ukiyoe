export interface HighlightedCodeBlockProps {
    /** The code content to display */
    code: string;
    /** Programming language for syntax highlighting */
    language?: string;
    /** Display as inline code (single line) */
    inline?: boolean;
    /** Show line numbers in gutter */
    showLineNumbers?: boolean;
    /** Array of line numbers to highlight */
    highlightLines?: number[];
    /** Filename to display in header */
    filename?: string;
    /** Theme for syntax highlighting */
    theme?: string;
    /** Additional CSS classes */
    class?: string;
}
declare const HighlightedCodeBlock: import("svelte").Component<HighlightedCodeBlockProps, {}, "">;
type HighlightedCodeBlock = ReturnType<typeof HighlightedCodeBlock>;
export default HighlightedCodeBlock;
