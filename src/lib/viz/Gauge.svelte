<script lang="ts">
	interface Props {
		value: number;
		min?: number;
		max?: number;
		label?: string;
		showValue?: boolean;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'arc' | 'bar' | 'circle';
		colorStops?: { value: number; color: string }[];
	}

	let {
		value,
		min = 0,
		max = 100,
		label,
		showValue = true,
		size = 'md',
		variant = 'arc',
		colorStops = [
			{ value: 0, color: 'var(--color-negative)' },
			{ value: 50, color: 'var(--color-warning)' },
			{ value: 100, color: 'var(--color-positive)' }
		]
	}: Props = $props();

	const clampedValue = $derived(Math.min(max, Math.max(min, value)));
	const percentage = $derived(((clampedValue - min) / (max - min)) * 100);

	const getColor = (pct: number) => {
		for (let i = colorStops.length - 1; i >= 0; i--) {
			if (pct >= colorStops[i].value) {
				return colorStops[i].color;
			}
		}
		return colorStops[0].color;
	};

	const currentColor = $derived(getColor(percentage));

	const sizes = {
		sm: { diameter: 40, stroke: 4, fontSize: 10 },
		md: { diameter: 60, stroke: 5, fontSize: 12 },
		lg: { diameter: 80, stroke: 6, fontSize: 14 }
	};

	const sizeConfig = $derived(sizes[size]);
	const radius = $derived((sizeConfig.diameter - sizeConfig.stroke) / 2);
	const circumference = $derived(2 * Math.PI * radius);

	// Arc gauge calculations (180 degree arc)
	const arcStartAngle = 135;
	const arcEndAngle = 405;
	const arcLength = $derived(circumference * 0.75); // 270 degrees
	const arcOffset = $derived(arcLength * (1 - percentage / 100));
</script>

{#if variant === 'arc'}
	<div class="flex flex-col items-center">
		<svg
			width={sizeConfig.diameter}
			height={sizeConfig.diameter * 0.65}
			viewBox="0 0 {sizeConfig.diameter} {sizeConfig.diameter * 0.7}"
		>
			<!-- Background arc -->
			<circle
				cx={sizeConfig.diameter / 2}
				cy={sizeConfig.diameter / 2}
				r={radius}
				fill="none"
				stroke="var(--chart-grid)"
				stroke-width={sizeConfig.stroke}
				stroke-dasharray={arcLength}
				stroke-dashoffset={0}
				stroke-linecap="round"
				transform="rotate({arcStartAngle} {sizeConfig.diameter / 2} {sizeConfig.diameter / 2})"
			/>
			<!-- Value arc -->
			<circle
				cx={sizeConfig.diameter / 2}
				cy={sizeConfig.diameter / 2}
				r={radius}
				fill="none"
				stroke={currentColor}
				stroke-width={sizeConfig.stroke}
				stroke-dasharray={arcLength}
				stroke-dashoffset={arcOffset}
				stroke-linecap="round"
				transform="rotate({arcStartAngle} {sizeConfig.diameter / 2} {sizeConfig.diameter / 2})"
				class="transition-all duration-300"
			/>
		</svg>
		{#if showValue}
			<span class="text-primary font-bold font-mono -mt-sm" style="font-size: {sizeConfig.fontSize}px">
				{clampedValue.toFixed(0)}
			</span>
		{/if}
		{#if label}
			<span class="text-muted text-xs uppercase tracking-wider mt-xs">{label}</span>
		{/if}
	</div>
{:else if variant === 'circle'}
	<div class="flex flex-col items-center">
		<svg width={sizeConfig.diameter} height={sizeConfig.diameter}>
			<!-- Background circle -->
			<circle
				cx={sizeConfig.diameter / 2}
				cy={sizeConfig.diameter / 2}
				r={radius}
				fill="none"
				stroke="var(--chart-grid)"
				stroke-width={sizeConfig.stroke}
			/>
			<!-- Value circle -->
			<circle
				cx={sizeConfig.diameter / 2}
				cy={sizeConfig.diameter / 2}
				r={radius}
				fill="none"
				stroke={currentColor}
				stroke-width={sizeConfig.stroke}
				stroke-dasharray={circumference}
				stroke-dashoffset={circumference * (1 - percentage / 100)}
				stroke-linecap="round"
				transform="rotate(-90 {sizeConfig.diameter / 2} {sizeConfig.diameter / 2})"
				class="transition-all duration-300"
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
					font-size={sizeConfig.fontSize}
				>
					{clampedValue.toFixed(0)}
				</text>
			{/if}
		</svg>
		{#if label}
			<span class="text-muted text-xs uppercase tracking-wider mt-xs">{label}</span>
		{/if}
	</div>
{:else}
	<!-- Bar variant -->
	<div class="flex flex-col gap-xs">
		{#if label}
			<div class="flex justify-between items-center">
				<span class="text-muted text-xs uppercase tracking-wider">{label}</span>
				{#if showValue}
					<span class="text-primary font-bold font-mono text-xs">{clampedValue.toFixed(0)}</span>
				{/if}
			</div>
		{/if}
		<div class="h-1.5 bg-chart-grid rounded-full overflow-hidden">
			<div
				class="h-full rounded-full transition-all duration-300"
				style="width: {percentage}%; background-color: {currentColor}"
			></div>
		</div>
	</div>
{/if}
