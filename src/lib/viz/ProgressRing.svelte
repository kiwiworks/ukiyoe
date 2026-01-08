<script lang="ts">
	interface Props {
		value: number;
		size?: number;
		color?: string;
		label?: string;
		showValue?: boolean;
		strokeWidth?: number;
		class?: string;
	}

	let {
		value,
		size = 60,
		color = 'var(--color-info)',
		label,
		showValue = true,
		strokeWidth = 4,
		class: className = ''
	}: Props = $props();

	const clampedValue = $derived(Math.max(0, Math.min(100, value)));
	const radius = $derived((size - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const offset = $derived(circumference * (1 - clampedValue / 100));
	const center = $derived(size / 2);
</script>

<div class="flex flex-col items-center gap-1 {className}">
	<svg width={size} height={size} class="transform -rotate-90">
		<!-- Background circle -->
		<circle
			cx={center}
			cy={center}
			r={radius}
			fill="none"
			stroke="var(--chart-grid)"
			stroke-width={strokeWidth}
		/>
		<!-- Progress circle -->
		<circle
			cx={center}
			cy={center}
			r={radius}
			fill="none"
			stroke={color}
			stroke-width={strokeWidth}
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			stroke-linecap="round"
			class="transition-all duration-500 ease-out"
		/>
		{#if showValue}
			<text
				x="50%"
				y="50%"
				text-anchor="middle"
				dominant-baseline="central"
				fill="var(--text-primary)"
				font-family="monospace"
				font-weight="bold"
				font-size={size / 5}
				class="transform rotate-90"
				style="transform-origin: center"
			>
				{clampedValue.toFixed(0)}%
			</text>
		{/if}
	</svg>
	{#if label}
		<span class="text-text-muted text-[9px] uppercase tracking-wider">{label}</span>
	{/if}
</div>
