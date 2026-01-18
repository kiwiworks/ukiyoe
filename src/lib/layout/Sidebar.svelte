<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SidebarProps {
		width?: number;
		collapsed?: boolean;
		onToggle?: () => void;
		children: Snippet;
		class?: string;
	}
</script>

<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		width = 256,
		collapsed = $bindable(false),
		onToggle,
		children,
		class: className
	}: SidebarProps = $props();

	const currentWidth = $derived(collapsed ? 48 : width);

	function handleToggle() {
		collapsed = !collapsed;
		onToggle?.();
	}
</script>

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
			class="w-full flex items-center justify-center p-1.5 text-text-muted rounded-md transition-all duration-100 ease-linear hover:text-text-primary hover:bg-bg-hover"
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
