export interface CodeEditorProps {
    /** The code content */
    value: string;
    /** Programming language for syntax highlighting */
    language?: 'json' | 'javascript' | 'typescript' | 'html' | 'css' | 'markdown' | 'xml' | 'yaml' | 'text';
    /** Placeholder text when empty */
    placeholder?: string;
    /** Whether the editor is read-only */
    readonly?: boolean;
    /** Whether to show line numbers */
    lineNumbers?: boolean;
    /** Whether to enable code folding */
    foldGutter?: boolean;
    /** Whether to highlight the active line */
    highlightActiveLine?: boolean;
    /** Whether to enable autocomplete */
    autocomplete?: boolean;
    /** Whether to enable search (Ctrl/Cmd+F) */
    search?: boolean;
    /** Tab size for indentation */
    tabSize?: number;
    /** Minimum height in pixels */
    minHeight?: number;
    /** Maximum height in pixels (undefined = no max) */
    maxHeight?: number;
    /** Callback when value changes */
    onValueChange?: (value: string) => void;
    /** Additional CSS classes */
    class?: string;
}
declare const CodeEditor: import("svelte").Component<CodeEditorProps, {}, "">;
type CodeEditor = ReturnType<typeof CodeEditor>;
export default CodeEditor;
