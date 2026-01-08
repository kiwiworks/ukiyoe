<script lang="ts">
	import Numeric from '../core/Numeric.svelte';

	interface Trade {
		entryTime: number;
		exitTime: number;
		side: string;
		entryPrice: number;
		exitPrice: number;
		pnl: number;
		pnlPct: number;
	}

	interface EquityPoint {
		timestamp: number;
		equity: number;
	}

	interface Props {
		trades: Trade[];
		equityCurve?: EquityPoint[];
		height?: number;
		class?: string;
	}

	let { trades, equityCurve = [], height = 280, class: className = '' }: Props = $props();

	// Container reference for auto-sizing
	let containerEl = $state<HTMLDivElement | null>(null);
	let measuredWidth = $state(600);

	// Use ResizeObserver to measure container width
	$effect(() => {
		if (!containerEl) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				measuredWidth = entry.contentRect.width;
			}
		});

		observer.observe(containerEl);
		return () => observer.disconnect();
	});

	const padding = { top: 16, right: 60, bottom: 40, left: 16 };
	const chartWidth = $derived(measuredWidth - padding.left - padding.right);
	const chartHeight = $derived(height - padding.top - padding.bottom);

	// Build price points from trades (entry and exit points)
	const pricePoints = $derived(() => {
		if (trades.length === 0) return [];

		const points: { time: number; price: number; type: 'entry' | 'exit'; tradeIdx: number }[] = [];

		trades.forEach((trade, idx) => {
			points.push({ time: trade.entryTime, price: trade.entryPrice, type: 'entry', tradeIdx: idx });
			points.push({ time: trade.exitTime, price: trade.exitPrice, type: 'exit', tradeIdx: idx });
		});

		// Sort by time
		points.sort((a, b) => a.time - b.time);
		return points;
	});

	// Time range
	const timeExtent = $derived(() => {
		const points = pricePoints();
		if (points.length === 0) return { min: 0, max: 1 };
		return {
			min: Math.min(...points.map((p) => p.time)),
			max: Math.max(...points.map((p) => p.time))
		};
	});

	// Price range with padding
	const priceExtent = $derived(() => {
		const points = pricePoints();
		if (points.length === 0) return { min: 0, max: 1 };
		const prices = points.map((p) => p.price);
		const min = Math.min(...prices);
		const max = Math.max(...prices);
		const range = max - min || max * 0.01;
		return {
			min: min - range * 0.1,
			max: max + range * 0.1
		};
	});

	// Scale functions
	const scaleX = $derived((time: number) => {
		const { min, max } = timeExtent();
		const range = max - min || 1;
		return padding.left + ((time - min) / range) * chartWidth;
	});

	const scaleY = $derived((price: number) => {
		const { min, max } = priceExtent();
		const range = max - min || 1;
		return padding.top + chartHeight - ((price - min) / range) * chartHeight;
	});

	// Generate price line path (connecting all points)
	const pricePath = $derived(() => {
		const points = pricePoints();
		if (points.length < 2) return '';

		return points
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.time).toFixed(1)} ${scaleY(p.price).toFixed(1)}`)
			.join(' ');
	});

	// Generate trade markers with positions
	const tradeMarkers = $derived(() => {
		return trades.map((trade, idx) => ({
			...trade,
			entryX: scaleX(trade.entryTime),
			entryY: scaleY(trade.entryPrice),
			exitX: scaleX(trade.exitTime),
			exitY: scaleY(trade.exitPrice),
			isWin: trade.pnl > 0,
			idx
		}));
	});

	// Y-axis price ticks
	const yTicks = $derived(() => {
		const { min, max } = priceExtent();
		const range = max - min;
		const tickCount = 5;
		const ticks: number[] = [];

		for (let i = 0; i <= tickCount; i++) {
			ticks.push(min + (range * i) / tickCount);
		}
		return ticks;
	});

	// X-axis time ticks
	const xTicks = $derived(() => {
		const { min, max } = timeExtent();
		const range = max - min;
		const tickCount = Math.min(6, Math.floor(chartWidth / 100));
		const ticks: number[] = [];

		for (let i = 0; i <= tickCount; i++) {
			ticks.push(min + (range * i) / tickCount);
		}
		return ticks;
	});

	// Hover state
	let hoveredTrade = $state<number | null>(null);

	// Format helpers
	function formatPrice(price: number | null | undefined): string {
		const val = Number(price) || 0;
		if (val >= 1000) return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
		if (val >= 1) return val.toFixed(4);
		return val.toPrecision(4);
	}

	function formatTime(ts: number): string {
		const date = new Date(ts * 1000);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

<div class="backtest-chart-container {className}" bind:this={containerEl}>
	{#if trades.length === 0}
		<div class="empty-state">
			<span>No trades to display</span>
		</div>
	{:else}
		<svg width={measuredWidth} {height} class="backtest-chart">
			<!-- Grid lines -->
			<g class="grid">
				{#each yTicks() as tick}
					<line
						x1={padding.left}
						y1={scaleY(tick)}
						x2={padding.left + chartWidth}
						y2={scaleY(tick)}
						stroke="var(--border-subtle)"
						stroke-dasharray="2,4"
					/>
				{/each}
				{#each xTicks() as tick}
					<line
						x1={scaleX(tick)}
						y1={padding.top}
						x2={scaleX(tick)}
						y2={padding.top + chartHeight}
						stroke="var(--border-subtle)"
						stroke-dasharray="2,4"
					/>
				{/each}
			</g>

			<!-- Price line -->
			{#if pricePath()}
				<path d={pricePath()} fill="none" stroke="var(--text-muted)" stroke-width="1" opacity="0.5" />
			{/if}

			<!-- Trade spans (entry to exit lines) -->
			{#each tradeMarkers() as marker}
				<g class="trade-span" opacity={hoveredTrade === marker.idx ? 1 : 0.6}>
					<!-- Vertical entry line -->
					<line
						x1={marker.entryX}
						y1={padding.top}
						x2={marker.entryX}
						y2={padding.top + chartHeight}
						stroke={marker.side === 'BUY' ? 'var(--color-positive)' : 'var(--color-negative)'}
						stroke-width="1"
						stroke-dasharray="4,4"
						opacity="0.3"
					/>

					<!-- Trade connection line -->
					<line
						x1={marker.entryX}
						y1={marker.entryY}
						x2={marker.exitX}
						y2={marker.exitY}
						stroke={marker.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
						stroke-width={hoveredTrade === marker.idx ? 2 : 1.5}
					/>

					<!-- Profit/loss area fill -->
					<polygon
						points="{marker.entryX},{marker.entryY} {marker.exitX},{marker.exitY} {marker.exitX},{marker.entryY}"
						fill={marker.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
						opacity="0.1"
					/>
				</g>
			{/each}

			<!-- Trade markers -->
			{#each tradeMarkers() as marker}
				<g
					class="trade-marker-group"
					role="img"
					aria-label={`${marker.side} trade ${marker.isWin ? 'win' : 'loss'}`}
					onmouseenter={() => (hoveredTrade = marker.idx)}
					onmouseleave={() => (hoveredTrade = null)}
				>
					<!-- Entry marker -->
					<g transform="translate({marker.entryX}, {marker.entryY})">
						{#if marker.side === 'BUY'}
							<!-- Up arrow for BUY -->
							<polygon
								points="0,-8 6,0 -6,0"
								fill="var(--color-positive)"
								stroke="var(--bg-primary)"
								stroke-width="1.5"
								class="marker-icon"
							/>
						{:else}
							<!-- Down arrow for SELL -->
							<polygon
								points="0,8 6,0 -6,0"
								fill="var(--color-negative)"
								stroke="var(--bg-primary)"
								stroke-width="1.5"
								class="marker-icon"
							/>
						{/if}
					</g>

					<!-- Exit marker -->
					<g transform="translate({marker.exitX}, {marker.exitY})">
						<circle
							r="5"
							fill={marker.isWin ? 'var(--color-positive)' : 'var(--color-negative)'}
							stroke="var(--bg-primary)"
							stroke-width="1.5"
							class="marker-icon"
						/>
						<!-- X mark for exit -->
						<line x1="-2" y1="-2" x2="2" y2="2" stroke="var(--bg-primary)" stroke-width="1.5" />
						<line x1="2" y1="-2" x2="-2" y2="2" stroke="var(--bg-primary)" stroke-width="1.5" />
					</g>
				</g>
			{/each}

			<!-- Y-axis (price) -->
			<g class="y-axis">
				{#each yTicks() as tick}
					<text x={padding.left + chartWidth + 8} y={scaleY(tick) + 3} class="axis-label">
						{formatPrice(tick)}
					</text>
				{/each}
			</g>

			<!-- X-axis (time) -->
			<g class="x-axis">
				{#each xTicks() as tick}
					<text x={scaleX(tick)} y={height - 8} class="axis-label" text-anchor="middle">
						{formatTime(tick)}
					</text>
				{/each}
			</g>
		</svg>

		<!-- Tooltip for hovered trade -->
		{#if hoveredTrade !== null}
			{@const trade = tradeMarkers()[hoveredTrade]}
			<div
				class="trade-tooltip"
				style="left: {Math.min(Math.max(trade.exitX, 100), measuredWidth - 160)}px; top: {Math.min(trade.exitY, chartHeight)}px;"
			>
				<div class="tooltip-header">
					<span class="side" class:buy={trade.side === 'BUY'} class:sell={trade.side === 'SELL'}>
						{trade.side}
					</span>
					<span class="pnl-value">
						<Numeric value={trade.pnlPct} format="percent" colorBySign={true} />
					</span>
				</div>
				<div class="tooltip-details">
					<div class="detail-row">
						<span class="label">Entry:</span>
						<span class="value">
							<Numeric value={trade.entryPrice} format="price" />
						</span>
					</div>
					<div class="detail-row">
						<span class="label">Exit:</span>
						<span class="value">
							<Numeric value={trade.exitPrice} format="price" />
						</span>
					</div>
					<div class="detail-row">
						<span class="label">P&L:</span>
						<span class="value-pnl">
							<Numeric value={trade.pnl} format="pnl" colorBySign={true} />
						</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Legend -->
		<div class="chart-legend">
			<div class="legend-item">
				<svg width="12" height="12">
					<polygon points="6,2 10,9 2,9" fill="var(--color-positive)" />
				</svg>
				<span>Long Entry</span>
			</div>
			<div class="legend-item">
				<svg width="12" height="12">
					<polygon points="6,10 10,3 2,3" fill="var(--color-negative)" />
				</svg>
				<span>Short Entry</span>
			</div>
			<div class="legend-item">
				<svg width="12" height="12">
					<circle cx="6" cy="6" r="4" fill="var(--color-positive)" />
					<line x1="4" y1="4" x2="8" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
					<line x1="8" y1="4" x2="4" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
				</svg>
				<span>Exit (Win)</span>
			</div>
			<div class="legend-item">
				<svg width="12" height="12">
					<circle cx="6" cy="6" r="4" fill="var(--color-negative)" />
					<line x1="4" y1="4" x2="8" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
					<line x1="8" y1="4" x2="4" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
				</svg>
				<span>Exit (Loss)</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.backtest-chart-container {
		position: relative;
		width: 100%;
	}

	.backtest-chart {
		display: block;
		width: 100%;
		background: var(--bg-secondary);
		border-radius: 4px;
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 200px;
		color: var(--text-muted);
		font-size: 12px;
		background: var(--bg-secondary);
		border-radius: 4px;
	}

	.axis-label {
		font-size: 9px;
		font-family: var(--font-mono);
		fill: var(--text-muted);
	}

	.marker-icon {
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.trade-marker-group:hover .marker-icon {
		transform: scale(1.2);
	}

	.trade-tooltip {
		position: absolute;
		background: var(--bg-primary);
		border: 1px solid var(--border-default);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		font-size: 11px;
		font-family: var(--font-mono);
		pointer-events: none;
		z-index: 10;
		box-shadow: 0 4px 12px color-mix(in srgb, var(--bg-primary) 70%, transparent);
		min-width: 140px;
	}

	.tooltip-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		padding-bottom: 0.375rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.tooltip-header .side {
		font-weight: 700;
		font-size: 12px;
	}

	.tooltip-header .side.buy {
		color: var(--color-positive);
	}

	.tooltip-header .side.sell {
		color: var(--color-negative);
	}

	.tooltip-header .pnl-value {
		font-weight: 700;
	}

	.tooltip-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.detail-row .label {
		color: var(--text-muted);
	}

	.detail-row .value {
		font-weight: 500;
	}

	.detail-row .value-pnl {
		font-weight: 500;
	}

	.chart-legend {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 0.75rem;
		font-size: 10px;
		color: var(--text-muted);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.legend-item svg {
		flex-shrink: 0;
	}
</style>
