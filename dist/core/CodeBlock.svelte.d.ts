export interface CodeBlockProps {
    /** The code content to display */
    code: string;
    /** Programming language for semantic styling */
    language?: string;
    /** Display as inline code (single line) */
    inline?: boolean;
    /** Show line numbers in gutter */
    showLineNumbers?: boolean;
    /** Array of line numbers to highlight */
    highlightLines?: number[];
    /** Filename to display in header */
    filename?: string;
    /** Additional CSS classes */
    class?: string;
}
declare const CodeBlock: import("svelte").Component<CodeBlockProps, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
