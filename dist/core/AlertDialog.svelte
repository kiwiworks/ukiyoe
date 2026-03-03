<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	export type AlertDialogVariant = 'default' | 'info' | 'warning' | 'danger';

	export interface AlertDialogProps {
		/** Whether the dialog is open */
		open: boolean;
		/** Dialog title */
		title: string;
		/** Description text (used when content snippet is not provided) */
		description?: string;
		/** Visual variant controlling icon and confirm button color */
		variant?: AlertDialogVariant;
		/** Label for the confirm button */
		confirmLabel?: string;
		/** Label for the cancel button */
		cancelLabel?: string;
		/** Show loading state on confirm button */
		loading?: boolean;
		/** Custom icon component (overrides variant default) */
		icon?: Component;
		/** Callback when confirm is clicked */
		onConfirm?: () => void | Promise<void>;
		/** Callback when cancel is clicked or dialog is dismissed */
		onCancel?: () => void;
		/** Custom content snippet (overrides description) */
		content?: Snippet;
		/** Custom actions snippet (overrides default Cancel/Confirm buttons) */
		actions?: Snippet<[() => void]>;
		/** Additional CSS classes for the dialog content */
		class?: string;
	}
</script>

<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import { Info, AlertTriangle, AlertCircle } from '@lucide/svelte';
	import { cn } from '../utils/cn';
	import Button from './Button.svelte';

	let {
		open = $bindable(false),
		title,
		description,
		variant = 'default',
		confirmLabel = 'Confirm',
		cancelLabel = 'Cancel',
		loading = false,
		icon,
		onConfirm,
		onCancel,
		content,
		actions,
		class: className = ''
	}: AlertDialogProps = $props();

	const defaultIcons: Record<AlertDialogVariant, Component> = {
		default: Info,
		info: Info,
		warning: AlertTriangle,
		danger: AlertCircle
	};

	const iconColorClasses: Record<AlertDialogVariant, string> = {
		default: 'text-text-secondary',
		info: 'text-info',
		warning: 'text-warning',
		danger: 'text-negative'
	};

	const confirmVariants: Record<AlertDialogVariant, 'primary' | 'warning' | 'danger'> = {
		default: 'primary',
		info: 'primary',
		warning: 'warning',
		danger: 'danger'
	};

	const Icon = $derived(icon ?? defaultIcons[variant]);

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		if (!newOpen) {
			onCancel?.();
		}
	}

	function handleClose() {
		open = false;
		onCancel?.();
	}

	async function handleConfirm() {
		await onConfirm?.();
		if (!loading) {
			open = false;
		}
	}
</script>

<AlertDialog.Root {open} onOpenChange={handleOpenChange}>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="fixed inset-0 z-modal bg-bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
		/>
		<AlertDialog.Content
			class={cn(
				'fixed left-1/2 top-1/2 z-modal -translate-x-1/2 -translate-y-1/2',
				'w-full max-w-md max-md:max-w-[calc(100vw-2rem)] bg-bg-secondary border border-border-default rounded-lg shadow-2xl',
				'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
				className
			)}
		>
			<div class="flex items-start gap-3 px-4 pt-4 pb-2">
				<div class={cn('shrink-0 mt-0.5', iconColorClasses[variant])}>
					<Icon size={20} />
				</div>
				<div class="flex-1 min-w-0">
					<AlertDialog.Title class="text-sm font-semibold text-text-primary m-0">
						{title}
					</AlertDialog.Title>
					{#if content}
						<div class="mt-2">
							{@render content()}
						</div>
					{:else if description}
						<AlertDialog.Description class="mt-1 text-sm text-text-secondary m-0">
							{description}
						</AlertDialog.Description>
					{/if}
				</div>
			</div>

			<div class="flex justify-end gap-sm px-4 py-3 border-t border-border-subtle mt-2">
				{#if actions}
					{@render actions(handleClose)}
				{:else}
					<AlertDialog.Cancel>
						{#snippet child({ props })}
							<Button {...props} size="sm" variant="ghost">{cancelLabel}</Button>
						{/snippet}
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						{#snippet child({ props })}
							<Button
								{...props}
								size="sm"
								variant={confirmVariants[variant]}
								{loading}
								onClick={handleConfirm}
							>
								{confirmLabel}
							</Button>
						{/snippet}
					</AlertDialog.Action>
				{/if}
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
