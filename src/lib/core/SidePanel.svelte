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

	const positionClasses: Record<SidePanelPosition, string> = {
		left: 'border-r border-l-0 border-border-subtle',
		right: 'border-l border-r-0 border-border-subtle'
	};
</script>

<aside
	class="flex flex-col bg-bg-secondary border border-border-subtle h-full overflow-hidden transition-[width] duration-200 ease-out {positionClasses[position]} {className}"
	style:width="{width}px"
	aria-label={title}
>
	<header
		class="flex items-center gap-3 px-4 py-3 border-b border-border-subtle shrink-0 bg-bg-primary"
	>
		<span
			class="flex-1 text-xs font-semibold uppercase tracking-wider text-text-muted min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
		>
			{title}
		</span>
		{#if header}
			<div class="flex items-center shrink-0">
				{@render header()}
			</div>
		{/if}
		<button
			class="flex items-center justify-center p-1.5 bg-transparent border-none text-text-muted cursor-pointer rounded-sm transition-all duration-150 ease-out shrink-0 hover:text-text-primary hover:bg-bg-hover"
			onclick={togglePanel}
			aria-label={open ? 'Close panel' : 'Open panel'}
		>
			<ChevronLeft size={16} />
		</button>
	</header>

	{#if open}
		<div class="flex-1 overflow-y-auto overflow-x-hidden p-3">
			{@render children()}
		</div>
	{/if}

	{#if footer && open}
		<footer class="p-3 border-t border-border-subtle bg-bg-primary shrink-0">
			{@render footer()}
		</footer>
	{/if}
</aside>
