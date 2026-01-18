<script lang="ts" module>
	export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card';
	export type SkeletonAnimation = 'pulse' | 'shimmer' | 'none';

	export interface SkeletonProps {
		variant?: SkeletonVariant;
		animation?: SkeletonAnimation;
		width?: string;
		height?: string;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		variant = 'text',
		animation = 'pulse',
		width,
		height,
		class: className = ''
	}: SkeletonProps = $props();

	const variantClasses: Record<SkeletonVariant, string> = {
		text: 'h-4 rounded',
		circular: 'rounded-full aspect-square',
		rectangular: 'rounded-md',
		card: 'rounded-lg border border-border-subtle p-4 flex flex-col gap-3'
	};

	const defaultSizes: Record<SkeletonVariant, { width: string; height: string }> = {
		text: { width: '100%', height: '1rem' },
		circular: { width: '2.5rem', height: '2.5rem' },
		rectangular: { width: '100%', height: '4rem' },
		card: { width: '100%', height: '10rem' }
	};

	const animationClasses: Record<SkeletonAnimation, string> = {
		pulse: 'animate-pulse',
		shimmer: 'animate-shimmer bg-gradient-to-r from-bg-tertiary via-bg-secondary to-bg-tertiary bg-[length:200%_100%]',
		none: ''
	};

	const finalWidth = $derived(width ?? defaultSizes[variant].width);
	const finalHeight = $derived(height ?? defaultSizes[variant].height);
</script>

{#if variant === 'card'}
	<div
		class={cn('bg-bg-secondary', variantClasses[variant], animationClasses[animation], className)}
		style="width: {finalWidth}; height: {finalHeight};"
		role="status"
		aria-label="Loading..."
	>
		<div class={cn('h-4 w-3/4 rounded bg-bg-tertiary', animationClasses[animation])}></div>
		<div class={cn('h-3 w-full rounded bg-bg-tertiary', animationClasses[animation])}></div>
		<div class={cn('h-3 w-5/6 rounded bg-bg-tertiary', animationClasses[animation])}></div>
		<div class="mt-auto flex gap-2">
			<div class={cn('h-8 w-20 rounded bg-bg-tertiary', animationClasses[animation])}></div>
			<div class={cn('h-8 w-20 rounded bg-bg-tertiary', animationClasses[animation])}></div>
		</div>
	</div>
{:else}
	<div
		class={cn('bg-bg-tertiary', variantClasses[variant], animationClasses[animation], className)}
		style="width: {finalWidth}; height: {finalHeight};"
		role="status"
		aria-label="Loading..."
	></div>
{/if}
