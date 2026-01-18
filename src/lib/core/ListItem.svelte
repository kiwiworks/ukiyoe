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
	import { cn } from '../utils/cn';

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

	const variantBorder: Record<ListItemVariant, string> = {
		default: '',
		success: 'border-l-2 border-l-positive',
		warning: 'border-l-2 border-l-warning',
		error: 'border-l-2 border-l-negative'
	};

	const computedClasses = $derived(
		cn(
			'flex items-center justify-between p-md rounded-sm transition-colors duration-100 text-xs font-mono text-text-primary bg-bg-primary',
			interactive && 'cursor-pointer hover:bg-bg-hover',
			selected && 'bg-bg-secondary',
			interactive && 'focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent-brand)]',
			variantBorder[variant],
			className
		)
	);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class={computedClasses}
	role={interactive ? 'button' : undefined}
	tabindex={interactive ? 0 : -1}
>
	{#if icon}
		<div class="shrink-0">
			{@render icon()}
		</div>
	{/if}

	<div class="flex-1 min-w-0 px-md whitespace-nowrap">
		{#if left}
			{@render left()}
		{:else if children}
			{@render children()}
		{/if}
	</div>

	{#if right}
		<div class="shrink-0">
			{@render right()}
		</div>
	{/if}
</div>
