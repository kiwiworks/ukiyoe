<script lang="ts" module>
	export interface ActionMenuProps {
		label: string;
		icon?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import Button from './Button.svelte';

	let { label, icon, children }: ActionMenuProps = $props();
	let open = $state(false);

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.action-menu')) open = false;
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="action-menu">
	<Button size="sm" onclick={() => (open = !open)}>
		{#if icon}{@render icon()}{/if}
		{label}
		<ChevronDown size={12} />
	</Button>
	{#if open}
		<div class="dropdown" role="menu">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.action-menu {
		position: relative;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.25rem;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 0.25rem;
		min-width: 180px;
		box-shadow: var(--shadow-lg);
		z-index: 100;
	}

	:global(.dropdown-item) {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-size: 12px;
		color: var(--text-secondary);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.1s ease;
	}

	:global(.dropdown-item:hover:not(:disabled)) {
		background: var(--bg-hover);
		color: var(--text-primary);
	}

	:global(.dropdown-item:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.dropdown-item.admin) {
		color: var(--gold);
	}

	:global(.dropdown-item.admin:hover) {
		background: color-mix(in srgb, var(--gold) 15%, transparent);
	}

	:global(.dropdown-divider) {
		height: 1px;
		background: var(--border-subtle);
		margin: 0.25rem 0;
	}

	:global(.dropdown-label) {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.75rem;
		font-size: 9px;
		font-weight: 600;
		text-transform: uppercase;
		color: var(--gold);
		letter-spacing: 0.5px;
	}
</style>
