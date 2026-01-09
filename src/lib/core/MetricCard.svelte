<script lang="ts" module>
	export type MetricCardVariant = 'default' | 'positive' | 'negative' | 'warning';
	export type MetricCardSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface MetricCardProps {
		label: string;
		value: string | number;
		icon?: import('svelte').Component;
		variant?: MetricCardVariant;
		size?: MetricCardSize;
		class?: string;
	}
</script>

<script lang="ts">
	let { label, value, icon, variant = 'default', size = 'md', class: className = '' }: MetricCardProps = $props();

	const sizeClasses: Record<MetricCardSize, { card: string; icon: string; value: string }> = {
		xs: { card: 'gap-1.5 p-2', icon: 'w-6 h-6', value: 'text-base' },
		sm: { card: 'gap-2 p-3', icon: 'w-8 h-8', value: 'text-lg' },
		md: { card: 'gap-3 p-4', icon: 'w-10 h-10', value: 'text-xl' },
		lg: { card: 'gap-4 p-6', icon: 'w-12 h-12', value: 'text-2xl' }
	};

	const variantClasses: Record<MetricCardVariant, { icon: string; value: string }> = {
		default: { icon: 'text-text-muted bg-bg-primary', value: 'text-text-primary' },
		positive: { icon: 'text-positive bg-positive-muted', value: 'text-positive' },
		negative: { icon: 'text-negative bg-negative-muted', value: 'text-negative' },
		warning: { icon: 'text-warning bg-warning/15', value: 'text-warning' }
	};

	const sc = $derived(sizeClasses[size]);
	const vc = $derived(variantClasses[variant]);
</script>

<div class="flex items-center rounded-md border border-border-subtle bg-bg-secondary {sc.card} {className}">
	{#if icon}
		{@const Icon = icon}
		<div class="flex shrink-0 items-center justify-center rounded-md {sc.icon} {vc.icon}">
			<Icon size={size === 'xs' ? 12 : size === 'lg' ? 20 : 16} />
		</div>
	{/if}
	<div class="flex min-w-0 flex-col gap-1">
		<span class="text-xs uppercase tracking-wide text-text-muted">{label}</span>
		<span class="font-semibold {sc.value} {vc.value}">{value}</span>
	</div>
</div>
