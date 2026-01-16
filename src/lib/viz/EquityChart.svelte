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
	const strokeColor = $derived(trend >= 0 ? 'var(--positive)' : 'var(--negative)');
	const fillColor = $derived(
		trend >= 0
			? 'color-mix(in srgb, var(--positive) 16%, transparent)'
			: 'color-mix(in srgb, var(--negative) 16%, transparent)'
	);

	// Format timestamp for display (timestamps are already normalized to milliseconds)
	function formatTime(ts: number): string {
		const date = new Date(ts);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	// Hover state
	let hoveredTrade = $state<number | null>(null);
</script>

<div class="relative w-full {className}" bind:this={containerEl}>
	<svg width={effectiveWidth} {height} class="block w-full bg-bg-secondary rounded-md">
		<!-- Drawdown area (background) -->
		{#if showDrawdown && drawdownPath()}
			<path d={drawdownPath()} fill="color-mix(in srgb, var(--negative) 10%, transparent)" />
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
				stroke={marker.isWin ? 'var(--positive)' : 'var(--negative)'}
				stroke-width="1"
				stroke-dasharray="2,2"
				opacity={hoveredTrade === i ? 1 : 0.4}
			/>

			<!-- Entry marker -->
			<g
				class="cursor-pointer transition-transform duration-100 ease-out hover:scale-[1.3]"
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
						fill="var(--positive)"
						stroke="var(--bg-primary)"
						stroke-width="1"
					/>
				{:else}
					<!-- Down arrow for SELL -->
					<polygon
						points="0,5 4,-2 -4,-2"
						fill="var(--negative)"
						stroke="var(--bg-primary)"
						stroke-width="1"
					/>
				{/if}
			</g>

			<!-- Exit marker -->
			<g
				class="cursor-pointer transition-transform duration-100 ease-out hover:scale-[1.3]"
				transform="translate({marker.exitX}, {marker.exitY})"
				role="img"
				aria-label={`${marker.side} trade exit`}
				onmouseenter={() => (hoveredTrade = i)}
				onmouseleave={() => (hoveredTrade = null)}
			>
				<circle
					r="3"
					fill={marker.isWin ? 'var(--positive)' : 'var(--negative)'}
					stroke="var(--bg-primary)"
					stroke-width="1"
				/>
			</g>
		{/each}

		<!-- X-axis labels -->
		{#if equityCurve.length > 0}
			<text
				x={padding.left}
				y={height - 4}
				class="text-[9px] font-mono fill-text-muted"
			>
				{formatTime(minTime)}
			</text>
			<text
				x={effectiveWidth - padding.right}
				y={height - 4}
				class="text-[9px] font-mono fill-text-muted"
				text-anchor="end"
			>
				{formatTime(maxTime)}
			</text>
		{/if}
	</svg>

	<!-- Tooltip for hovered trade -->
	{#if hoveredTrade !== null}
		{@const trade = tradeMarkers()[hoveredTrade]}
		<div
			class="absolute bg-bg-primary border border-border-default rounded-md px-2 py-1.5 text-[10px] font-mono pointer-events-none z-10 shadow-[0_2px_8px_color-mix(in_srgb,var(--bg-primary)_70%,transparent)]"
			style="left: {Math.min(trade.exitX, effectiveWidth - 120)}px; top: {trade.exitY - 40}px;"
		>
			<div class="flex gap-2 items-center">
				<span class="font-semibold {trade.side === 'BUY' ? 'text-positive' : 'text-negative'}">
					{trade.side}
				</span>
				<span class="font-semibold">
					<Numeric value={trade.pnlPct} format="percent" colorBySign={true} />
				</span>
			</div>
		</div>
	{/if}

	<!-- Legend -->
	<div class="flex gap-4 justify-center mt-2 text-[9px] text-text-muted">
		<div class="flex items-center gap-1">
			<svg width="12" height="12" class="shrink-0">
				<polygon points="6,2 10,9 2,9" fill="var(--positive)" />
			</svg>
			<span>Buy Entry</span>
		</div>
		<div class="flex items-center gap-1">
			<svg width="12" height="12" class="shrink-0">
				<polygon points="6,10 10,3 2,3" fill="var(--negative)" />
			</svg>
			<span>Sell Entry</span>
		</div>
		<div class="flex items-center gap-1">
			<svg width="12" height="12" class="shrink-0">
				<circle cx="6" cy="6" r="3" fill="var(--text-muted)" />
			</svg>
			<span>Exit</span>
		</div>
	</div>
</div>
