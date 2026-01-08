<script lang="ts" module>
	export interface ModalProps {
		/** Whether the modal is open */
		open: boolean;
		/** Title displayed in the modal header */
		title?: string;
		/** Width of the modal (CSS value) */
		width?: string;
		/** Height of the modal (CSS value) */
		height?: string;
		/** Whether to show the close button */
		showClose?: boolean;
		/** Callback when modal is closed */
		onclose?: () => void;
		/** Children content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { X } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';

	let {
		open = $bindable(false),
		title,
		width = 'var(--modal-width, auto)',
		height = 'var(--modal-height, auto)',
		showClose = true,
		onclose,
		children
	}: ModalProps = $props();

	let dialogRef: HTMLDivElement | undefined = $state();
	let previouslyFocused: HTMLElement | null = null;

	const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(): HTMLElement[] {
		if (!dialogRef) return [];
		return Array.from(dialogRef.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
			.filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
	}

	function trapFocus(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;

		const focusable = getFocusableElements();
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
		trapFocus(e);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	$effect(() => {
		if (open) {
			// Store currently focused element before modal opens
			previouslyFocused = document.activeElement as HTMLElement;
			// Prevent body scroll when modal is open
			document.body.style.overflow = 'hidden';
			// Focus first focusable element after render
			requestAnimationFrame(() => {
				const focusable = getFocusableElements();
				if (focusable.length > 0) {
					focusable[0].focus();
				} else {
					dialogRef?.focus();
				}
			});
		} else {
			// Restore body scroll
			document.body.style.overflow = '';
			// Restore focus when modal closes
			if (previouslyFocused) {
				previouslyFocused.focus();
				previouslyFocused = null;
			}
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={dialogRef}
		class="fixed inset-0 z-modal flex items-center justify-center bg-bg-overlay backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div
			class="flex flex-col max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-bg-secondary border border-border-default rounded-lg shadow-2xl overflow-hidden"
			style:width
			style:height
			transition:scale={{ duration: 150, start: 0.95 }}
		>
			{#if title || showClose}
				<header class="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
					{#if title}
						<h2 id="modal-title" class="m-0 text-sm font-semibold text-text-primary">{title}</h2>
					{/if}
					{#if showClose}
						<button
							class="flex items-center justify-center p-1 text-text-muted bg-transparent border-none rounded-sm cursor-pointer transition-all hover:text-text-primary hover:bg-bg-hover"
							onclick={handleClose}
							aria-label="Close modal"
						>
							<X size={16} />
						</button>
					{/if}
				</header>
			{/if}
			<div class="flex-1 overflow-auto p-4">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}
