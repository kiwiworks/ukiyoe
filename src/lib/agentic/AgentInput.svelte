<script lang="ts" module>
	export type AttachmentType = 'file' | 'image' | 'url';

	export interface Attachment {
		id: string;
		type: AttachmentType;
		name: string;
		size?: number;
	}

	export interface AgentInputProps {
		/** Current input value */
		value?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Disable all interactions */
		disabled?: boolean;
		/** Show loading state (submitting) */
		loading?: boolean;
		/** Current attachments */
		attachments?: Attachment[];
		/** Maximum number of attachments */
		maxAttachments?: number;
		/** Called when user submits */
		onSubmit?: (value: string, attachments: Attachment[]) => void;
		/** Called when files are attached */
		onAttach?: (files: File[]) => void;
		/** Called when attachment is removed */
		onRemoveAttachment?: (id: string) => void;
		/** Called when stop is clicked during loading */
		onCancel?: () => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Send, Square, Paperclip, X, File as FileIcon, Image as ImageIcon, Link as LinkIcon } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		value = $bindable(''),
		placeholder = 'Send a message...',
		disabled = false,
		loading = false,
		attachments = [],
		maxAttachments = 5,
		onSubmit,
		onAttach,
		onRemoveAttachment,
		onCancel,
		class: className = ''
	}: AgentInputProps = $props();

	let textareaRef: HTMLTextAreaElement | undefined = $state();
	let fileInputRef: HTMLInputElement | undefined = $state();

	const isDisabled = $derived(disabled || loading);
	const canSubmit = $derived(value.trim().length > 0 && !isDisabled);
	const canAttach = $derived(attachments.length < maxAttachments && !isDisabled);

	const attachmentIcons: Record<AttachmentType, typeof FileIcon> = {
		file: FileIcon,
		image: ImageIcon,
		url: LinkIcon
	};

	function autoResize() {
		if (!textareaRef) return;
		textareaRef.style.height = 'auto';
		textareaRef.style.height = `${Math.min(textareaRef.scrollHeight, 200)}px`;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSubmit) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleSubmit() {
		if (!canSubmit) return;
		onSubmit?.(value.trim(), attachments);
		value = '';
		if (textareaRef) {
			textareaRef.style.height = 'auto';
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.length) {
			onAttach?.(Array.from(input.files));
			input.value = '';
		}
	}

	function formatSize(bytes?: number): string {
		if (!bytes) return '';
		if (bytes < 1024) return `${bytes}B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
	}
</script>

<div class={cn('flex flex-col gap-2', className)}>
	<!-- Attachments -->
	{#if attachments.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each attachments as attachment (attachment.id)}
				{@const Icon = attachmentIcons[attachment.type]}
				<div
					class="flex items-center gap-2 px-2 py-1 text-xs bg-bg-secondary border border-border-default rounded-md"
				>
					<Icon size={14} class="text-text-muted" />
					<span class="text-text-secondary max-w-32 truncate">{attachment.name}</span>
					{#if attachment.size}
						<span class="text-text-muted">{formatSize(attachment.size)}</span>
					{/if}
					<button
						type="button"
						class="text-text-muted hover:text-negative transition-colors"
						onclick={() => onRemoveAttachment?.(attachment.id)}
						disabled={isDisabled}
						aria-label="Remove attachment"
					>
						<X size={14} />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Input area -->
	<div
		class="relative flex items-end gap-2 bg-bg-secondary border border-border-default rounded-lg p-2 focus-within:border-accent-brand focus-within:ring-2 focus-within:ring-accent-brand/20 transition-all"
		class:opacity-50={disabled}
	>
		<!-- Attach button -->
		{#if onAttach}
			<button
				type="button"
				class="p-2 text-text-muted hover:text-text-secondary hover:bg-bg-hover rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				onclick={() => fileInputRef?.click()}
				disabled={!canAttach}
				aria-label="Attach file"
			>
				<Paperclip size={18} />
			</button>
			<input
				bind:this={fileInputRef}
				type="file"
				multiple
				class="hidden"
				onchange={handleFileSelect}
			/>
		{/if}

		<!-- Textarea -->
		<textarea
			bind:this={textareaRef}
			bind:value
			{placeholder}
			disabled={isDisabled}
			rows={1}
			class="flex-1 bg-transparent border-none outline-none resize-none text-text-primary placeholder:text-text-muted font-mono text-sm min-h-[24px] max-h-[200px] py-1"
			oninput={autoResize}
			onkeydown={handleKeydown}
			aria-label="Message input"
		></textarea>

		<!-- Submit / Stop button -->
		{#if loading}
			<button
				type="button"
				class="p-2 bg-negative text-text-inverse rounded-md hover:bg-negative-hover transition-colors"
				onclick={() => onCancel?.()}
				aria-label="Stop generation"
			>
				<Square size={18} />
			</button>
		{:else}
			<button
				type="button"
				class="p-2 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
				class:bg-accent-brand={canSubmit}
				class:text-text-inverse={canSubmit}
				class:hover:bg-accent-brand-hover={canSubmit}
				class:text-text-muted={!canSubmit}
				onclick={handleSubmit}
				disabled={!canSubmit}
				aria-label="Send message"
			>
				<Send size={18} />
			</button>
		{/if}
	</div>

	<!-- Hint -->
	<div class="text-xs text-text-muted text-center">
		<kbd class="px-1 py-0.5 bg-bg-tertiary rounded text-[10px]">⌘</kbd>
		<span class="mx-0.5">+</span>
		<kbd class="px-1 py-0.5 bg-bg-tertiary rounded text-[10px]">Enter</kbd>
		<span class="ml-1">to send</span>
	</div>
</div>
