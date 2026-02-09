<script lang="ts" module>
	import type { Token, Tokens } from 'marked';

	export interface MarkdownProps {
		/** Markdown content to render */
		content: string;
		/** Show line numbers in code blocks */
		showLineNumbers?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Lexer } from 'marked';
	import { cn } from '../utils/cn';
	import HighlightedCodeBlock from '../core/HighlightedCodeBlock.svelte';

	let { content, showLineNumbers = false, class: className = '' }: MarkdownProps = $props();

	const tokens = $derived(Lexer.lex(content));

	function renderInline(text: string): string {
		// Parse inline tokens and render to HTML
		const inlineTokens = Lexer.lexInline(text);
		return inlineTokens.map(renderInlineToken).join('');
	}

	function renderInlineToken(token: Token): string {
		switch (token.type) {
			case 'strong':
				return `<strong>${(token as Tokens.Strong).tokens?.map(renderInlineToken).join('') ?? token.raw}</strong>`;
			case 'em':
				return `<em>${(token as Tokens.Em).tokens?.map(renderInlineToken).join('') ?? token.raw}</em>`;
			case 'codespan':
				return `<code class="inline-code">${escapeHtml((token as Tokens.Codespan).text)}</code>`;
			case 'link': {
				const link = token as Tokens.Link;
				const text = link.tokens?.map(renderInlineToken).join('') ?? link.text;
				return `<a href="${escapeHtml(link.href)}" class="markdown-link"${link.title ? ` title="${escapeHtml(link.title)}"` : ''}>${text}</a>`;
			}
			case 'image': {
				const img = token as Tokens.Image;
				return `<img src="${escapeHtml(img.href)}" alt="${escapeHtml(img.text)}"${img.title ? ` title="${escapeHtml(img.title)}"` : ''} />`;
			}
			case 'br':
				return '<br />';
			case 'del':
				return `<del>${(token as Tokens.Del).tokens?.map(renderInlineToken).join('') ?? token.raw}</del>`;
			case 'text':
				return escapeHtml((token as Tokens.Text).text);
			default:
				return token.raw;
		}
	}

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}
</script>

<div class={cn('leading-relaxed [&>:first-child]:mt-0 [&>:last-child]:mb-0', className)}>
	{#each tokens as token}
		{#if token.type === 'heading'}
			{@const heading = token as Tokens.Heading}
			{#if heading.depth === 1}
				<h1 class="text-3xl font-semibold mt-6 mb-2">{@html renderInline(heading.text)}</h1>
			{:else if heading.depth === 2}
				<h2 class="text-2xl font-semibold mt-6 mb-2">{@html renderInline(heading.text)}</h2>
			{:else if heading.depth === 3}
				<h3 class="text-xl font-semibold mt-5 mb-2">{@html renderInline(heading.text)}</h3>
			{:else if heading.depth === 4}
				<h4 class="text-lg font-semibold mt-4 mb-2">{@html renderInline(heading.text)}</h4>
			{:else if heading.depth === 5}
				<h5 class="text-base font-semibold mt-4 mb-2">{@html renderInline(heading.text)}</h5>
			{:else}
				<h6 class="text-sm font-semibold mt-4 mb-2">{@html renderInline(heading.text)}</h6>
			{/if}
		{:else if token.type === 'paragraph'}
			<p class="my-4">{@html renderInline((token as Tokens.Paragraph).text)}</p>
		{:else if token.type === 'code'}
			{@const code = token as Tokens.Code}
			<div class="my-4">
				<HighlightedCodeBlock
					code={code.text}
					language={code.lang || 'text'}
					{showLineNumbers}
				/>
			</div>
		{:else if token.type === 'blockquote'}
			<blockquote class="border-l-[3px] border-border-default pl-4 my-4 text-text-secondary italic">
				{@html renderInline((token as Tokens.Blockquote).text)}
			</blockquote>
		{:else if token.type === 'list'}
			{@const list = token as Tokens.List}
			{#if list.ordered}
				<ol start={list.start || 1} class="my-4 pl-6 list-decimal">
					{#each list.items as item}
						<li class="my-1">{@html renderInline(item.text)}</li>
					{/each}
				</ol>
			{:else}
				<ul class="my-4 pl-6 list-disc">
					{#each list.items as item}
						<li class="my-1">{@html renderInline(item.text)}</li>
					{/each}
				</ul>
			{/if}
		{:else if token.type === 'table'}
			{@const table = token as Tokens.Table}
			<div class="overflow-x-auto my-4">
				<table class="w-full border-collapse">
					<thead>
						<tr>
							{#each table.header as cell, i}
								<th
									class="border border-border-subtle px-3 py-2 text-left bg-bg-secondary font-semibold"
									style={table.align[i] ? `text-align: ${table.align[i]}` : ''}
								>
									{@html renderInline(cell.text)}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each table.rows as row, rowIdx}
							<tr class={rowIdx % 2 === 1 ? 'bg-bg-secondary' : ''}>
								{#each row as cell, i}
									<td
										class="border border-border-subtle px-3 py-2"
										style={table.align[i] ? `text-align: ${table.align[i]}` : ''}
									>
										{@html renderInline(cell.text)}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if token.type === 'hr'}
			<hr class="border-none border-t border-border-subtle my-6" />
		{:else if token.type === 'space'}
			<!-- skip -->
		{:else if token.type === 'html'}
			{@html (token as Tokens.HTML).raw}
		{/if}
	{/each}
</div>

<style>
	:global(.inline-code) {
		background: var(--bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: ui-monospace, monospace;
	}

	:global(.markdown-link) {
		color: var(--accent-brand);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:global(.markdown-link:hover) {
		opacity: 0.8;
	}
</style>
