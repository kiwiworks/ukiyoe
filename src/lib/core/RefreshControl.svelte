<script lang="ts" module>
	export interface RefreshInterval {
		label: string;
		value: number | null; // ms, null = off
	}

	export const DEFAULT_INTERVALS: RefreshInterval[] = [
		{ label: 'Off', value: null },
		{ label: '5s', value: 5000 },
		{ label: '10s', value: 10000 },
		{ label: '30s', value: 30000 },
		{ label: '1m', value: 60000 },
		{ label: '5m', value: 300000 }
	];
</script>

<script lang="ts">
	import { RefreshCw, ChevronDown, Check } from '@lucide/svelte';

	interface Props {
		loading?: boolean;
		lastUpdated?: Date | null;
		interval?: number | null;
		intervals?: RefreshInterval[];
		onrefresh: () => void;
		onintervalchange?: (interval: number | null) => void;
	}

	let {
		loading = false,
		lastUpdated = null,
		interval = null,
		intervals = DEFAULT_INTERVALS,
		onrefresh,
		onintervalchange
	}: Props = $props();

	let dropdownOpen = $state(false);
	let dropdownRef: HTMLDivElement;

	const selectedLabel = $derived(
		intervals.find((i) => i.value === interval)?.label ?? 'Off'
	);

	const timeAgo = $derived.by(() => {
		if (!lastUpdated) return null;
		const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
		if (seconds < 5) return 'just now';
		if (seconds < 60) return `${seconds}s ago`;
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		return lastUpdated.toLocaleTimeString();
	});

	function selectInterval(value: number | null) {
		dropdownOpen = false;
		onintervalchange?.(value);
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
			dropdownOpen = false;
		}
	}

	$effect(() => {
		if (dropdownOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="refresh-control" bind:this={dropdownRef}>
	{#if lastUpdated && timeAgo}
		<span class="last-updated">{timeAgo}</span>
	{/if}

	<button
		class="refresh-btn"
		onclick={onrefresh}
		disabled={loading}
		title="Refresh now"
	>
		<RefreshCw size={14} class={loading ? 'animate-spin' : ''} />
	</button>

	{#if onintervalchange}
		<div class="interval-dropdown">
			<button
				class="interval-trigger"
				onclick={() => (dropdownOpen = !dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<span class="interval-label">{selectedLabel}</span>
				<span class="chevron" class:open={dropdownOpen}><ChevronDown size={12} /></span>
			</button>

			{#if dropdownOpen}
				<div class="interval-menu">
					{#each intervals as opt}
						<button
							class="interval-option"
							class:selected={opt.value === interval}
							onclick={() => selectInterval(opt.value)}
						>
							<span>{opt.label}</span>
							{#if opt.value === interval}
								<Check size={12} />
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.refresh-control {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 12px;
	}

	.last-updated {
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.refresh-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		padding: 0;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.refresh-btn:hover:not(:disabled) {
		background: var(--bg-hover);
		color: var(--text-primary);
		border-color: var(--border-default);
	}

	.refresh-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.interval-dropdown {
		position: relative;
	}

	.interval-trigger {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.375rem 0.5rem;
		background: var(--bg-tertiary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-size: 11px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.interval-trigger:hover {
		background: var(--bg-hover);
		color: var(--text-primary);
		border-color: var(--border-default);
	}

	.chevron {
		transition: transform 0.15s ease;
	}

	.chevron.open {
		transform: rotate(180deg);
	}

	.interval-menu {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		min-width: 80px;
		padding: 0.25rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		z-index: 50;
	}

	.interval-option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.375rem 0.5rem;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		font-size: 11px;
		text-align: left;
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.interval-option:hover {
		background: var(--bg-hover);
		color: var(--text-primary);
	}

	.interval-option.selected {
		color: var(--accent-brand);
	}
</style>
