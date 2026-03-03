<script lang="ts" module>
	export type AgentTaskStatus = 'pending' | 'running' | 'success' | 'error';

	export interface AgentTaskProgress {
		current: number;
		total: number;
		label?: string;
	}

	export interface AgentTaskProps {
		/** Agent/task name */
		name: string;
		/** Description of what the agent is doing */
		description?: string;
		/** Visual status indicator */
		status?: AgentTaskStatus;
		/** Progress tracking */
		progress?: AgentTaskProgress;
		/** Elapsed time in seconds */
		elapsed?: number;
		/** Expand state */
		expanded?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Nested tool calls, groups, or sub-agents */
		children?: import('svelte').Snippet;
		/** Trailing content (e.g. UsageDisplay after completion) */
		trailing?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { Loader2, CheckCircle, XCircle, Circle, ChevronRight, Bot } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		name,
		description,
		status = 'pending',
		progress,
		elapsed,
		expanded = $bindable(true),
		class: className = '',
		children,
		trailing
	}: AgentTaskProps = $props();

	const progressText = $derived.by(() => {
		if (!progress) return null;
		if (progress.label) return progress.label;
		return `Step ${progress.current}/${progress.total}`;
	});

	const formattedElapsed = $derived.by(() => {
		if (elapsed == null) return null;
		if (elapsed < 60) return `${elapsed}s`;
		const mins = Math.floor(elapsed / 60);
		const secs = elapsed % 60;
		return `${mins}m ${secs}s`;
	});

	const borderColor = $derived.by(() => {
		switch (status) {
			case 'running':
				return 'border-accent-brand/30';
			case 'success':
				return 'border-positive/30';
			case 'error':
				return 'border-negative/30';
			default:
				return 'border-border-subtle';
		}
	});
</script>

<div class={cn('flex flex-col', className)}>
	<!-- Header row -->
	<button
		type="button"
		class="group flex items-center gap-2 w-full text-left py-1 px-1.5 rounded-md hover:bg-bg-hover transition-colors touch-target"
		onclick={() => children && (expanded = !expanded)}
		disabled={!children}
	>
		<!-- Chevron (only when children exist) -->
		{#if children}
			<ChevronRight
				size={12}
				class="text-text-muted shrink-0 transition-transform"
				style="transform: rotate({expanded ? 90 : 0}deg)"
			/>
		{:else}
			<span class="w-3 shrink-0"></span>
		{/if}

		<!-- Status icon -->
		<span class="flex items-center justify-center w-4 h-4 shrink-0">
			{#if status === 'running'}
				<Loader2 size={14} class="text-accent-brand animate-spin" />
			{:else if status === 'success'}
				<CheckCircle size={14} class="text-positive" />
			{:else if status === 'error'}
				<XCircle size={14} class="text-negative" />
			{:else}
				<Circle size={14} class="text-text-muted" />
			{/if}
		</span>

		<!-- Bot icon -->
		<Bot size={14} class="text-text-muted shrink-0" />

		<!-- Agent name -->
		<span class="font-mono text-sm text-text-primary font-medium shrink-0">{name}</span>

		<span class="flex-1"></span>

		<!-- Progress -->
		{#if progressText}
			<span class="text-xs text-text-muted shrink-0">{progressText}</span>
		{/if}

		<!-- Elapsed -->
		{#if formattedElapsed}
			<span class="text-xs font-mono text-text-muted shrink-0">{formattedElapsed}</span>
		{/if}
	</button>

	<!-- Description -->
	{#if description}
		<div class="pl-5 md:pl-7 text-sm text-text-muted">{description}</div>
	{/if}

	<!-- Children (nested content) -->
	{#if expanded && children}
		<div class={cn('pl-4 md:pl-6 border-l-2 ml-1 md:ml-2 mt-1 space-y-0.5', borderColor)}>
			{@render children()}
		</div>
	{/if}

	<!-- Trailing content -->
	{#if trailing}
		<div class="pl-5 md:pl-7 mt-1">
			{@render trailing()}
		</div>
	{/if}
</div>
