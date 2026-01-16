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

<div class="flex items-center gap-2 text-xs" bind:this={dropdownRef}>
	{#if lastUpdated && timeAgo}
		<span class="text-text-muted tabular-nums">{timeAgo}</span>
	{/if}

	<button
		class="flex items-center justify-center size-7 p-0 bg-bg-tertiary border border-border-subtle rounded-sm text-text-secondary cursor-pointer transition-all duration-150 hover:not-disabled:bg-bg-hover hover:not-disabled:text-text-primary hover:not-disabled:border-border-default disabled:opacity-50 disabled:cursor-not-allowed"
		onclick={onrefresh}
		disabled={loading}
		title="Refresh now"
	>
		<RefreshCw size={14} class={loading ? 'animate-spin' : ''} />
	</button>

	{#if onintervalchange}
		<div class="relative">
			<button
				class="flex items-center gap-1 px-2 py-1.5 bg-bg-tertiary border border-border-subtle rounded-sm text-text-secondary text-[11px] font-medium cursor-pointer transition-all duration-150 hover:bg-bg-hover hover:text-text-primary hover:border-border-default"
				onclick={() => (dropdownOpen = !dropdownOpen)}
				aria-expanded={dropdownOpen}
			>
				<span>{selectedLabel}</span>
				<span class="transition-transform duration-150 {dropdownOpen ? 'rotate-180' : ''}">
					<ChevronDown size={12} />
				</span>
			</button>

			{#if dropdownOpen}
				<div class="absolute top-[calc(100%+4px)] right-0 min-w-20 p-1 bg-bg-secondary border border-border-default rounded-md shadow-lg z-50">
					{#each intervals as opt}
						<button
							class="flex items-center justify-between w-full px-2 py-1.5 bg-transparent border-none rounded-sm text-[11px] text-left cursor-pointer transition-all duration-100 {opt.value === interval ? 'text-accent-brand' : 'text-text-secondary'} hover:bg-bg-hover hover:text-text-primary"
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
