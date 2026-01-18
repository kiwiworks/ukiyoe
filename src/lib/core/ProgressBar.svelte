<script lang="ts" module>
	export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
	export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger';

	export interface ProgressBarProps {
		value?: number;
		max?: number;
		size?: ProgressBarSize;
		variant?: ProgressBarVariant;
		showValue?: boolean;
		indeterminate?: boolean;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		value = 0,
		max = 100,
		size = 'md',
		variant = 'default',
		showValue = false,
		indeterminate = false,
		class: className = ''
	}: ProgressBarProps = $props();

	const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

	const sizeClasses: Record<ProgressBarSize, string> = {
		xs: 'h-0.5',
		sm: 'h-1',
		md: 'h-2',
		lg: 'h-3'
	};

	const variantClasses: Record<ProgressBarVariant, string> = {
		default: 'bg-accent-brand',
		success: 'bg-positive',
		warning: 'bg-warning',
		danger: 'bg-negative'
	};
</script>

<div class={cn('w-full', className)}>
	<div
		class="w-full overflow-hidden rounded-full bg-bg-tertiary {sizeClasses[size]}"
		role="progressbar"
		aria-valuenow={indeterminate ? undefined : value}
		aria-valuemin={0}
		aria-valuemax={max}
	>
		{#if indeterminate}
			<div
				class="h-full rounded-full {variantClasses[variant]} animate-progress-indeterminate"
				style="width: 30%"
			></div>
		{:else}
			<div
				class="h-full rounded-full transition-all duration-300 {variantClasses[variant]}"
				style="width: {percentage}%"
			></div>
		{/if}
	</div>
	{#if showValue && !indeterminate}
		<div class="mt-1 text-xs text-text-muted text-right">
			{Math.round(percentage)}%
		</div>
	{/if}
</div>
