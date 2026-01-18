<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type HeaderSize = 'sm' | 'md' | 'lg';

	export interface HeaderProps {
		/** Header title text */
		title: string;
		/** Optional subtitle */
		subtitle?: string;
		/** Size variant */
		size?: HeaderSize;
		/** Fixed to top of viewport */
		fixed?: boolean;
		/** Show the brand indicator dot */
		showIndicator?: boolean;
		/** Custom icon/logo slot */
		icon?: Snippet;
		/** Actions slot (right side) */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		title,
		subtitle,
		size = 'md',
		fixed = true,
		showIndicator = true,
		icon,
		children,
		class: className
	}: HeaderProps = $props();

	const sizeClasses: Record<HeaderSize, string> = {
		sm: 'h-8 px-2',
		md: 'h-10 px-3',
		lg: 'h-12 px-4'
	};

	const gapClasses: Record<HeaderSize, string> = {
		sm: 'gap-2',
		md: 'gap-3',
		lg: 'gap-3'
	};

	const titleClasses: Record<HeaderSize, string> = {
		sm: 'text-xs',
		md: 'text-xs',
		lg: 'text-sm'
	};

	const subtitleClasses: Record<HeaderSize, string> = {
		sm: 'text-[9px]',
		md: 'text-[10px]',
		lg: 'text-xs'
	};

	const indicatorClasses: Record<HeaderSize, string> = {
		sm: 'w-1.5 h-1.5',
		md: 'w-1.5 h-1.5',
		lg: 'w-2 h-2'
	};
</script>

<header
	class={cn(
		'flex items-center justify-between bg-bg-primary border-b border-border-subtle font-mono',
		fixed && 'fixed top-0 left-0 right-0 z-[var(--z-sticky)]',
		sizeClasses[size],
		className
	)}
>
	<div class="flex items-center {gapClasses[size]}">
		{#if icon}
			<div class="flex items-center justify-center text-text-primary">
				{@render icon()}
			</div>
		{/if}
		<div class="flex items-center gap-2">
			{#if showIndicator}
				<div class="rounded-full bg-accent-brand {indicatorClasses[size]}"></div>
			{/if}
			<span class="font-bold text-text-primary uppercase tracking-wide {titleClasses[size]}">{title}</span>
		</div>
		{#if subtitle}
			<span class="text-text-muted uppercase tracking-wide {subtitleClasses[size]}">{subtitle}</span>
		{/if}
	</div>
	{#if children}
		<div class="flex items-center gap-2">
			{@render children()}
		</div>
	{/if}
</header>
