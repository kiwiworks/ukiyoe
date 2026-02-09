<script lang="ts" module>
	export type EmptyStateSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface EmptyStateProps {
		icon?: import('svelte').Component;
		title: string;
		description?: string;
		loading?: boolean;
		size?: EmptyStateSize;
		compact?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { Loader2 } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		icon,
		title,
		description,
		loading = false,
		size = 'md',
		compact = false,
		class: className = '',
		children
	}: EmptyStateProps = $props();

	const effectiveSize = $derived(compact ? 'sm' : size);

	const iconSizes: Record<EmptyStateSize, number> = {
		xs: 16,
		sm: 24,
		md: 48,
		lg: 64
	};

	const contentClasses: Record<EmptyStateSize, string> = {
		xs: 'gap-2 p-3',
		sm: 'gap-3 p-4',
		md: 'gap-4 p-8',
		lg: 'gap-6 p-12'
	};

	const titleClasses: Record<EmptyStateSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	};

	const descClasses: Record<EmptyStateSize, string> = {
		xs: 'text-[10px]',
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-[15px]'
	};

	const iconSize = $derived(iconSizes[effectiveSize]);
</script>

<div class={cn('flex items-center justify-center w-full h-full min-h-[200px]', className)}>
	<div class="flex flex-col items-center justify-center text-center {contentClasses[effectiveSize]}">
		{#if loading}
			<Loader2 size={iconSize} class="text-text-muted shrink-0 animate-spin" />
		{:else if icon}
			{@const Icon = icon}
			<Icon size={iconSize} class="text-text-muted shrink-0" />
		{/if}
		<h2 class="m-0 font-semibold text-text-primary {titleClasses[effectiveSize]}">{title}</h2>
		{#if description}
			<p class="m-0 text-text-muted max-w-[400px] {descClasses[effectiveSize]}">{description}</p>
		{/if}
		{#if children}
			<div class="mt-2">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
