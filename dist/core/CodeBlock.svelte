<script lang="ts" module>
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
</script>

<script lang="ts">
	import { cn } from '../utils/cn';
	import { Copy, Check, FileCode } from '@lucide/svelte';

	let {
		code,
		language,
		inline = false,
		showLineNumbers = true,
		highlightLines = [],
		filename,
		class: className = ''
	}: CodeBlockProps = $props();

	let copied = $state(false);

	const lines = $derived(code.split('\n'));
	const highlightSet = $derived(new Set(highlightLines));
	const maxLineNumberWidth = $derived(String(lines.length).length);

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
	<code
		class={cn(
			'font-mono text-xs text-text-primary bg-bg-tertiary px-1.5 py-0.5 rounded-sm',
			className
		)}
	>{code}</code>
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
					{#if language}
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
		</div>
	</div>
{/if}
