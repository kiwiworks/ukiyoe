<script lang="ts" module>
	export type ToolCallGroupStatus = 'pending' | 'running' | 'success' | 'error' | 'partial';

	export interface ToolCallGroupProps {
		/** Group label (auto-derived from count if absent) */
		label?: string;
		/** Visual status indicator */
		status?: ToolCallGroupStatus;
		/** Total number of calls in group */
		count?: number;
		/** Number of completed calls (for progress hint) */
		completed?: number;
		/** Aggregate duration in milliseconds */
		duration?: number;
		/** Expand state */
		expanded?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Grouped tool call children */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import {
		Loader2,
		CheckCircle,
		XCircle,
		Circle,
		CircleDashed,
		ChevronRight
	} from '@lucide/svelte';
	import { cn } from '../utils/cn';
	import { formatElapsed } from '../utils/format';

	let {
		label,
		status = 'pending',
		count,
		completed,
		duration,
		expanded = $bindable(true),
		class: className = '',
		children
	}: ToolCallGroupProps = $props();

	const displayLabel = $derived(
		label ?? (count != null ? `${count} tool call${count !== 1 ? 's' : ''}` : 'Tool calls')
	);

	const progressHint = $derived.by(() => {
		if (completed == null || count == null) return null;
		if (completed >= count) return null;
		return `(${completed}/${count})`;
	});

	const durationText = $derived(duration != null ? formatElapsed(duration) : undefined);
</script>

<div class={cn('flex flex-col', className)}>
	<!-- Group header -->
	<button
		type="button"
		class="group flex items-center gap-2 w-full text-left py-1 px-1.5 rounded-md hover:bg-bg-hover transition-colors touch-target"
		onclick={() => (expanded = !expanded)}
	>
		<!-- Chevron -->
		<ChevronRight
			size={12}
			class="text-text-muted shrink-0 transition-transform"
			style="transform: rotate({expanded ? 90 : 0}deg)"
		/>

		<!-- Status icon -->
		<span class="flex items-center justify-center w-4 h-4 shrink-0">
			{#if status === 'running'}
				<Loader2 size={14} class="text-accent-brand animate-spin" />
			{:else if status === 'success'}
				<CheckCircle size={14} class="text-positive" />
			{:else if status === 'error'}
				<XCircle size={14} class="text-negative" />
			{:else if status === 'partial'}
				<CircleDashed size={14} class="text-amber-400" />
			{:else}
				<Circle size={14} class="text-text-muted" />
			{/if}
		</span>

		<!-- Label -->
		<span class="text-sm text-text-secondary font-medium">{displayLabel}</span>

		<!-- Progress hint -->
		{#if progressHint}
			<span class="text-xs text-text-muted">{progressHint}</span>
		{/if}

		<span class="flex-1"></span>

		<!-- Duration -->
		{#if durationText}
			<span class="text-xs font-mono text-text-muted shrink-0">{durationText}</span>
		{/if}
	</button>

	<!-- Children -->
	{#if expanded}
		<div class="pl-4 md:pl-6 border-l border-border-subtle ml-1 md:ml-2 space-y-0.5 py-1">
			{@render children()}
		</div>
	{/if}
</div>
