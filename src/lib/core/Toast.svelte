<script lang="ts" module>
	export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

	export interface ToastData {
		id: string;
		title?: string;
		description: string;
		variant?: ToastVariant;
		duration?: number;
	}

	export interface ToastProps {
		toast: ToastData;
		onclose?: (id: string) => void;
	}

	// Toast store for managing toasts
	let toasts = $state<ToastData[]>([]);

	export function addToast(toast: Omit<ToastData, 'id'>) {
		const id = crypto.randomUUID();
		const newToast: ToastData = { id, ...toast };
		toasts = [...toasts, newToast];

		const duration = toast.duration ?? 5000;
		if (duration > 0) {
			setTimeout(() => {
				removeToast(id);
			}, duration);
		}

		return id;
	}

	export function removeToast(id: string) {
		toasts = toasts.filter((t) => t.id !== id);
	}

	export function getToasts() {
		return toasts;
	}
</script>

<script lang="ts">
	import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from '@lucide/svelte';

	let { toast, onclose }: ToastProps = $props();

	const variantClasses: Record<ToastVariant, string> = {
		default: 'border-border-default',
		info: 'border-info',
		success: 'border-positive',
		warning: 'border-warning',
		danger: 'border-negative'
	};

	const variantIcons: Record<ToastVariant, typeof Info> = {
		default: Info,
		info: Info,
		success: CheckCircle,
		warning: AlertTriangle,
		danger: AlertCircle
	};

	const variantIconColors: Record<ToastVariant, string> = {
		default: 'text-text-muted',
		info: 'text-info',
		success: 'text-positive',
		warning: 'text-warning',
		danger: 'text-negative'
	};

	const Icon = $derived(variantIcons[toast.variant ?? 'default']);

	function handleClose() {
		onclose?.(toast.id);
	}
</script>

<div
	class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-bg-elevated shadow-lg border-l-4 {variantClasses[toast.variant ?? 'default']}"
	role="alert"
>
	<div class="flex items-start gap-3 p-4">
		<Icon size={20} class="shrink-0 mt-0.5 {variantIconColors[toast.variant ?? 'default']}" />
		<div class="flex-1 min-w-0">
			{#if toast.title}
				<p class="text-sm font-medium text-text-primary">{toast.title}</p>
			{/if}
			<p class="text-sm text-text-secondary {toast.title ? 'mt-1' : ''}">{toast.description}</p>
		</div>
		<button
			type="button"
			onclick={handleClose}
			class="shrink-0 p-1 rounded text-text-muted hover:text-text-primary transition-colors"
		>
			<X size={16} />
		</button>
	</div>
</div>
