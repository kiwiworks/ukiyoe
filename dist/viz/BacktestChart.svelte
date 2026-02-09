<script lang="ts">
	import Numeric from '../core/Numeric.svelte';
	import { cn } from '../utils/cn';

	interface Trade {
		entryTime: number;
		exitTime: number;
		side: string; // 'BUY' | 'SELL' | 'long' | 'short' | 'LONG' | 'SHORT'
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

	// Normalize side value to 'long' or 'short'
	function isLongTrade(side: string): boolean {
		const normalized = side.toLowerCase();
		return normalized === 'buy' || normalized === 'long';
	}

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
	const pricePoints = $derived.by(() => {
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
	const timeExtent = $derived.by(() => {
		if (pricePoints.length === 0) return { min: 0, max: 1 };
		return {
			min: Math.min(...pricePoints.map((p) => p.time)),
			max: Math.max(...pricePoints.map((p) => p.time))
		};
	});

	// Price range with padding
	const priceExtent = $derived.by(() => {
		if (pricePoints.length === 0) return { min: 0, max: 1 };
		const prices = pricePoints.map((p) => p.price);
		const min = Math.min(...prices);
		const max = Math.max(...prices);
		const range = max - min || max * 0.01;
		return {
			min: min - range * 0.1,
			max: max + range * 0.1
		};
	});

	// Scale functions - these need to be functions that take parameters
	function scaleX(time: number): number {
		const { min, max } = timeExtent;
		const range = max - min || 1;
		return padding.left + ((time - min) / range) * chartWidth;
	}

	function scaleY(price: number): number {
		const { min, max } = priceExtent;
		const range = max - min || 1;
		return padding.top + chartHeight - ((price - min) / range) * chartHeight;
	}

	// Generate price line path (connecting all points)
	const pricePath = $derived.by(() => {
		if (pricePoints.length < 2) return '';

		return pricePoints
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.time).toFixed(1)} ${scaleY(p.price).toFixed(1)}`)
			.join(' ');
	});

	// Generate trade markers with positions
	const tradeMarkers = $derived.by(() => {
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
	const yTicks = $derived.by(() => {
		const { min, max } = priceExtent;
		const range = max - min;
		const tickCount = 5;
		const ticks: number[] = [];

		for (let i = 0; i <= tickCount; i++) {
			ticks.push(min + (range * i) / tickCount);
		}
		return ticks;
	});

	// X-axis time ticks
	const xTicks = $derived.by(() => {
		const { min, max } = timeExtent;
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

<div class={cn('relative w-full', className)} bind:this={containerEl}>
	{#if trades.length === 0}
		<div class="flex items-center justify-center h-[200px] text-text-muted text-xs bg-bg-secondary rounded-md">
			<span>No trades to display</span>
		</div>
	{:else}
		<svg width={measuredWidth} {height} class="block w-full bg-bg-secondary rounded-md">
			<!-- Grid lines -->
			<g>
				{#each yTicks as tick}
					<line
						x1={padding.left}
						y1={scaleY(tick)}
						x2={padding.left + chartWidth}
						y2={scaleY(tick)}
						stroke="var(--border-subtle)"
						stroke-dasharray="2,4"
					/>
				{/each}
				{#each xTicks as tick}
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
			{#if pricePath}
				<path d={pricePath} fill="none" stroke="var(--text-muted)" stroke-width="1" opacity="0.5" />
			{/if}

			<!-- Trade spans (entry to exit lines) -->
			{#each tradeMarkers as marker}
				<g opacity={hoveredTrade === marker.idx ? 1 : 0.6}>
					<!-- Vertical entry line -->
					<line
						x1={marker.entryX}
						y1={padding.top}
						x2={marker.entryX}
						y2={padding.top + chartHeight}
						stroke={isLongTrade(marker.side) ? 'var(--positive)' : 'var(--negative)'}
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
						stroke={marker.isWin ? 'var(--positive)' : 'var(--negative)'}
						stroke-width={hoveredTrade === marker.idx ? 2 : 1.5}
					/>

					<!-- Profit/loss area fill -->
					<polygon
						points="{marker.entryX},{marker.entryY} {marker.exitX},{marker.exitY} {marker.exitX},{marker.entryY}"
						fill={marker.isWin ? 'var(--positive)' : 'var(--negative)'}
						opacity="0.1"
					/>
				</g>
			{/each}

			<!-- Trade markers -->
			{#each tradeMarkers as marker}
				<g
					class="group"
					role="img"
					aria-label={`${marker.side} trade ${marker.isWin ? 'win' : 'loss'}`}
					onmouseenter={() => (hoveredTrade = marker.idx)}
					onmouseleave={() => (hoveredTrade = null)}
				>
					<!-- Entry marker -->
					<g transform="translate({marker.entryX}, {marker.entryY})">
						{#if isLongTrade(marker.side)}
							<!-- Up arrow for BUY -->
							<polygon
								points="0,-8 6,0 -6,0"
								fill="var(--positive)"
								stroke="var(--bg-primary)"
								stroke-width="1.5"
								class="cursor-pointer transition-transform duration-100 ease-out group-hover:scale-120"
							/>
						{:else}
							<!-- Down arrow for SELL -->
							<polygon
								points="0,8 6,0 -6,0"
								fill="var(--negative)"
								stroke="var(--bg-primary)"
								stroke-width="1.5"
								class="cursor-pointer transition-transform duration-100 ease-out group-hover:scale-120"
							/>
						{/if}
					</g>

					<!-- Exit marker -->
					<g transform="translate({marker.exitX}, {marker.exitY})">
						<circle
							r="5"
							fill={marker.isWin ? 'var(--positive)' : 'var(--negative)'}
							stroke="var(--bg-primary)"
							stroke-width="1.5"
							class="cursor-pointer transition-transform duration-100 ease-out group-hover:scale-120"
						/>
						<!-- X mark for exit -->
						<line x1="-2" y1="-2" x2="2" y2="2" stroke="var(--bg-primary)" stroke-width="1.5" />
						<line x1="2" y1="-2" x2="-2" y2="2" stroke="var(--bg-primary)" stroke-width="1.5" />
					</g>
				</g>
			{/each}

			<!-- Y-axis (price) -->
			<g>
				{#each yTicks as tick}
					<text
						x={padding.left + chartWidth + 8}
						y={scaleY(tick) + 3}
						class="text-[9px] font-mono fill-text-muted"
					>
						{formatPrice(tick)}
					</text>
				{/each}
			</g>

			<!-- X-axis (time) -->
			<g>
				{#each xTicks as tick}
					<text
						x={scaleX(tick)}
						y={height - 8}
						class="text-[9px] font-mono fill-text-muted"
						text-anchor="middle"
					>
						{formatTime(tick)}
					</text>
				{/each}
			</g>
		</svg>

		<!-- Tooltip for hovered trade -->
		{#if hoveredTrade !== null}
			{@const trade = tradeMarkers[hoveredTrade]}
			<div
				class="absolute bg-bg-primary border border-border-default rounded-lg py-2 px-3 text-[11px] font-mono pointer-events-none z-10 shadow-[0_4px_12px_color-mix(in_srgb,var(--bg-primary)_70%,transparent)] min-w-[140px]"
				style="left: {Math.min(Math.max(trade.exitX, 100), measuredWidth - 160)}px; top: {Math.min(trade.exitY, chartHeight)}px;"
			>
				<div class="flex justify-between items-center mb-2 pb-1.5 border-b border-border-subtle">
					<span class="font-bold text-xs {isLongTrade(trade.side) ? 'text-positive' : 'text-negative'}">
						{trade.side}
					</span>
					<span class="font-bold">
						<Numeric value={trade.pnlPct} format="percent" colorBySign={true} />
					</span>
				</div>
				<div class="flex flex-col gap-1">
					<div class="flex justify-between gap-4">
						<span class="text-text-muted">Entry:</span>
						<span class="font-medium">
							<Numeric value={trade.entryPrice} format="price" />
						</span>
					</div>
					<div class="flex justify-between gap-4">
						<span class="text-text-muted">Exit:</span>
						<span class="font-medium">
							<Numeric value={trade.exitPrice} format="price" />
						</span>
					</div>
					<div class="flex justify-between gap-4">
						<span class="text-text-muted">P&L:</span>
						<span class="font-medium">
							<Numeric value={trade.pnl} format="pnl" colorBySign={true} />
						</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Legend -->
		<div class="flex gap-6 justify-center flex-wrap mt-3 text-[10px] text-text-muted">
			<div class="flex items-center gap-1.5">
				<svg width="12" height="12" class="shrink-0">
					<polygon points="6,2 10,9 2,9" fill="var(--positive)" />
				</svg>
				<span>Long Entry</span>
			</div>
			<div class="flex items-center gap-1.5">
				<svg width="12" height="12" class="shrink-0">
					<polygon points="6,10 10,3 2,3" fill="var(--negative)" />
				</svg>
				<span>Short Entry</span>
			</div>
			<div class="flex items-center gap-1.5">
				<svg width="12" height="12" class="shrink-0">
					<circle cx="6" cy="6" r="4" fill="var(--positive)" />
					<line x1="4" y1="4" x2="8" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
					<line x1="8" y1="4" x2="4" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
				</svg>
				<span>Exit (Win)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<svg width="12" height="12" class="shrink-0">
					<circle cx="6" cy="6" r="4" fill="var(--negative)" />
					<line x1="4" y1="4" x2="8" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
					<line x1="8" y1="4" x2="4" y2="8" stroke="var(--bg-primary)" stroke-width="1" />
				</svg>
				<span>Exit (Loss)</span>
			</div>
		</div>
	{/if}
</div>
