<script lang="ts" module>
	export type SidePanelPosition = 'left' | 'right';

	export interface SidePanelProps {
		/** Title displayed in the panel header */
		title: string;
		/** Whether the panel is open */
		open?: boolean;
		/** Width of the panel in pixels */
		width?: number;
		/** Position of the panel (left or right side) */
		position?: SidePanelPosition;
		/** Additional CSS classes */
		class?: string;
		/** Header slot content (e.g., search input) */
		header?: import('svelte').Snippet;
		/** Main scrollable content */
		children: import('svelte').Snippet;
		/** Sticky footer content */
		footer?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { ChevronLeft } from '@lucide/svelte';

	let {
		title,
		open = $bindable(true),
		width = 280,
		position = 'left',
		class: className = '',
		header,
		children,
		footer
	}: SidePanelProps = $props();

	function togglePanel() {
		open = !open;
	}
</script>

<aside
	class="side-panel side-panel-{position} {className}"
	class:open
	style:width="{width}px"
	aria-label={title}
>
	<header class="panel-header">
		<span class="panel-title">{title}</span>
		{#if header}
			<div class="panel-header-slot">
				{@render header()}
			</div>
		{/if}
		<button
			class="panel-toggle"
			onclick={togglePanel}
			aria-label={open ? 'Close panel' : 'Open panel'}
		>
			<ChevronLeft size={16} />
		</button>
	</header>

	{#if open}
		<div class="panel-content">
			{@render children()}
		</div>
	{/if}

	{#if footer && open}
		<footer class="panel-footer">
			{@render footer()}
		</footer>
	{/if}
</aside>

<style>
	.side-panel {
		display: flex;
		flex-direction: column;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		height: 100%;
		overflow: hidden;
		transition: width 0.2s ease;
	}

	.side-panel-left {
		border-right: 1px solid var(--border-subtle);
		border-left: none;
	}

	.side-panel-right {
		border-left: 1px solid var(--border-subtle);
		border-right: none;
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-subtle);
		flex-shrink: 0;
		background: var(--bg-primary);
	}

	.panel-title {
		flex: 1;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.panel-header-slot {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.panel-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.375rem;
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: all 0.15s ease;
		flex-shrink: 0;
	}

	.panel-toggle:hover {
		color: var(--text-primary);
		background: var(--bg-hover);
	}

	.panel-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0.75rem;
	}

	.panel-footer {
		padding: 0.75rem;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-primary);
		flex-shrink: 0;
	}
</style>
