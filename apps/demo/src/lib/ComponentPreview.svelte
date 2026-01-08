<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Check, ChevronDown, ChevronUp, Copy } from '@lucide/svelte';

	interface Props {
		code: string;
		lang?: string;
		title?: string;
		highlightedHtml: string;
		children: Snippet;
	}

	let { code, lang = 'svelte', title, highlightedHtml, children }: Props = $props();

	let expanded = $state(false);
	let copied = $state(false);

	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function toggleExpand() {
		expanded = !expanded;
	}
</script>

<div class="component-preview">
	{#if title}
		<div class="preview-header">
			<span class="preview-title">{title}</span>
		</div>
	{/if}

	<div class="preview-demo">
		{@render children()}
	</div>

	<div class="preview-code-wrapper">
		<button class="code-toggle" onclick={toggleExpand} type="button">
			<span class="code-label">
				{#if expanded}
					<ChevronUp size={14} />
				{:else}
					<ChevronDown size={14} />
				{/if}
				<span>{expanded ? 'Hide' : 'Show'} Code</span>
			</span>
			<span class="lang-badge">{lang}</span>
		</button>

		{#if expanded}
			<div class="code-container">
				<button class="copy-btn" onclick={copyCode} type="button" title="Copy code">
					{#if copied}
						<Check size={14} />
					{:else}
						<Copy size={14} />
					{/if}
				</button>
				<div class="code-block">
					{@html highlightedHtml}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.component-preview {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		background-color: var(--bg-secondary);
		overflow: hidden;
		font-family: var(--font-mono);
	}

	.preview-header {
		padding: var(--spacing-sm) var(--spacing-md);
		border-bottom: 1px solid var(--border-subtle);
	}

	.preview-title {
		color: var(--text-muted);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.preview-demo {
		padding: var(--spacing-lg);
		background-color: var(--bg-primary);
		min-height: 60px;
		width: 100%;
	}

	.preview-code-wrapper {
		border-top: 1px solid var(--border-subtle);
	}

	.code-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background: transparent;
		border: none;
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.code-toggle:hover {
		background-color: var(--bg-hover);
	}

	.code-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.lang-badge {
		padding: 2px 6px;
		background-color: var(--bg-elevated);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		color: var(--text-muted);
	}

	.code-container {
		position: relative;
		background-color: var(--bg-tertiary);
	}

	.copy-btn {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		padding: var(--spacing-xs);
		background-color: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		opacity: 0.7;
		transition:
			opacity 0.15s ease,
			background-color 0.15s ease;
		z-index: 1;
	}

	.copy-btn:hover {
		opacity: 1;
		background-color: var(--bg-hover);
	}

	.code-block {
		margin: 0;
		padding-right: calc(var(--spacing-md) + 32px);
		overflow-x: auto;
	}

	/* Style shiki output */
	.code-block :global(pre) {
		margin: 0;
		padding: var(--spacing-md);
		background-color: transparent !important;
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		line-height: 1.6;
		white-space: pre;
		tab-size: 2;
	}

	.code-block :global(code) {
		font-family: inherit;
	}
</style>
