<script lang="ts" module>
	export type MenuItemVariant = 'default' | 'danger' | 'admin';

	export interface MenuItemProps {
		variant?: MenuItemVariant;
		disabled?: boolean;
		onclick?: () => void;
		icon?: import('svelte').Snippet;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'default',
		disabled = false,
		onclick,
		icon,
		children
	}: MenuItemProps = $props();
</script>

<button
	class="menu-item"
	class:danger={variant === 'danger'}
	class:admin={variant === 'admin'}
	{disabled}
	aria-disabled={disabled}
	{onclick}
	role="menuitem"
>
	{#if icon}
		<span class="menu-item-icon">{@render icon()}</span>
	{/if}
	{@render children()}
</button>

<style>
	.menu-item {
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

	.menu-item:hover:not(:disabled) {
		background: var(--bg-hover);
		color: var(--text-primary);
	}

	.menu-item:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.menu-item.danger {
		color: var(--color-negative);
	}

	.menu-item.danger:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-negative) 15%, transparent);
	}

	.menu-item.admin {
		color: var(--gold);
	}

	.menu-item.admin:hover:not(:disabled) {
		background: color-mix(in srgb, var(--gold) 15%, transparent);
	}

	.menu-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
