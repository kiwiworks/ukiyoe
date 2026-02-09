<script lang="ts" module>
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
		onchange?: (value: string) => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { onMount, onDestroy } from 'svelte';

	let {
		value = '',
		language = 'text',
		placeholder = '',
		readonly = false,
		lineNumbers = true,
		foldGutter = true,
		highlightActiveLine = true,
		autocomplete = true,
		search = true,
		tabSize = 2,
		minHeight = 200,
		maxHeight,
		onchange,
		class: className = ''
	}: CodeEditorProps = $props();

	let container: HTMLDivElement;
	let editorView = $state<import('@codemirror/view').EditorView | null>(null);
	let isInternalUpdate = false;

	onMount(async () => {
		const { EditorView, keymap, lineNumbers: lineNumbersExt, highlightActiveLine: highlightActiveLineExt, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLineGutter, placeholder: placeholderExt } = await import('@codemirror/view');
		const { EditorState, Compartment } = await import('@codemirror/state');
		const { defaultKeymap, history, historyKeymap, indentWithTab } = await import('@codemirror/commands');
		const { syntaxHighlighting, defaultHighlightStyle, indentOnInput, bracketMatching, foldGutter: foldGutterExt, foldKeymap } = await import('@codemirror/language');
		const { oneDark } = await import('@codemirror/theme-one-dark');
		const { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } = await import('@codemirror/autocomplete');
		const { searchKeymap, highlightSelectionMatches } = await import('@codemirror/search');

		// Language support
		const languageExtension = await getLanguageExtension(language);

		const extensions: import('@codemirror/state').Extension[] = [
			// Basic setup
			history(),
			drawSelection(),
			dropCursor(),
			EditorState.allowMultipleSelections.of(true),
			indentOnInput(),
			syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
			bracketMatching(),
			rectangularSelection(),
			crosshairCursor(),
			highlightSelectionMatches(),

			// Theme
			oneDark,
			EditorView.theme({
				'&': {
					height: '100%',
					minHeight: `${minHeight}px`,
					...(maxHeight ? { maxHeight: `${maxHeight}px` } : {}),
					fontSize: '13px',
					backgroundColor: 'var(--color-bg-tertiary)',
					borderRadius: 'var(--radius-md)',
					border: '1px solid var(--color-border-subtle)'
				},
				'.cm-scroller': {
					overflow: 'auto',
					fontFamily: 'var(--font-mono, ui-monospace, monospace)'
				},
				'.cm-content': {
					padding: 'var(--spacing-sm) 0'
				},
				'.cm-gutters': {
					backgroundColor: 'var(--color-bg-secondary)',
					borderRight: '1px solid var(--color-border-subtle)',
					color: 'var(--color-text-muted)'
				},
				'.cm-activeLineGutter': {
					backgroundColor: 'var(--color-bg-hover)'
				},
				'.cm-activeLine': {
					backgroundColor: 'var(--color-bg-hover)'
				},
				'&.cm-focused': {
					outline: 'none'
				},
				'&.cm-focused .cm-cursor': {
					borderLeftColor: 'var(--color-accent-brand)'
				},
				'.cm-selectionBackground': {
					backgroundColor: 'var(--color-accent-brand) !important',
					opacity: '0.3'
				},
				'&.cm-focused .cm-selectionBackground': {
					backgroundColor: 'var(--color-accent-brand) !important',
					opacity: '0.3'
				},
				'.cm-placeholder': {
					color: 'var(--color-text-muted)',
					fontStyle: 'italic'
				}
			}),

			// Keymaps
			keymap.of([
				...closeBracketsKeymap,
				...defaultKeymap,
				...historyKeymap,
				...foldKeymap,
				...(search ? searchKeymap : []),
				...(autocomplete ? completionKeymap : []),
				indentWithTab
			]),

			// Tab size
			EditorState.tabSize.of(tabSize),

			// Update listener
			EditorView.updateListener.of((update) => {
				if (update.docChanged && !isInternalUpdate) {
					const newValue = update.state.doc.toString();
					onchange?.(newValue);
				}
			})
		];

		// Conditional extensions
		if (lineNumbers) {
			extensions.push(lineNumbersExt(), highlightActiveLineGutter());
		}
		if (highlightActiveLine) {
			extensions.push(highlightActiveLineExt());
		}
		if (foldGutter) {
			extensions.push(foldGutterExt());
		}
		if (autocomplete) {
			extensions.push(closeBrackets(), autocompletion());
		}
		if (placeholder) {
			extensions.push(placeholderExt(placeholder));
		}
		if (readonly) {
			extensions.push(EditorState.readOnly.of(true));
		}
		if (languageExtension) {
			extensions.push(languageExtension);
		}

		editorView = new EditorView({
			state: EditorState.create({
				doc: value,
				extensions
			}),
			parent: container
		});
	});

	async function getLanguageExtension(lang: string) {
		switch (lang) {
			case 'json':
				const { json } = await import('@codemirror/lang-json');
				return json();
			case 'javascript':
			case 'typescript':
				const { javascript } = await import('@codemirror/lang-javascript');
				return javascript({ typescript: lang === 'typescript' });
			case 'html':
				const { html } = await import('@codemirror/lang-html');
				return html();
			case 'css':
				const { css } = await import('@codemirror/lang-css');
				return css();
			case 'markdown':
				const { markdown } = await import('@codemirror/lang-markdown');
				return markdown();
			case 'xml':
				const { xml } = await import('@codemirror/lang-xml');
				return xml();
			case 'yaml':
				const { yaml } = await import('@codemirror/lang-yaml');
				return yaml();
			default:
				return null;
		}
	}

	// Sync external value changes to editor
	$effect(() => {
		if (editorView && value !== editorView.state.doc.toString()) {
			isInternalUpdate = true;
			editorView.dispatch({
				changes: {
					from: 0,
					to: editorView.state.doc.length,
					insert: value
				}
			});
			isInternalUpdate = false;
		}
	});

	onDestroy(() => {
		editorView?.destroy();
	});
</script>

<div
	bind:this={container}
	class={cn('code-editor', className)}
></div>

<style>
	.code-editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.code-editor :global(.cm-editor) {
		flex: 1;
	}
</style>
