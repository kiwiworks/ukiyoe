<script lang="ts" module>
	export type StatusBadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
	export type StatusBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface StatusBadgeProps {
		label: string;
		variant: StatusBadgeVariant;
		icon?: import('svelte').Component;
		pulse?: boolean;
		size?: StatusBadgeSize;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let { label, variant, icon, pulse = false, size = 'md', class: className = '' }: StatusBadgeProps = $props();

	const variantClasses: Record<StatusBadgeVariant, string> = {
		default: 'text-text-muted bg-neutral/10',
		info: 'text-info bg-info/10',
		success: 'text-positive bg-positive/10',
		warning: 'text-warning bg-warning/10',
		danger: 'text-negative bg-negative/10'
	};

	const sizeClasses: Record<StatusBadgeSize, string> = {
		xs: 'text-[9px]',
		sm: 'text-[10px]',
		md: 'text-[11px]',
		lg: 'text-xs'
	};

	const pulseColors: Record<StatusBadgeVariant, string> = {
		default: 'bg-neutral',
		info: 'bg-info',
		success: 'bg-positive',
		warning: 'bg-warning',
		danger: 'bg-negative'
	};

	const iconSizes: Record<StatusBadgeSize, number> = {
		xs: 8,
		sm: 10,
		md: 12,
		lg: 14
	};
	const iconSize = $derived(iconSizes[size]);
</script>

<div
	class={cn('inline-flex items-center gap-1.5 py-1 px-2 rounded font-semibold uppercase', variantClasses[variant], sizeClasses[size], className)}
>
	{#if pulse}
		<span class="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse {pulseColors[variant]}"></span>
	{/if}
	{#if icon}
		{@const Icon = icon}
		<Icon size={iconSize} class="shrink-0" />
	{/if}
	<span>{label}</span>
</div>
