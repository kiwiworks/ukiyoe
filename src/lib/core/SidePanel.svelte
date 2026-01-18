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
		/** Whether to show backdrop overlay */
		showOverlay?: boolean;
		/** Close when clicking overlay */
		closeOnOverlayClick?: boolean;
		/** Callback when panel is closed */
		onclose?: () => void;
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
	import { X } from '@lucide/svelte';
	import { cn } from '../utils/cn';
	import { fade, fly } from 'svelte/transition';

	let {
		title,
		open = $bindable(false),
		width = 320,
		position = 'right',
		showOverlay = true,
		closeOnOverlayClick = true,
		onclose,
		class: className = '',
		header,
		children,
		footer
	}: SidePanelProps = $props();

	function closePanel() {
		open = false;
		onclose?.();
	}

	function handleOverlayClick() {
		if (closeOnOverlayClick) {
			closePanel();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			closePanel();
		}
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	const flyX = $derived(position === 'left' ? -width : width);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	{#if showOverlay}
		<div
			class="fixed inset-0 z-[999] bg-bg-overlay backdrop-blur-sm"
			transition:fade={{ duration: 200 }}
			onclick={handleOverlayClick}
			onkeydown={handleKeydown}
			role="presentation"
		></div>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<aside
		class={cn(
			'fixed top-0 bottom-0 z-[1000] flex flex-col bg-bg-secondary h-full overflow-hidden shadow-2xl',
			position === 'left' ? 'left-0 border-r border-border-subtle' : 'right-0 border-l border-border-subtle',
			className
		)}
		style:width="{width}px"
		transition:fly={{ x: flyX, duration: 300, opacity: 1 }}
		aria-label={title}
		role="dialog"
		aria-modal="true"
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
				onclick={closePanel}
				aria-label="Close panel"
			>
				<X size={16} />
			</button>
		</header>

		<div class="flex-1 overflow-y-auto overflow-x-hidden p-4">
			{@render children()}
		</div>

		{#if footer}
			<footer class="p-4 border-t border-border-subtle bg-bg-primary shrink-0">
				{@render footer()}
			</footer>
		{/if}
	</aside>
{/if}
