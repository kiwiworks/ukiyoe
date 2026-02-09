<script lang="ts" module>
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
</script>

<script lang="ts">
	import { cn } from '../utils/cn';
	import { Copy, Check, FileCode } from '@lucide/svelte';

	let {
		code,
		language = 'text',
		inline = false,
		showLineNumbers = true,
		highlightLines = [],
		filename,
		theme = 'github-dark',
		class: className = ''
	}: HighlightedCodeBlockProps = $props();

	let copied = $state(false);
	let highlightedHtml = $state<string | null>(null);
	let error = $state<string | null>(null);

	const lines = $derived(code.split('\n'));
	const highlightSet = $derived(new Set(highlightLines));
	const maxLineNumberWidth = $derived(String(lines.length).length);

	async function loadAndHighlight(codeToHighlight: string, lang: string, themeId: string) {
		try {
			error = null;
			const { codeToHtml } = await import('shiki');
			const html = await codeToHtml(codeToHighlight, {
				lang: lang,
				theme: themeId
			});
			highlightedHtml = html;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to highlight';
			highlightedHtml = null;
			console.warn('[HighlightedCodeBlock] Highlighting failed:', e);
		}
	}

	$effect(() => {
		highlightedHtml = null;
		loadAndHighlight(code, language, theme);
	});

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function isLineHighlighted(lineNumber: number): boolean {
		return highlightSet.has(lineNumber);
	}
</script>

{#if inline}
	{#if highlightedHtml}
		<code
			class={cn(
				'font-mono text-xs bg-bg-tertiary px-1.5 py-0.5 rounded-sm [&>pre]:inline [&>pre]:bg-transparent [&>pre]:p-0',
				className
			)}
		>
			{@html highlightedHtml}
		</code>
	{:else}
		<code
			class={cn(
				'font-mono text-xs text-text-primary bg-bg-tertiary px-1.5 py-0.5 rounded-sm',
				className
			)}
		>{code}</code>
	{/if}
{:else}
	<div
		class={cn(
			'relative rounded-lg border border-border-subtle bg-bg-tertiary overflow-hidden',
			className
		)}
	>
		<!-- Header with filename and copy button -->
		{#if filename || language}
			<div
				class="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-bg-secondary"
			>
				<div class="flex items-center gap-2 text-text-muted">
					{#if filename}
						<FileCode size={14} class="shrink-0" />
						<span class="text-xs font-mono">{filename}</span>
					{/if}
				</div>
				<div class="flex items-center gap-2">
					{#if language && language !== 'text'}
						<span
							class="px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-text-muted bg-bg-hover rounded"
						>
							{language}
						</span>
					{/if}
					<button
						type="button"
						onclick={copyCode}
						class="p-1.5 rounded text-text-muted hover:text-text-secondary hover:bg-bg-hover transition-colors"
						title="Copy code"
					>
						{#if copied}
							<Check size={14} class="text-positive" />
						{:else}
							<Copy size={14} />
						{/if}
					</button>
				</div>
			</div>
		{:else}
			<!-- Copy button only when no header -->
			<button
				type="button"
				onclick={copyCode}
				class="absolute top-2 right-2 p-1.5 rounded text-text-muted hover:text-text-secondary hover:bg-bg-hover transition-colors z-10"
				title="Copy code"
			>
				{#if copied}
					<Check size={14} class="text-positive" />
				{:else}
					<Copy size={14} />
				{/if}
			</button>
		{/if}

		<!-- Code content -->
		<div class="overflow-x-auto">
			{#if highlightedHtml}
				<div
					class="highlighted-code py-4 [&>pre]:bg-transparent [&>pre]:m-0 [&>pre]:p-0 [&_code]:block [&_code]:font-mono [&_code]:text-sm [&_code]:leading-6"
				>
					{@html highlightedHtml}
				</div>
			{:else}
				<pre class="m-0 py-4 bg-transparent"><code class="block font-mono text-sm leading-6 text-text-primary">{#each lines as line, index}{@const lineNumber = index + 1}<span
							class={cn(
								'flex',
								isLineHighlighted(lineNumber) && 'bg-accent-brand/10 border-l-2 border-accent-brand -ml-[2px]'
							)}
						>{#if showLineNumbers}<span
									class="inline-block shrink-0 px-4 text-right text-text-muted select-none"
									style="min-width: {maxLineNumberWidth + 2}ch"
								>{lineNumber}</span
							>{/if}<span class="flex-1 pr-4 {showLineNumbers ? 'pl-4 border-l border-border-subtle' : 'pl-4'}">{line || ' '}</span></span>{/each}</code></pre>
			{/if}
		</div>
	</div>
{/if}
