<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type SidebarMode = 'sidebar' | 'drawer';

	export interface SidebarProps {
		width?: number;
		collapsed?: boolean;
		/** Display mode: 'sidebar' (default inline) or 'drawer' (fixed overlay) */
		mode?: SidebarMode;
		/** Whether the drawer is open (only used in drawer mode, bindable) */
		drawerOpen?: boolean;
		onToggle?: () => void;
		children: Snippet;
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';
	import { cn } from '../utils/cn';
	import { fade, fly } from 'svelte/transition';
	import { viewportStore } from '../stores/viewport.svelte';
	import { acquireBodyScrollLock } from '../utils/scroll-lock';

	let {
		width = 256,
		collapsed = $bindable(false),
		mode = 'sidebar',
		drawerOpen = $bindable(false),
		onToggle,
		children,
		class: className
	}: SidebarProps = $props();
	let releaseScrollLock: (() => void) | null = null;

	const currentWidth = $derived(collapsed ? 48 : width);
	const drawerWidth = $derived(Math.min(width, viewportStore.width - 64));

	function handleToggle() {
		collapsed = !collapsed;
		onToggle?.();
	}

	function closeDrawer() {
		drawerOpen = false;
	}

	$effect(() => {
		if (mode === 'drawer' && drawerOpen) {
			releaseScrollLock ??= acquireBodyScrollLock();
		} else if (mode === 'drawer') {
			releaseScrollLock?.();
			releaseScrollLock = null;
		}

		return () => {
			releaseScrollLock?.();
			releaseScrollLock = null;
		};
	});
</script>

{#if mode === 'drawer'}
	{#if drawerOpen}
		<!-- Backdrop -->
		<div
			class="fixed inset-0 z-[998] bg-bg-overlay backdrop-blur-sm"
			transition:fade={{ duration: 200 }}
			onclick={closeDrawer}
			role="presentation"
		></div>

		<!-- Drawer panel -->
		<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
		<aside
			class={cn(
				'fixed inset-y-0 left-0 z-[999] flex flex-col bg-bg-primary border-r border-border-subtle font-mono shadow-2xl',
				className
			)}
			style:width="{drawerWidth}px"
			style:padding-top="var(--safe-area-top)"
			style:padding-bottom="var(--safe-area-bottom)"
			style:padding-left="var(--safe-area-left)"
			transition:fly={{ x: -drawerWidth, duration: 300, opacity: 1 }}
			role="dialog"
			aria-modal="true"
			aria-label="Navigation drawer"
		>
			<div class="flex items-center justify-end p-2 border-b border-border-subtle shrink-0">
				<button
					type="button"
					class="p-2 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-md transition-colors touch-target"
					onclick={closeDrawer}
					aria-label="Close navigation"
				>
					<X size={16} />
				</button>
			</div>
			<div class="flex-1 overflow-y-auto overflow-x-hidden">
				{@render children()}
			</div>
		</aside>
	{/if}
{:else}
	<!-- Standard sidebar mode -->
	<aside
		class={cn('self-stretch shrink-0 bg-bg-primary border-r border-border-subtle flex flex-col font-mono transition-all duration-300 ease-in-out', className)}
		style:width="{currentWidth}px"
	>
		<div class="flex-1 overflow-y-auto overflow-x-hidden" aria-hidden={collapsed}>
			{@render children()}
		</div>
		<div class="border-t border-border-subtle p-md">
			<button
				onclick={handleToggle}
				class="w-full flex items-center justify-center p-1.5 text-text-muted rounded-md transition-all duration-100 ease-linear hover:text-text-primary hover:bg-bg-hover touch-target"
				aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				aria-expanded={!collapsed}
			>
				{#if collapsed}
					<ChevronRight size={14} />
				{:else}
					<ChevronLeft size={14} />
				{/if}
			</button>
		</div>
	</aside>
{/if}
