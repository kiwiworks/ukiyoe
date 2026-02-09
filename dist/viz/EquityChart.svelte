<script lang="ts" module>
	export interface EquityPoint {
		/** Date string (ISO) or Date object */
		date?: string | Date;
		/** Unix timestamp (seconds or milliseconds) */
		timestamp?: number;
		/** Equity/portfolio value at this point */
		value: number;
	}

	export interface TradeMarker {
		/** Trade entry time */
		date?: string | Date;
		timestamp?: number;
		/** Trade type */
		side: 'buy' | 'sell' | 'long' | 'short';
		/** Profit/loss amount (optional, for coloring) */
		pnl?: number;
		/** Label to show on hover */
		label?: string;
	}

	export interface EquityChartProps {
		/** Equity curve data points */
		equityCurve: EquityPoint[];
		/** Optional trade markers to display */
		trades?: TradeMarker[];
		/** Chart width in pixels, or 'auto' for responsive */
		width?: number | 'auto';
		/** Chart height in pixels */
		height?: number;
		/** Show drawdown subplot below main chart */
		showDrawdown?: boolean;
		/** Show area fill under the equity line */
		showFill?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		equityCurve,
		trades = [],
		width = 'auto',
		height = 200,
		showDrawdown = false,
		showFill = true,
		class: className = ''
	}: EquityChartProps = $props();

	// Container for auto-sizing
	let containerEl = $state<HTMLDivElement | null>(null);
	let measuredWidth = $state(400);

	// ResizeObserver for responsive width
	$effect(() => {
		if (!containerEl || width !== 'auto') return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				measuredWidth = entry.contentRect.width;
			}
		});
		observer.observe(containerEl);
		return () => observer.disconnect();
	});

	// Layout calculations
	const effectiveWidth = $derived(width === 'auto' ? measuredWidth : width);
	const padding = { top: 16, right: 48, bottom: 24, left: 12 };
	const drawdownHeight = 40;
	const mainChartHeight = $derived(
		showDrawdown ? height - padding.top - padding.bottom - drawdownHeight - 8 : height - padding.top - padding.bottom
	);
	const chartWidth = $derived(effectiveWidth - padding.left - padding.right);

	// Normalize timestamp to milliseconds
	function toMs(point: EquityPoint): number {
		if (point.date) {
			const d = point.date instanceof Date ? point.date : new Date(point.date);
			return d.getTime();
		}
		if (point.timestamp !== undefined) {
			// If timestamp is in seconds (< 1e12), convert to ms
			return point.timestamp < 1e12 ? point.timestamp * 1000 : point.timestamp;
		}
		return 0;
	}

	// Normalize trade timestamp
	function tradeToMs(trade: TradeMarker): number {
		if (trade.date) {
			const d = trade.date instanceof Date ? trade.date : new Date(trade.date);
			return d.getTime();
		}
		if (trade.timestamp !== undefined) {
			return trade.timestamp < 1e12 ? trade.timestamp * 1000 : trade.timestamp;
		}
		return 0;
	}

	// Normalized data
	const normalizedData = $derived(
		equityCurve.map((p) => ({
			time: toMs(p),
			value: p.value
		}))
	);

	// Compute min/max for scales
	const timeExtent = $derived({
		min: normalizedData.length > 0 ? Math.min(...normalizedData.map((d) => d.time)) : 0,
		max: normalizedData.length > 0 ? Math.max(...normalizedData.map((d) => d.time)) : 1
	});

	const valueExtent = $derived({
		min: normalizedData.length > 0 ? Math.min(...normalizedData.map((d) => d.value)) : 0,
		max: normalizedData.length > 0 ? Math.max(...normalizedData.map((d) => d.value)) : 1
	});

	const timeRange = $derived(timeExtent.max - timeExtent.min || 1);
	const valueRange = $derived(valueExtent.max - valueExtent.min || 1);

	// Add padding to value range (5% on each side)
	const paddedValueMin = $derived(valueExtent.min - valueRange * 0.05);
	const paddedValueMax = $derived(valueExtent.max + valueRange * 0.05);
	const paddedValueRange = $derived(paddedValueMax - paddedValueMin);

	// Scale functions for main chart
	function scaleX(time: number): number {
		return padding.left + ((time - timeExtent.min) / timeRange) * chartWidth;
	}

	function scaleY(value: number): number {
		return padding.top + mainChartHeight - ((value - paddedValueMin) / paddedValueRange) * mainChartHeight;
	}

	// Compute drawdown values
	const drawdownData = $derived(() => {
		if (!showDrawdown || normalizedData.length === 0) return [];
		let peak = normalizedData[0].value;
		return normalizedData.map((d) => {
			peak = Math.max(peak, d.value);
			const drawdown = peak > 0 ? (d.value - peak) / peak : 0;
			return { time: d.time, drawdown };
		});
	});

	const maxDrawdown = $derived(() => {
		const data = drawdownData();
		if (data.length === 0) return 0;
		return Math.abs(Math.min(...data.map((d) => d.drawdown)));
	});

	// Scale for drawdown (inverted, 0 at top)
	function scaleDrawdownY(drawdown: number): number {
		const baseY = padding.top + mainChartHeight + 8;
		const dd = maxDrawdown();
		if (dd === 0) return baseY;
		return baseY + (Math.abs(drawdown) / dd) * drawdownHeight;
	}

	// Build SVG paths
	const equityPath = $derived(
		normalizedData
			.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.time).toFixed(1)} ${scaleY(d.value).toFixed(1)}`)
			.join(' ')
	);

	const equityFillPath = $derived(
		equityPath +
			` L ${(padding.left + chartWidth).toFixed(1)} ${(padding.top + mainChartHeight).toFixed(1)}` +
			` L ${padding.left.toFixed(1)} ${(padding.top + mainChartHeight).toFixed(1)} Z`
	);

	const drawdownPath = $derived(() => {
		const data = drawdownData();
		if (data.length === 0) return '';
		const baseY = padding.top + mainChartHeight + 8;
		const points = data
			.map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d.time).toFixed(1)} ${scaleDrawdownY(d.drawdown).toFixed(1)}`)
			.join(' ');
		return (
			`M ${padding.left.toFixed(1)} ${baseY.toFixed(1)} ` +
			points.replace('M', 'L') +
			` L ${(padding.left + chartWidth).toFixed(1)} ${baseY.toFixed(1)} Z`
		);
	});

	// Trend for coloring
	const trend = $derived(normalizedData.length >= 2 ? normalizedData[normalizedData.length - 1].value - normalizedData[0].value : 0);
	const strokeColor = $derived(trend >= 0 ? 'var(--color-positive)' : 'var(--color-negative)');
	const fillColor = $derived(
		trend >= 0
			? 'color-mix(in srgb, var(--color-positive) 15%, transparent)'
			: 'color-mix(in srgb, var(--color-negative) 15%, transparent)'
	);

	// Trade markers positioned on chart
	const positionedTrades = $derived(
		trades.map((trade) => {
			const time = tradeToMs(trade);
			const x = scaleX(time);
			// Find closest data point for Y position
			let closestIdx = 0;
			let minDiff = Infinity;
			for (let i = 0; i < normalizedData.length; i++) {
				const diff = Math.abs(normalizedData[i].time - time);
				if (diff < minDiff) {
					minDiff = diff;
					closestIdx = i;
				}
			}
			const y = scaleY(normalizedData[closestIdx]?.value ?? valueExtent.min);
			const isBuy = trade.side === 'buy' || trade.side === 'long';
			const isWin = trade.pnl !== undefined ? trade.pnl > 0 : true;
			return { ...trade, x, y, isBuy, isWin };
		})
	);

	// Y-axis ticks (4-5 ticks)
	const yTicks = $derived(() => {
		const tickCount = 4;
		const step = paddedValueRange / tickCount;
		const ticks: { value: number; y: number }[] = [];
		for (let i = 0; i <= tickCount; i++) {
			const value = paddedValueMin + step * i;
			ticks.push({ value, y: scaleY(value) });
		}
		return ticks;
	});

	// X-axis ticks (start, middle, end)
	const xTicks = $derived(() => {
		if (normalizedData.length === 0) return [];
		const ticks: { time: number; x: number; label: string }[] = [];
		const times = [timeExtent.min, (timeExtent.min + timeExtent.max) / 2, timeExtent.max];
		for (const time of times) {
			ticks.push({
				time,
				x: scaleX(time),
				label: formatDate(time)
			});
		}
		return ticks;
	});

	// Format helpers
	function formatDate(ms: number): string {
		const d = new Date(ms);
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function formatValue(v: number): string {
		if (Math.abs(v) >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
		if (Math.abs(v) >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
		return v.toFixed(v < 100 ? 2 : 0);
	}

	function formatPercent(v: number): string {
		return `${(v * 100).toFixed(1)}%`;
	}

	// Hover state
	let hoveredTradeIdx = $state<number | null>(null);
</script>

<div class={cn('relative', className)} bind:this={containerEl}>
	<svg
		width={effectiveWidth}
		{height}
		class="block w-full rounded-md bg-[var(--bg-secondary)]"
		viewBox="0 0 {effectiveWidth} {height}"
	>
		<!-- Grid lines -->
		{#each yTicks() as tick}
			<line
				x1={padding.left}
				y1={tick.y}
				x2={padding.left + chartWidth}
				y2={tick.y}
				stroke="var(--border-subtle)"
				stroke-width="1"
				stroke-dasharray="2,4"
			/>
		{/each}

		<!-- Drawdown area (if enabled) -->
		{#if showDrawdown}
			{@const path = drawdownPath()}
			{#if path}
				<path d={path} fill="color-mix(in srgb, var(--color-negative) 20%, transparent)" />
				<!-- Drawdown label -->
				<text
					x={padding.left + 4}
					y={padding.top + mainChartHeight + 20}
					class="text-[9px] font-mono"
					fill="var(--text-muted)"
				>
					Drawdown {formatPercent(-maxDrawdown())}
				</text>
			{/if}
		{/if}

		<!-- Equity fill -->
		{#if showFill && normalizedData.length > 1}
			<path d={equityFillPath} fill={fillColor} />
		{/if}

		<!-- Equity line -->
		{#if normalizedData.length > 1}
			<path
				d={equityPath}
				fill="none"
				stroke={strokeColor}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/if}

		<!-- Start and end points -->
		{#if normalizedData.length > 0}
			<circle
				cx={scaleX(normalizedData[0].time)}
				cy={scaleY(normalizedData[0].value)}
				r="3"
				fill="var(--text-muted)"
			/>
			<circle
				cx={scaleX(normalizedData[normalizedData.length - 1].time)}
				cy={scaleY(normalizedData[normalizedData.length - 1].value)}
				r="4"
				fill={strokeColor}
			/>
		{/if}

		<!-- Trade markers -->
		{#each positionedTrades as trade, i}
			<g
				class="cursor-pointer"
				transform="translate({trade.x}, {trade.y})"
				role="button"
				tabindex="0"
				aria-label={trade.label ?? `${trade.side} trade`}
				onmouseenter={() => (hoveredTradeIdx = i)}
				onmouseleave={() => (hoveredTradeIdx = null)}
				onfocus={() => (hoveredTradeIdx = i)}
				onblur={() => (hoveredTradeIdx = null)}
			>
				{#if trade.isBuy}
					<!-- Up triangle for buy/long -->
					<polygon
						points="0,-6 5,3 -5,3"
						fill={trade.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
						stroke="var(--bg-secondary)"
						stroke-width="1"
						class="transition-transform duration-100 {hoveredTradeIdx === i ? 'scale-125' : ''}"
						style="transform-origin: center;"
					/>
				{:else}
					<!-- Down triangle for sell/short -->
					<polygon
						points="0,6 5,-3 -5,-3"
						fill={trade.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
						stroke="var(--bg-secondary)"
						stroke-width="1"
						class="transition-transform duration-100 {hoveredTradeIdx === i ? 'scale-125' : ''}"
						style="transform-origin: center;"
					/>
				{/if}
			</g>
		{/each}

		<!-- Y-axis labels (right side) -->
		{#each yTicks() as tick}
			<text
				x={padding.left + chartWidth + 4}
				y={tick.y + 3}
				class="text-[10px] font-mono"
				fill="var(--text-muted)"
			>
				{formatValue(tick.value)}
			</text>
		{/each}

		<!-- X-axis labels -->
		{#each xTicks() as tick, i}
			<text
				x={tick.x}
				y={height - 4}
				class="text-[10px] font-mono"
				fill="var(--text-muted)"
				text-anchor={i === 0 ? 'start' : i === xTicks().length - 1 ? 'end' : 'middle'}
			>
				{tick.label}
			</text>
		{/each}
	</svg>

	<!-- Trade tooltip -->
	{#if hoveredTradeIdx !== null && positionedTrades[hoveredTradeIdx]}
		{@const trade = positionedTrades[hoveredTradeIdx]}
		<div
			class="pointer-events-none absolute z-10 rounded border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-1 text-xs font-mono shadow-lg"
			style="left: {Math.min(Math.max(trade.x - 40, 8), effectiveWidth - 100)}px; top: {Math.max(trade.y - 36, 8)}px;"
		>
			<span class={trade.isBuy ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}>
				{trade.side.toUpperCase()}
			</span>
			{#if trade.pnl !== undefined}
				<span class={trade.pnl >= 0 ? 'text-[var(--color-positive)]' : 'text-[var(--color-negative)]'}>
					{trade.pnl >= 0 ? '+' : ''}{formatValue(trade.pnl)}
				</span>
			{/if}
			{#if trade.label}
				<span class="text-[var(--text-muted)]">{trade.label}</span>
			{/if}
		</div>
	{/if}
</div>
