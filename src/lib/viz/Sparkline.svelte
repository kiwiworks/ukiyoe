<script lang="ts" module>
	export type SparklineColor = 'positive' | 'negative' | 'neutral' | 'auto';

	export interface SparklineProps {
		/** Array of numeric data points */
		data: number[];
		/** Width in pixels */
		width?: number;
		/** Height in pixels */
		height?: number;
		/** Line color mode */
		color?: SparklineColor;
		/** Show filled area under line */
		fill?: boolean;
		/** Show data point dots */
		showDots?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		data,
		width = 80,
		height = 24,
		color = 'auto',
		fill = false,
		showDots = false,
		class: className = ''
	}: SparklineProps = $props();

	const padding = 2;
	const effectiveWidth = $derived(width - padding * 2);
	const effectiveHeight = $derived(height - padding * 2);

	const min = $derived(Math.min(...data));
	const max = $derived(Math.max(...data));
	const range = $derived(max - min || 1);

	const points = $derived(
		data.map((v, i) => ({
			x: padding + (i / (data.length - 1)) * effectiveWidth,
			y: padding + effectiveHeight - ((v - min) / range) * effectiveHeight
		}))
	);

	const pathD = $derived(
		points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
	);

	const fillPathD = $derived(
		pathD +
			` L ${(padding + effectiveWidth).toFixed(1)} ${(padding + effectiveHeight).toFixed(1)}` +
			` L ${padding.toFixed(1)} ${(padding + effectiveHeight).toFixed(1)} Z`
	);

	const trend = $derived(data.length >= 2 ? data[data.length - 1] - data[0] : 0);

	const strokeColor = $derived(
		color === 'auto'
			? trend >= 0
				? 'var(--color-positive)'
				: 'var(--color-negative)'
			: color === 'positive'
				? 'var(--color-positive)'
				: color === 'negative'
					? 'var(--color-negative)'
					: 'var(--text-muted)'
	);

	const fillColor = $derived(
		color === 'auto'
			? trend >= 0
				? 'color-mix(in srgb, var(--color-positive) 18%, transparent)'
				: 'color-mix(in srgb, var(--color-negative) 18%, transparent)'
			: color === 'positive'
				? 'color-mix(in srgb, var(--color-positive) 18%, transparent)'
				: color === 'negative'
					? 'color-mix(in srgb, var(--color-negative) 18%, transparent)'
					: 'color-mix(in srgb, var(--text-muted) 18%, transparent)'
	);
</script>

<svg {width} {height} class={cn('block', className)} viewBox="0 0 {width} {height}">
	{#if fill && data.length > 1}
		<path d={fillPathD} fill={fillColor} />
	{/if}
	{#if data.length > 1}
		<path d={pathD} fill="none" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	{/if}
	{#if showDots}
		{#each points as point, i}
			<circle
				cx={point.x}
				cy={point.y}
				r={i === points.length - 1 ? 2.5 : 1.5}
				fill={i === points.length - 1 ? strokeColor : 'var(--text-muted)'}
			/>
		{/each}
	{/if}
</svg>
