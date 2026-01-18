<script lang="ts" module>
	export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

	export interface SkeletonProps {
		variant?: SkeletonVariant;
		width?: string;
		height?: string;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		variant = 'text',
		width,
		height,
		class: className = ''
	}: SkeletonProps = $props();

	const variantClasses: Record<SkeletonVariant, string> = {
		text: 'h-4 rounded',
		circular: 'rounded-full aspect-square',
		rectangular: 'rounded-md'
	};

	const defaultSizes: Record<SkeletonVariant, { width: string; height: string }> = {
		text: { width: '100%', height: '1rem' },
		circular: { width: '2.5rem', height: '2.5rem' },
		rectangular: { width: '100%', height: '4rem' }
	};

	const finalWidth = $derived(width ?? defaultSizes[variant].width);
	const finalHeight = $derived(height ?? defaultSizes[variant].height);
</script>

<div
	class={cn('animate-pulse bg-bg-tertiary', variantClasses[variant], className)}
	style="width: {finalWidth}; height: {finalHeight};"
	role="status"
	aria-label="Loading..."
></div>
