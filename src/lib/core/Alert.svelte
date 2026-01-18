<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

	export interface AlertProps {
		variant?: AlertVariant;
		title?: string;
		dismissible?: boolean;
		icon?: Component;
		class?: string;
		children: Snippet;
		ondismiss?: () => void;
	}
</script>

<script lang="ts">
	import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		variant = 'default',
		title,
		dismissible = false,
		icon,
		class: className = '',
		children,
		ondismiss
	}: AlertProps = $props();

	let visible = $state(true);

	const variantClasses: Record<AlertVariant, string> = {
		default: 'bg-bg-hover border-border-default text-text-secondary',
		info: 'bg-info/10 border-info/30 text-info',
		success: 'bg-positive/10 border-positive/30 text-positive',
		warning: 'bg-warning/10 border-warning/30 text-warning',
		danger: 'bg-negative/10 border-negative/30 text-negative'
	};

	const defaultIcons: Record<AlertVariant, Component> = {
		default: Info,
		info: Info,
		success: CheckCircle,
		warning: AlertTriangle,
		danger: AlertCircle
	};

	const Icon = $derived(icon ?? defaultIcons[variant]);

	function handleDismiss() {
		visible = false;
		ondismiss?.();
	}
</script>

{#if visible}
	<div
		class={cn('relative flex gap-3 rounded-lg border p-4', variantClasses[variant], className)}
		role="alert"
	>
		<Icon size={20} class="shrink-0 mt-0.5" />
		<div class="flex-1 min-w-0">
			{#if title}
				<h5 class="font-medium mb-1">{title}</h5>
			{/if}
			<div class="text-sm opacity-90">
				{@render children()}
			</div>
		</div>
		{#if dismissible}
			<button
				type="button"
				onclick={handleDismiss}
				class="shrink-0 p-1 rounded opacity-70 hover:opacity-100 transition-opacity"
			>
				<X size={16} />
			</button>
		{/if}
	</div>
{/if}
