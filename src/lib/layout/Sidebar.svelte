<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	interface Props {
		width?: number;
		collapsed?: boolean;
		onToggle?: () => void;
		children: Snippet;
		class?: string;
	}

	let {
		width = 256,
		collapsed = $bindable(false),
		onToggle,
		children,
		class: className = ''
	}: Props = $props();

	const currentWidth = $derived(collapsed ? 48 : width);

	function handleToggle() {
		collapsed = !collapsed;
		onToggle?.();
	}
</script>

<aside class="sidebar {className}" style="width: {currentWidth}px;">
	<div class="sidebar-content">
		{@render children()}
	</div>
	<div class="sidebar-footer">
		<button
			onclick={handleToggle}
			class="sidebar-toggle"
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
		>
			{#if collapsed}
				<ChevronRight size={14} />
			{:else}
				<ChevronLeft size={14} />
			{/if}
		</button>
	</div>
</aside>

<style>
	.sidebar {
		align-self: stretch;
		flex-shrink: 0;
		background-color: var(--bg-primary);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		font-family: var(--font-mono);
		transition: width 0.3s ease-in-out;
	}

	.sidebar-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.sidebar-footer {
		border-top: 1px solid var(--border-subtle);
		padding: 0.5rem;
	}

	.sidebar-toggle {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.375rem;
		color: var(--text-muted);
		border-radius: var(--radius-md);
		transition: all 0.1s ease;
	}

	.sidebar-toggle:hover {
		color: var(--text-primary);
		background-color: var(--bg-hover);
	}
</style>
