<script lang="ts">
	import {
		StatsGrid,
		Widget,
		Badge,
		StatusBadge,
		Tabs,
		DataTableAuto as DataTable,
		viewportStore,
		type StatItem,
		type Column
	} from 'ukiyoe/core';
	import { Sparkline, EquityChart, Gauge, ProgressRing, type EquityPoint, type TradeMarker } from 'ukiyoe/viz';

	// Stats
	const stats: StatItem[] = [
		{ label: 'Portfolio Value', value: '$124,892.50' },
		{ label: 'Daily P&L', value: '+$1,247.30', variant: 'positive' },
		{ label: 'Win Rate', value: '68.4%' },
		{ label: 'Active Positions', value: '7' }
	];

	// Tabs
	let activeTab = $state('overview');
	const tabs = [
		{ value: 'overview', label: 'Overview' },
		{ value: 'positions', label: 'Positions' }
	];

	// Mock equity curve
	const equityCurve: EquityPoint[] = Array.from({ length: 60 }, (_, i) => ({
		date: new Date(2025, 0, 1 + i).toISOString(),
		value: 100000 + Math.sin(i / 8) * 5000 + i * 400 + (Math.random() - 0.3) * 2000
	}));

	const trades: TradeMarker[] = [
		{ date: new Date(2025, 0, 12).toISOString(), side: 'buy', pnl: 320, label: 'BTC' },
		{ date: new Date(2025, 0, 25).toISOString(), side: 'sell', pnl: -150, label: 'ETH' },
		{ date: new Date(2025, 1, 5).toISOString(), side: 'buy', pnl: 890, label: 'SOL' },
		{ date: new Date(2025, 1, 18).toISOString(), side: 'sell', pnl: 450, label: 'BTC' }
	];

	// Sparkline data
	const sparkBtc = [42100, 42300, 41800, 42500, 43100, 43400, 42900, 43200, 43800, 44100, 43700, 44300];
	const sparkEth = [2280, 2310, 2290, 2250, 2230, 2260, 2300, 2280, 2310, 2340, 2320, 2350];
	const sparkSol = [98, 101, 97, 103, 106, 104, 108, 110, 107, 112, 115, 118];

	// Trade data
	interface Trade {
		id: string;
		time: string;
		symbol: string;
		side: string;
		qty: number;
		price: number;
		pnl: number;
	}

	const recentTrades: Trade[] = [
		{ id: '1', time: '14:32:05', symbol: 'BTC/USD', side: 'Buy', qty: 0.15, price: 44312.50, pnl: 287.40 },
		{ id: '2', time: '13:18:22', symbol: 'ETH/USD', side: 'Sell', qty: 2.5, price: 2348.75, pnl: -124.30 },
		{ id: '3', time: '11:45:10', symbol: 'SOL/USD', side: 'Buy', qty: 50, price: 118.42, pnl: 512.00 },
		{ id: '4', time: '10:22:38', symbol: 'BTC/USD', side: 'Sell', qty: 0.08, price: 44180.00, pnl: 164.20 },
		{ id: '5', time: '09:15:44', symbol: 'ETH/USD', side: 'Buy', qty: 3.0, price: 2325.10, pnl: 71.25 },
		{ id: '6', time: '08:42:11', symbol: 'SOL/USD', side: 'Sell', qty: 25, price: 116.80, pnl: -45.60 }
	];

	const tradeColumns: Column<Trade>[] = [
		{ key: 'time', header: 'Time', mono: true, width: '100px' },
		{ key: 'symbol', header: 'Symbol' },
		{ key: 'side', header: 'Side', width: '80px' },
		{ key: 'qty', header: 'Qty', align: 'right', mono: true, hideAt: 'sm' },
		{ key: 'price', header: 'Price', align: 'right', mono: true, format: (v) => `$${(v as number).toLocaleString()}` },
		{ key: 'pnl', header: 'P&L', align: 'right', mono: true, hideAt: 'sm' }
	];

	// Position data
	interface Position {
		id: string;
		symbol: string;
		side: string;
		entry: number;
		current: number;
		qty: number;
		pnl: number;
		status: string;
	}

	const positions: Position[] = [
		{ id: '1', symbol: 'BTC/USD', side: 'Long', entry: 43200, current: 44312, qty: 0.25, pnl: 278.00, status: 'active' },
		{ id: '2', symbol: 'ETH/USD', side: 'Long', entry: 2310, current: 2348, qty: 5.0, pnl: 190.00, status: 'active' },
		{ id: '3', symbol: 'SOL/USD', side: 'Short', entry: 120.50, current: 118.42, qty: 100, pnl: 208.00, status: 'active' },
		{ id: '4', symbol: 'AVAX/USD', side: 'Long', entry: 38.20, current: 37.80, qty: 200, pnl: -80.00, status: 'active' },
		{ id: '5', symbol: 'LINK/USD', side: 'Long', entry: 15.40, current: 16.10, qty: 150, pnl: 105.00, status: 'active' },
		{ id: '6', symbol: 'DOT/USD', side: 'Short', entry: 7.85, current: 7.62, qty: 500, pnl: 115.00, status: 'active' },
		{ id: '7', symbol: 'MATIC/USD', side: 'Long', entry: 0.92, current: 0.89, qty: 5000, pnl: -150.00, status: 'active' }
	];

	const positionColumns: Column<Position>[] = [
		{ key: 'symbol', header: 'Symbol' },
		{ key: 'side', header: 'Side', width: '80px' },
		{ key: 'entry', header: 'Entry', align: 'right', mono: true, format: (v) => `$${(v as number).toLocaleString()}` },
		{ key: 'current', header: 'Current', align: 'right', mono: true, format: (v) => `$${(v as number).toLocaleString()}` },
		{ key: 'qty', header: 'Qty', align: 'right', mono: true, hideAt: 'sm' },
		{ key: 'pnl', header: 'P&L', align: 'right', mono: true }
	];

	const statsCols = $derived(viewportStore.isMobile ? 2 : viewportStore.isTablet ? 3 : 4) as 2 | 3 | 4;
</script>

<div class="space-y-lg">
	<StatsGrid items={stats} columns={statsCols} />

	<Tabs {tabs} bind:value={activeTab}>
		{#snippet children(tab)}
			{#if tab === 'overview'}
				<div class="space-y-lg mt-md">
					<Widget title="Equity Curve">
						<EquityChart {equityCurve} {trades} height={240} showDrawdown />
					</Widget>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
						<Widget title="BTC/USD" subtitle="$44,312.50">
							{#snippet headerActions()}
								<Badge variant="success" size="xs" text="+2.4%" />
							{/snippet}
							<Sparkline data={sparkBtc} height={32} fill responsive />
						</Widget>
						<Widget title="ETH/USD" subtitle="$2,348.75">
							{#snippet headerActions()}
								<Badge variant="success" size="xs" text="+1.1%" />
							{/snippet}
							<Sparkline data={sparkEth} height={32} fill responsive />
						</Widget>
						<Widget title="SOL/USD" subtitle="$118.42">
							{#snippet headerActions()}
								<Badge variant="danger" size="xs" text="-0.8%" />
							{/snippet}
							<Sparkline data={sparkSol} height={32} fill responsive />
						</Widget>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
						<Widget title="Risk Exposure">
							<div class="flex justify-center">
								<Gauge value={72} label="Exposure" size="lg" colorStops={[
									{ value: 30, color: 'var(--color-success)' },
									{ value: 60, color: 'var(--color-warning)' },
									{ value: 85, color: 'var(--color-danger)' }
								]} />
							</div>
						</Widget>
						<Widget title="Allocation">
							<div class="flex items-center justify-center gap-lg">
								<ProgressRing value={45} size={80} label="BTC" color="var(--color-info)" />
								<ProgressRing value={30} size={80} label="ETH" color="var(--color-success)" />
								<ProgressRing value={25} size={80} label="Other" color="var(--color-warning)" />
							</div>
						</Widget>
						<Widget title="Session Stats">
							<div class="space-y-sm px-sm">
								<div class="flex justify-between items-center">
									<span class="text-sm text-text-muted">Trades Today</span>
									<span class="text-sm font-mono">12</span>
								</div>
								<div class="flex justify-between items-center">
									<span class="text-sm text-text-muted">Avg Hold Time</span>
									<span class="text-sm font-mono">2h 14m</span>
								</div>
								<div class="flex justify-between items-center">
									<span class="text-sm text-text-muted">Best Trade</span>
									<span class="text-sm font-mono text-success">+$512.00</span>
								</div>
								<div class="flex justify-between items-center">
									<span class="text-sm text-text-muted">Worst Trade</span>
									<span class="text-sm font-mono text-danger">-$150.00</span>
								</div>
							</div>
						</Widget>
					</div>

					<Widget title="Recent Trades">
						{#snippet headerActions()}
							<StatusBadge label="Live" variant="success" size="sm" pulse />
						{/snippet}
						<DataTable
							data={recentTrades}
							columns={tradeColumns}
							keyField="id"
							compact
							hoverable
						>
							{#snippet cell({ row, column, value })}
								{#if column.key === 'side'}
									<Badge
										variant={row.side === 'Buy' ? 'success' : 'danger'}
										size="xs"
										text={value as string}
									/>
								{:else if column.key === 'pnl'}
									<span class="font-mono {(value as number) >= 0 ? 'text-success' : 'text-danger'}">
										{(value as number) >= 0 ? '+' : ''}{((value as number)).toFixed(2)}
									</span>
								{:else}
									{column.format ? column.format(value, row) : value}
								{/if}
							{/snippet}
						</DataTable>
					</Widget>
				</div>
			{:else if tab === 'positions'}
				<div class="space-y-lg mt-md">
					<Widget title="Open Positions">
						{#snippet headerActions()}
							<Badge variant="info" size="xs" text="{positions.length} active" />
						{/snippet}
						<DataTable
							data={positions}
							columns={positionColumns}
							keyField="id"
							sortable
							defaultSortKey="pnl"
							defaultSortDir="desc"
							hoverable
						>
							{#snippet cell({ row, column, value })}
								{#if column.key === 'side'}
									<Badge
										variant={row.side === 'Long' ? 'success' : 'warning'}
										size="xs"
										text={value as string}
									/>
								{:else if column.key === 'pnl'}
									<span class="font-mono {(value as number) >= 0 ? 'text-success' : 'text-danger'}">
										{(value as number) >= 0 ? '+' : ''}${Math.abs(value as number).toFixed(2)}
									</span>
								{:else}
									{column.format ? column.format(value, row) : value}
								{/if}
							{/snippet}
						</DataTable>
					</Widget>
				</div>
			{/if}
		{/snippet}
	</Tabs>
</div>
