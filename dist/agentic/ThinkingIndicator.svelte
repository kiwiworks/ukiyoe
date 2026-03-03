<script lang="ts" module>
	export type ThinkingStatus =
		| 'thinking'
		| 'searching'
		| 'executing'
		| 'writing'
		| 'reading'
		| 'complete';

	export interface ThinkingProgress {
		current: number;
		total: number;
		label?: string;
	}

	export interface ThinkingIndicatorProps {
		/** Current activity status */
		status: ThinkingStatus;
		/** Custom label to display */
		label?: string;
		/** Elapsed time in seconds */
		elapsed?: number;
		/** Progress tracking */
		progress?: ThinkingProgress;
		/** Allow collapsing to show expanded content */
		collapsible?: boolean;
		/** Expanded thinking content */
		children?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import {
		Brain,
		Search,
		Play,
		PenLine,
		FileText,
		ChevronDown,
		CheckCircle
	} from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		status,
		label,
		elapsed,
		progress,
		collapsible = false,
		children,
		class: className = ''
	}: ThinkingIndicatorProps = $props();

	let expanded = $state(false);
	let previousStatus: ThinkingStatus | undefined = $state();

	// Auto-collapse when transitioning to complete
	$effect(() => {
		if (status === 'complete' && previousStatus !== 'complete' && previousStatus !== undefined) {
			expanded = false;
		}
		previousStatus = status;
	});

	const statusConfig: Record<
		ThinkingStatus,
		{ icon: typeof Brain; defaultLabel: string; color: string }
	> = {
		thinking: { icon: Brain, defaultLabel: 'Thinking', color: 'text-violet-400' },
		searching: { icon: Search, defaultLabel: 'Searching', color: 'text-cyan-400' },
		executing: { icon: Play, defaultLabel: 'Executing', color: 'text-amber-400' },
		writing: { icon: PenLine, defaultLabel: 'Writing', color: 'text-emerald-400' },
		reading: { icon: FileText, defaultLabel: 'Reading', color: 'text-blue-400' },
		complete: { icon: CheckCircle, defaultLabel: 'Complete', color: 'text-positive' }
	};

	const config = $derived(statusConfig[status]);
	const displayLabel = $derived(label || config.defaultLabel);
	const isComplete = $derived(status === 'complete');

	const progressText = $derived.by(() => {
		if (!progress) return null;
		if (progress.label) return progress.label;
		return `Step ${progress.current}/${progress.total}`;
	});

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
		class="flex items-center gap-2 text-sm text-text-secondary group touch-target"
		disabled={!collapsible}
		onclick={() => collapsible && (expanded = !expanded)}
	>
		<!-- Animated icon -->
		<span class="relative flex items-center justify-center w-5 h-5">
			{#if !isComplete}
				<span
					class="absolute inset-0 rounded-full {config.color} opacity-20 animate-ping"
					style="animation-duration: 1.5s;"
				></span>
			{/if}
			{#if status === 'complete'}
				<CheckCircle size={16} class={config.color} />
			{:else if status === 'thinking'}
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

		<!-- Progress -->
		{#if progressText}
			<span class="text-xs text-text-muted">{progressText}</span>
		{/if}

		<!-- Dots animation (hidden when complete) -->
		{#if !isComplete}
			<span class="flex gap-0.5">
				{#each [0, 1, 2] as i}
					<span
						class="w-1 h-1 rounded-full bg-neutral animate-bounce"
						style="animation-delay: {i * 150}ms; animation-duration: 0.8s;"
					></span>
				{/each}
			</span>
		{/if}

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
