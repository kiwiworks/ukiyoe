<script lang="ts" module>
	export type ListItemVariant = 'default' | 'success' | 'warning' | 'error';

	export interface ListItemProps {
		variant?: ListItemVariant;
		interactive?: boolean;
		selected?: boolean;
		class?: string;
		icon?: import('svelte').Snippet;
		left?: import('svelte').Snippet;
		right?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let {
		variant = 'default',
		interactive = false,
		selected = false,
		class: className = '',
		icon,
		left,
		right,
		children
	}: ListItemProps = $props();

	const variantBorder: Record<string, string> = {
		default: '',
		success: 'border-l-2 border-l-positive',
		warning: 'border-l-2 border-l-warning',
		error: 'border-l-2 border-l-negative'
	};

	const computedClasses = $derived.by(() => {
		const base = 'list-item';
		const interactiveClass = interactive ? 'interactive' : '';
		const selectedClass = selected ? 'selected' : '';
		const borderClass = variantBorder[variant];
		return `${base} ${interactiveClass} ${selectedClass} ${borderClass} ${className}`.trim();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class={computedClasses}
	role={interactive ? 'button' : undefined}
	tabindex={interactive ? 0 : -1}
>
	{#if icon}
		<div class="item-icon">
			{@render icon()}
		</div>
	{/if}

	<div class="item-content">
		{#if left}
			{@render left()}
		{:else if children}
			{@render children()}
		{/if}
	</div>

	{#if right}
		<div class="item-right">
			{@render right()}
		</div>
	{/if}
</div>

<style>
	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem;
		border-radius: var(--radius-sm);
		transition: background-color 0.1s ease;
		font-size: 11px;
		font-family: var(--font-mono);
		color: var(--text-primary);
		background-color: var(--bg-primary);
	}

	.list-item.interactive {
		cursor: pointer;
	}

	.list-item.interactive:hover {
		background-color: var(--bg-hover);
	}

	.list-item.selected {
		background-color: var(--bg-secondary);
	}

	.list-item.border-l-positive {
		border-left: 2px solid var(--color-positive);
	}

	.list-item.border-l-warning {
		border-left: 2px solid var(--color-warning);
	}

	.list-item.border-l-negative {
		border-left: 2px solid var(--color-negative);
	}

	.item-icon {
		flex-shrink: 0;
	}

	.item-content {
		flex: 1;
		min-width: 0;
		padding: 0 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-right {
		flex-shrink: 0;
	}

	.list-item[role='button'] {
		outline: none;
	}

	.list-item[role='button']:focus-visible {
		box-shadow: inset 0 0 0 2px var(--accent-brand);
	}
</style>
