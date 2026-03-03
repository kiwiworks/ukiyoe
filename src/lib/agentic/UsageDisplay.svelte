<script lang="ts" module>
	export type UsageDisplaySize = 'xs' | 'sm' | 'md';

	export interface UsageDisplayProps {
		/** Stat items to display */
		items: import('../core/StatsGrid.svelte').StatItem[];
		/** Size preset */
		size?: UsageDisplaySize;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import type { StatsGridVariant } from '../core/StatsGrid.svelte';
	import type { TextVariant } from '../core/Text.svelte';
	import Text from '../core/Text.svelte';
	import Divider from '../core/Divider.svelte';
	import { cn } from '../utils/cn';

	let { items, size = 'sm', class: className = '' }: UsageDisplayProps = $props();

	const sizeMap: Record<UsageDisplaySize, 'xs' | 'sm'> = {
		xs: 'xs',
		sm: 'xs',
		md: 'sm'
	};

	const containerSizeClasses: Record<UsageDisplaySize, string> = {
		xs: 'gap-2 px-1.5 py-0.5',
		sm: 'gap-3 px-2 py-1',
		md: 'gap-4 px-3 py-1.5'
	};

	const variantMap: Record<StatsGridVariant, TextVariant> = {
		default: 'secondary',
		positive: 'positive',
		negative: 'negative',
		warning: 'warning'
	};
</script>

<div
	class={cn(
		'inline-flex items-center font-mono tabular-nums',
		containerSizeClasses[size],
		className
	)}
>
	{#each items as item, i}
		{#if i > 0}
			<Divider vertical spacing="none" class="h-3" />
		{/if}
		<span class="inline-flex items-center gap-1 whitespace-nowrap">
			<Text size={sizeMap[size]} variant="muted" as="span">{item.label}</Text>
			<Text size={sizeMap[size]} variant={variantMap[item.variant ?? 'default']} as="span">{item.value}</Text>
		</span>
	{/each}
</div>
