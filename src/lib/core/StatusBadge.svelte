<script lang="ts" module>
	export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
	export type StatusBadgeSize = 'sm' | 'md' | 'lg';

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
	let { label, variant, icon, pulse = false, size = 'md', class: className = '' }: StatusBadgeProps = $props();

	const variantClasses: Record<StatusBadgeVariant, string> = {
		success: 'text-positive bg-positive/10',
		warning: 'text-warning bg-warning/10',
		error: 'text-negative bg-negative/10',
		info: 'text-info bg-info/10',
		neutral: 'text-text-muted bg-text-muted/10'
	};

	const sizeClasses: Record<StatusBadgeSize, string> = {
		sm: 'text-[10px]',
		md: 'text-[11px]',
		lg: 'text-xs'
	};

	const pulseColors: Record<StatusBadgeVariant, string> = {
		success: 'bg-positive',
		warning: 'bg-warning',
		error: 'bg-negative',
		info: 'bg-info',
		neutral: 'bg-text-muted'
	};

	const iconSizes: Record<StatusBadgeSize, number> = {
		sm: 10,
		md: 12,
		lg: 14
	};
	const iconSize = $derived(iconSizes[size]);
</script>

<div
	class="inline-flex items-center gap-1.5 py-1 px-2 rounded font-semibold uppercase {variantClasses[variant]} {sizeClasses[size]} {className}"
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
