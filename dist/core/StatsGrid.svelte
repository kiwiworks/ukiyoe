<script lang="ts" module>
	export type StatsGridVariant = 'default' | 'positive' | 'negative' | 'warning';
	export type StatsGridSize = 'xs' | 'sm' | 'md' | 'lg';
	export type StatsGridColumns = 2 | 3 | 4;

	export interface StatItem {
		label: string;
		value: string | number;
		variant?: StatsGridVariant;
	}

	export interface StatsGridProps {
		items: StatItem[];
		columns?: StatsGridColumns;
		size?: StatsGridSize;
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let { items, columns = 3, size = 'md', class: className = '' }: StatsGridProps = $props();

	const columnClasses: Record<StatsGridColumns, string> = {
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4'
	};

	const sizeClasses: Record<StatsGridSize, string> = {
		xs: 'text-base',
		sm: 'text-lg',
		md: 'text-2xl',
		lg: 'text-3xl'
	};

	const variantClasses: Record<StatsGridVariant, string> = {
		default: 'text-text-primary',
		positive: 'text-positive',
		negative: 'text-negative',
		warning: 'text-warning'
	};
</script>

<div class={cn('grid gap-3', columnClasses[columns], className)}>
	{#each items as item}
		<div class="flex flex-col items-center text-center">
			<span class="mb-1 font-bold {sizeClasses[size]} {variantClasses[item.variant ?? 'default']}">{item.value}</span>
			<span class="text-[9px] uppercase tracking-wide text-text-muted">{item.label}</span>
		</div>
	{/each}
</div>
