<script lang="ts">
	import Numeric from '../core/Numeric.svelte';

	interface EquityPoint {
		timestamp: number;
		equity: number;
		drawdownPct: number;
	}

	interface Trade {
		entryTime: number;
		exitTime: number;
		side: string;
		pnl: number;
		pnlPct: number;
	}

	interface Props {
		equityCurve: EquityPoint[];
		trades?: Trade[];
		width?: number | 'auto';
		height?: number;
		showDrawdown?: boolean;
		/** Ratio of chart height used for drawdown overlay (0-1) */
		drawdownHeightRatio?: number;
		class?: string;
	}

	// Threshold to distinguish seconds from milliseconds timestamps
	const TIMESTAMP_THRESHOLD = 1e12;

	let {
		equityCurve,
		trades = [],
		width = 'auto',
		height = 160,
		showDrawdown = true,
		drawdownHeightRatio = 0.3,
		class: className = ''
	}: Props = $props();

	/** Normalize timestamp to milliseconds */
	function normalizeTimestamp(ts: number): number {
		return ts < TIMESTAMP_THRESHOLD ? ts * 1000 : ts;
	}

	/** Normalize trade side to uppercase BUY/SELL */
	function normalizeSide(side: string): 'BUY' | 'SELL' {
		const s = side.toUpperCase();
		if (s === 'BUY' || s === 'LONG') return 'BUY';
		return 'SELL';
	}

	// Container reference for auto-sizing
	let containerEl = $state<HTMLDivElement | null>(null);
	let measuredWidth = $state(400);

	// Use ResizeObserver to measure container width
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

	// Effective width to use for calculations
	const effectiveWidth = $derived(width === 'auto' ? measuredWidth : width);

	const padding = { top: 8, right: 8, bottom: 20, left: 8 };
	const chartWidth = $derived(effectiveWidth - padding.left - padding.right);
	const chartHeight = $derived(height - padding.top - padding.bottom);

	// Equity curve calculations with normalized timestamps
	const equityValues = $derived(equityCurve.map((e) => e.equity));
	const timestamps = $derived(equityCurve.map((e) => normalizeTimestamp(e.timestamp)));

	const minEquity = $derived(equityValues.length > 0 ? Math.min(...equityValues) : 0);
	const maxEquity = $derived(equityValues.length > 0 ? Math.max(...equityValues) : 0);
	const equityRange = $derived(maxEquity - minEquity || 1);

	const minTime = $derived(timestamps.length > 0 ? Math.min(...timestamps) : 0);
	const maxTime = $derived(timestamps.length > 0 ? Math.max(...timestamps) : 0);
	const timeRange = $derived(maxTime - minTime || 1);

	// Scale functions
	function scaleX(timestamp: number): number {
		return padding.left + ((timestamp - minTime) / timeRange) * chartWidth;
	}

	function scaleY(equity: number): number {
		return padding.top + chartHeight - ((equity - minEquity) / equityRange) * chartHeight;
	}

	// Equity line path
	const equityPath = $derived(
		equityCurve
			.map((e, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(normalizeTimestamp(e.timestamp)).toFixed(1)} ${scaleY(e.equity).toFixed(1)}`)
			.join(' ')
	);

	// Fill path for equity area
	const equityFillPath = $derived(
		equityPath +
			` L ${(padding.left + chartWidth).toFixed(1)} ${(padding.top + chartHeight).toFixed(1)}` +
			` L ${padding.left.toFixed(1)} ${(padding.top + chartHeight).toFixed(1)} Z`
	);

	// Drawdown area path (inverted from top)
	const drawdownPath = $derived(() => {
		if (!showDrawdown || equityCurve.length === 0) return '';
		const drawdownValues = equityCurve.map((e) => e.drawdownPct);
		const maxDrawdown = Math.max(...drawdownValues);
		if (maxDrawdown === 0) return '';

		const drawdownHeight = chartHeight * drawdownHeightRatio;
		const points = equityCurve.map((e) => {
			const x = scaleX(normalizeTimestamp(e.timestamp));
			const y = padding.top + (e.drawdownPct / maxDrawdown) * drawdownHeight;
			return `${x.toFixed(1)} ${y.toFixed(1)}`;
		});

		return `M ${padding.left.toFixed(1)} ${padding.top.toFixed(1)} L ${points.join(' L ')} L ${(padding.left + chartWidth).toFixed(1)} ${padding.top.toFixed(1)} Z`;
	});

	// Trade markers - find closest equity point for each trade
	const tradeMarkers = $derived(() => {
		return trades.map((trade) => {
			const entryTime = normalizeTimestamp(trade.entryTime);
			const exitTime = normalizeTimestamp(trade.exitTime);

			// Find entry point
			const entryIdx = findClosestIndex(entryTime);
			const exitIdx = findClosestIndex(exitTime);

			const entryEquity = equityCurve[entryIdx]?.equity ?? equityValues[0] ?? 0;
			const exitEquity = equityCurve[exitIdx]?.equity ?? equityValues[equityValues.length - 1] ?? 0;

			return {
				...trade,
				side: normalizeSide(trade.side),
				entryX: scaleX(entryTime),
				entryY: scaleY(entryEquity),
				exitX: scaleX(exitTime),
				exitY: scaleY(exitEquity),
				isWin: trade.pnl > 0
			};
		});
	});

	function findClosestIndex(timestamp: number): number {
		if (timestamps.length === 0) return 0;
		let closest = 0;
		let minDiff = Math.abs(timestamps[0] - timestamp);
		for (let i = 1; i < timestamps.length; i++) {
			const diff = Math.abs(timestamps[i] - timestamp);
			if (diff < minDiff) {
				minDiff = diff;
				closest = i;
			}
		}
		return closest;
	}

	// Trend for coloring
	const trend = $derived(equityValues.length >= 2 ? equityValues[equityValues.length - 1] - equityValues[0] : 0);
	const strokeColor = $derived(trend >= 0 ? 'var(--color-positive)' : 'var(--color-negative)');
	const fillColor = $derived(
		trend >= 0
			? 'color-mix(in srgb, var(--color-positive) 16%, transparent)'
			: 'color-mix(in srgb, var(--color-negative) 16%, transparent)'
	);

	// Format timestamp for display (timestamps are already normalized to milliseconds)
	function formatTime(ts: number): string {
		const date = new Date(ts);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	// Hover state
	let hoveredTrade = $state<number | null>(null);
</script>

<div class="equity-chart-container {className}" bind:this={containerEl}>
	<svg width={effectiveWidth} {height} class="equity-chart">
		<!-- Drawdown area (background) -->
		{#if showDrawdown && drawdownPath()}
			<path d={drawdownPath()} fill="color-mix(in srgb, var(--color-negative) 10%, transparent)" />
		{/if}

		<!-- Equity fill -->
		{#if equityCurve.length > 1}
			<path d={equityFillPath} fill={fillColor} />
		{/if}

		<!-- Equity line -->
		{#if equityCurve.length > 1}
			<path
				d={equityPath}
				fill="none"
				stroke={strokeColor}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/if}

		<!-- Trade markers -->
		{#each tradeMarkers() as marker, i}
			<!-- Trade span line (entry to exit) -->
			<line
				x1={marker.entryX}
				y1={marker.entryY}
				x2={marker.exitX}
				y2={marker.exitY}
				stroke={marker.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
				stroke-width="1"
				stroke-dasharray="2,2"
				opacity={hoveredTrade === i ? 1 : 0.4}
			/>

			<!-- Entry marker -->
			<g
				class="trade-marker entry"
				transform="translate({marker.entryX}, {marker.entryY})"
				role="img"
				aria-label={`${marker.side} trade entry`}
				onmouseenter={() => (hoveredTrade = i)}
				onmouseleave={() => (hoveredTrade = null)}
			>
				{#if marker.side === 'BUY'}
					<!-- Up arrow for BUY -->
					<polygon
						points="0,-5 4,2 -4,2"
						fill="var(--color-positive)"
						stroke="var(--bg-primary)"
						stroke-width="1"
					/>
				{:else}
					<!-- Down arrow for SELL -->
					<polygon
						points="0,5 4,-2 -4,-2"
						fill="var(--color-negative)"
						stroke="var(--bg-primary)"
						stroke-width="1"
					/>
				{/if}
			</g>

			<!-- Exit marker -->
			<g
				class="trade-marker exit"
				transform="translate({marker.exitX}, {marker.exitY})"
				role="img"
				aria-label={`${marker.side} trade exit`}
				onmouseenter={() => (hoveredTrade = i)}
				onmouseleave={() => (hoveredTrade = null)}
			>
				<circle
					r="3"
					fill={marker.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
					stroke="var(--bg-primary)"
					stroke-width="1"
				/>
			</g>
		{/each}

		<!-- X-axis labels -->
		{#if equityCurve.length > 0}
			<text x={padding.left} y={height - 4} class="axis-label">
				{formatTime(minTime)}
			</text>
			<text x={effectiveWidth - padding.right} y={height - 4} class="axis-label" text-anchor="end">
				{formatTime(maxTime)}
			</text>
		{/if}
	</svg>

	<!-- Tooltip for hovered trade -->
	{#if hoveredTrade !== null}
		{@const trade = tradeMarkers()[hoveredTrade]}
		<div
			class="trade-tooltip"
			style="left: {Math.min(trade.exitX, effectiveWidth - 120)}px; top: {trade.exitY - 40}px;"
		>
			<div class="tooltip-row">
				<span class="side" class:buy={trade.side === 'BUY'} class:sell={trade.side === 'SELL'}>
					{trade.side}
				</span>
				<span class="pnl-value">
					<Numeric value={trade.pnlPct} format="percent" colorBySign={true} />
				</span>
			</div>
		</div>
	{/if}

	<!-- Legend -->
	<div class="chart-legend">
		<div class="legend-item">
			<svg width="12" height="12">
				<polygon points="6,2 10,9 2,9" fill="var(--color-positive)" />
			</svg>
			<span>Buy Entry</span>
		</div>
		<div class="legend-item">
			<svg width="12" height="12">
				<polygon points="6,10 10,3 2,3" fill="var(--color-negative)" />
			</svg>
			<span>Sell Entry</span>
		</div>
		<div class="legend-item">
			<svg width="12" height="12">
				<circle cx="6" cy="6" r="3" fill="var(--text-muted)" />
			</svg>
			<span>Exit</span>
		</div>
	</div>
</div>

<style>
	.equity-chart-container {
		position: relative;
		width: 100%;
	}

	.equity-chart {
		display: block;
		width: 100%;
		background: var(--bg-secondary);
		border-radius: 4px;
	}

	.axis-label {
		font-size: 9px;
		font-family: var(--font-mono);
		fill: var(--text-muted);
	}

	.trade-marker {
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.trade-marker:hover {
		transform: scale(1.3);
	}

	.trade-tooltip {
		position: absolute;
		background: var(--bg-primary);
		border: 1px solid var(--border-default);
		border-radius: 4px;
		padding: 0.375rem 0.5rem;
		font-size: 10px;
		font-family: var(--font-mono);
		pointer-events: none;
		z-index: 10;
		box-shadow: 0 2px 8px color-mix(in srgb, var(--bg-primary) 70%, transparent);
	}

	.tooltip-row {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.tooltip-row .side {
		font-weight: 600;
	}

	.tooltip-row .side.buy {
		color: var(--color-positive);
	}

	.tooltip-row .side.sell {
		color: var(--color-negative);
	}

	.tooltip-row .pnl-value {
		font-weight: 600;
	}

	.chart-legend {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 0.5rem;
		font-size: 9px;
		color: var(--text-muted);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.legend-item svg {
		flex-shrink: 0;
	}
</style>
