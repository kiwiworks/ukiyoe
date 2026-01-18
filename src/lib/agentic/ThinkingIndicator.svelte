<script lang="ts" module>
	export type ThinkingStatus = 'thinking' | 'searching' | 'executing' | 'writing' | 'reading';

	export interface ThinkingIndicatorProps {
		/** Current activity status */
		status: ThinkingStatus;
		/** Custom label to display */
		label?: string;
		/** Elapsed time in seconds */
		elapsed?: number;
		/** Allow collapsing to show expanded content */
		collapsible?: boolean;
		/** Expanded thinking content */
		children?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Brain, Search, Play, PenLine, FileText, ChevronDown } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		status,
		label,
		elapsed,
		collapsible = false,
		children,
		class: className = ''
	}: ThinkingIndicatorProps = $props();

	let expanded = $state(false);

	const statusConfig: Record<
		ThinkingStatus,
		{ icon: typeof Brain; defaultLabel: string; color: string }
	> = {
		thinking: { icon: Brain, defaultLabel: 'Thinking', color: 'text-violet-400' },
		searching: { icon: Search, defaultLabel: 'Searching', color: 'text-cyan-400' },
		executing: { icon: Play, defaultLabel: 'Executing', color: 'text-amber-400' },
		writing: { icon: PenLine, defaultLabel: 'Writing', color: 'text-emerald-400' },
		reading: { icon: FileText, defaultLabel: 'Reading', color: 'text-blue-400' }
	};

	const config = $derived(statusConfig[status]);
	const displayLabel = $derived(label || config.defaultLabel);

	const formattedElapsed = $derived(() => {
		if (elapsed === undefined) return null;
		if (elapsed < 60) return `${elapsed}s`;
		const mins = Math.floor(elapsed / 60);
		const secs = elapsed % 60;
		return `${mins}m ${secs}s`;
	});
</script>

<div class={cn('flex flex-col gap-2', className)}>
	<button
		type="button"
		class="flex items-center gap-2 text-sm text-text-secondary group"
		disabled={!collapsible}
		onclick={() => collapsible && (expanded = !expanded)}
	>
		<!-- Animated icon -->
		<span class="relative flex items-center justify-center w-5 h-5">
			<span
				class="absolute inset-0 rounded-full {config.color} opacity-20 animate-ping"
				style="animation-duration: 1.5s;"
			></span>
			{#if status === 'thinking'}
				<Brain size={16} class="{config.color} animate-pulse" />
			{:else if status === 'searching'}
				<Search size={16} class="{config.color} animate-pulse" />
			{:else if status === 'executing'}
				<Play size={16} class="{config.color} animate-pulse" />
			{:else if status === 'writing'}
				<PenLine size={16} class="{config.color} animate-pulse" />
			{:else}
				<FileText size={16} class="{config.color} animate-pulse" />
			{/if}
		</span>

		<!-- Label -->
		<span class="font-medium {config.color}">{displayLabel}</span>

		<!-- Dots animation -->
		<span class="flex gap-0.5">
			{#each [0, 1, 2] as i}
				<span
					class="w-1 h-1 rounded-full bg-text-muted animate-bounce"
					style="animation-delay: {i * 150}ms; animation-duration: 0.8s;"
				></span>
			{/each}
		</span>

		<!-- Elapsed time -->
		{#if formattedElapsed()}
			<span class="text-text-muted text-xs ml-auto">{formattedElapsed()}</span>
		{/if}

		<!-- Collapse toggle -->
		{#if collapsible && children}
			<ChevronDown
				size={14}
				class="text-text-muted transition-transform group-hover:text-text-secondary"
				style="transform: rotate({expanded ? 180 : 0}deg)"
			/>
		{/if}
	</button>

	<!-- Expanded content -->
	{#if collapsible && expanded && children}
		<div
			class="pl-7 text-xs text-text-muted font-mono bg-bg-tertiary rounded-md p-3 max-h-48 overflow-y-auto"
		>
			{@render children()}
		</div>
	{/if}
</div>
