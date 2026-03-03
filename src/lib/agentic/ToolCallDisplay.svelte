<script lang="ts" module>
	export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

	export interface ToolCallDisplayProps {
		/** Tool function name */
		name: string;
		/** Visual status indicator */
		status?: ToolCallStatus;
		/** Compact one-liner summary (e.g. "Read src/index.ts") */
		summary?: string;
		/** Duration in milliseconds, shown right-aligned */
		duration?: number;
		/** Call identifier (shown in expanded detail) */
		id?: string;
		/** Tool call arguments (shown in expanded detail) */
		arguments?: unknown;
		/** Tool call result (shown in expanded detail) */
		result?: unknown;
		/** Expand state */
		expanded?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Loader2, CheckCircle, XCircle, Circle, ChevronRight } from '@lucide/svelte';
	import Badge from '../core/Badge.svelte';
	import CodeBlock from '../core/CodeBlock.svelte';
	import Text from '../core/Text.svelte';
	import { cn } from '../utils/cn';
	import { formatElapsed } from '../utils/format';

	let {
		name,
		status = 'pending',
		summary,
		duration,
		id,
		arguments: args,
		result,
		expanded = $bindable(false),
		class: className = ''
	}: ToolCallDisplayProps = $props();

	function stringify(value: unknown): string {
		if (typeof value === 'string') return value;
		try {
			return JSON.stringify(value, null, 2);
		} catch {
			return String(value);
		}
	}

	const argsString = $derived(args != null ? stringify(args) : undefined);
	const resultString = $derived(result != null ? stringify(result) : undefined);
	const hasDetail = $derived(argsString != null || resultString != null || id != null);
	const durationText = $derived(duration != null ? formatElapsed(duration) : undefined);
</script>

<div class={cn('flex flex-col', className)}>
	<!-- Compact header row -->
	<button
		type="button"
		class="group flex items-center gap-2 w-full text-left py-1 px-1.5 rounded-md hover:bg-bg-hover transition-colors"
		onclick={() => hasDetail && (expanded = !expanded)}
		disabled={!hasDetail}
	>
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

		<!-- Tool name -->
		<span class="font-mono text-sm text-text-primary shrink-0">{name}</span>

		<!-- Summary -->
		{#if summary}
			<span class="text-sm text-text-muted truncate flex-1">{summary}</span>
		{:else}
			<span class="flex-1"></span>
		{/if}

		<!-- Duration -->
		{#if durationText}
			<span class="text-xs font-mono text-text-muted shrink-0">{durationText}</span>
		{/if}

		<!-- Chevron (visible on hover when expandable) -->
		{#if hasDetail}
			<ChevronRight
				size={12}
				class="text-text-muted opacity-0 group-hover:opacity-100 transition-all shrink-0"
				style="transform: rotate({expanded ? 90 : 0}deg)"
			/>
		{/if}
	</button>

	<!-- Expanded detail -->
	{#if expanded && hasDetail}
		<div class="pl-7 space-y-2 py-2">
			{#if id}
				<div>
					<Badge variant="muted" size="xs" text={id} />
				</div>
			{/if}
			{#if argsString}
				<div class="space-y-1">
					<Text size="xs" variant="muted" weight="medium">Arguments</Text>
					<CodeBlock code={argsString} language="json" showLineNumbers={false} />
				</div>
			{/if}
			{#if resultString}
				<div class="space-y-1">
					<Text size="xs" variant="muted" weight="medium">Result</Text>
					<CodeBlock code={resultString} language="json" showLineNumbers={false} />
				</div>
			{/if}
		</div>
	{/if}
</div>
