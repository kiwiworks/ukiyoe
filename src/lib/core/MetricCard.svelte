<script lang="ts" module>
	export type MetricCardVariant = 'default' | 'positive' | 'negative' | 'warning' | 'brand';
	export type MetricCardSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface MetricCardProps {
		/** Label text displayed above the value */
		label: string;
		/** The metric value to display */
		value: string | number;
		/** Optional icon component */
		icon?: import('svelte').Component;
		/** Color variant */
		variant?: MetricCardVariant;
		/** Size preset */
		size?: MetricCardSize;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let { label, value, icon, variant = 'default', size = 'md', class: className = '' }: MetricCardProps = $props();

	const sizeClasses: Record<MetricCardSize, { card: string; icon: string; value: string }> = {
		xs: { card: 'gap-1.5 p-2', icon: 'w-6 h-6', value: 'text-base' },
		sm: { card: 'gap-2 p-3', icon: 'w-8 h-8', value: 'text-lg' },
		md: { card: 'gap-3 p-4', icon: 'w-10 h-10', value: 'text-xl' },
		lg: { card: 'gap-4 p-6', icon: 'w-12 h-12', value: 'text-2xl' }
	};

	const variantClasses: Record<Exclude<MetricCardVariant, 'brand'>, { card: string; icon: string; label: string; value: string }> = {
		default: { card: 'border-border-subtle bg-bg-secondary', icon: 'text-text-muted bg-bg-primary', label: 'text-text-muted', value: 'text-text-primary' },
		positive: { card: 'border-border-subtle bg-bg-secondary', icon: 'text-positive bg-positive-muted', label: 'text-text-muted', value: 'text-positive' },
		negative: { card: 'border-border-subtle bg-bg-secondary', icon: 'text-negative bg-negative-muted', label: 'text-text-muted', value: 'text-negative' },
		warning: { card: 'border-border-subtle bg-bg-secondary', icon: 'text-warning bg-warning/15', label: 'text-text-muted', value: 'text-warning' }
	};

	const brandClasses = {
		card: 'border-accent-brand bg-gradient-to-br from-accent-brand to-accent-brand/80',
		icon: 'text-white bg-white/20',
		label: 'text-white/80',
		value: 'text-white'
	};

	const sc = $derived(sizeClasses[size]);
	const vc = $derived(variant === 'brand' ? brandClasses : variantClasses[variant]);
</script>

<div class={cn('flex items-center rounded-md border', sc.card, vc.card, className)}>
	{#if icon}
		{@const Icon = icon}
		<div class={cn('flex shrink-0 items-center justify-center rounded-md', sc.icon, vc.icon)}>
			<Icon size={size === 'xs' ? 12 : size === 'lg' ? 20 : 16} />
		</div>
	{/if}
	<div class="flex min-w-0 flex-col gap-1">
		<span class={cn('text-xs uppercase tracking-wide', vc.label)}>{label}</span>
		<span class={cn('font-semibold', sc.value, vc.value)}>{value}</span>
	</div>
</div>
