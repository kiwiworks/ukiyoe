<script lang="ts" module>
	export type MessageRole = 'user' | 'assistant' | 'system';
	export type MessageStatus = 'idle' | 'streaming' | 'complete' | 'error';

	export interface MessageProps {
		/** Message author role */
		role: MessageRole;
		/** Current message state */
		status?: MessageStatus;
		/** Timestamp for the message */
		timestamp?: Date;
		/** Error message when status is error */
		error?: string;
		/** Additional CSS classes */
		class?: string;
		/** Message content */
		children: import('svelte').Snippet;
		/** Actions slot (copy, regenerate, etc.) */
		actions?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { Bot, User, Terminal, AlertCircle } from '@lucide/svelte';

	let {
		role,
		status = 'idle',
		timestamp,
		error,
		class: className = '',
		children,
		actions
	}: MessageProps = $props();

	const roleConfig: Record<MessageRole, { icon: typeof Bot; label: string; align: string }> = {
		user: { icon: User, label: 'You', align: 'items-end' },
		assistant: { icon: Bot, label: 'Assistant', align: 'items-start' },
		system: { icon: Terminal, label: 'System', align: 'items-center' }
	};

	const roleClasses: Record<MessageRole, string> = {
		user: 'bg-accent-brand/10 border-accent-brand/20',
		assistant: 'bg-bg-secondary border-border-default',
		system: 'bg-bg-tertiary border-border-subtle text-sm'
	};

	const config = $derived(roleConfig[role]);

	const formattedTime = $derived(
		timestamp
			? timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
			: null
	);
</script>

<div class="flex flex-col gap-1 {config.align} {className}">
	<!-- Header -->
	<div class="flex items-center gap-2 text-xs text-text-muted">
		{#if role === 'user'}
			<User size={14} />
		{:else if role === 'assistant'}
			<Bot size={14} />
		{:else}
			<Terminal size={14} />
		{/if}
		<span class="font-medium">{config.label}</span>
		{#if formattedTime}
			<span class="opacity-60">{formattedTime}</span>
		{/if}
		{#if status === 'streaming'}
			<span class="flex items-center gap-1 text-accent-brand">
				<span class="h-1.5 w-1.5 rounded-full bg-accent-brand animate-pulse"></span>
				typing
			</span>
		{/if}
	</div>

	<!-- Content -->
	<div
		class="relative max-w-[85%] rounded-lg border px-4 py-3 {roleClasses[role]} {status === 'error' ? 'border-negative bg-negative/10' : ''}"
	>
		{#if status === 'error' && error}
			<div class="flex items-start gap-2 text-negative">
				<AlertCircle size={16} class="mt-0.5 shrink-0" />
				<span class="text-sm">{error}</span>
			</div>
		{:else}
			<div class="prose prose-invert prose-sm max-w-none">
				{@render children()}
			</div>
		{/if}

		{#if status === 'streaming'}
			<span class="inline-block w-2 h-4 ml-0.5 bg-accent-brand animate-pulse align-middle"></span>
		{/if}
	</div>

	<!-- Actions -->
	{#if actions && status !== 'streaming'}
		<div class="flex items-center gap-1 mt-1">
			{@render actions()}
		</div>
	{/if}
</div>
