<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	export type ChipSize = 'xs' | 'sm' | 'md' | 'lg';
	export type ChipVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

	export interface ChipProps {
		/** Display label */
		label?: string;
		/** Whether the chip is currently active/selected */
		active?: boolean;
		/** Visual variant */
		variant?: ChipVariant;
		/** Chip size */
		size?: ChipSize;
		/** Icon component rendered before the label */
		icon?: Component;
		/** Whether the chip is disabled */
		disabled?: boolean;
		/** Called when the chip is toggled — return value or use bind:active */
		onToggle?: (active: boolean) => void;
		/** Called when the dismiss button is clicked. Presence enables the dismiss button. */
		onDismiss?: () => void;
		/** Custom content (overrides label + icon) */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Toggle } from 'bits-ui';
	import { X } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		label,
		active = $bindable(false),
		variant = 'default',
		size = 'md',
		icon,
		disabled = false,
		onToggle,
		onDismiss,
		children,
		class: className
	}: ChipProps = $props();

	const sizeClasses: Record<ChipSize, string> = {
		xs: 'px-1.5 py-0.5 text-xs gap-1',
		sm: 'px-2 py-0.5 text-xs gap-1',
		md: 'px-2.5 py-1 text-sm gap-1.5',
		lg: 'px-3 py-1.5 text-sm gap-1.5'
	};

	const iconSizes: Record<ChipSize, number> = {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16
	};

	const inactiveClasses: Record<ChipVariant, string> = {
		default: 'bg-bg-secondary border-border-default text-text-secondary hover:bg-bg-hover hover:text-text-primary',
		primary: 'bg-bg-secondary border-border-default text-text-secondary hover:border-accent-brand/40 hover:text-accent-brand',
		success: 'bg-bg-secondary border-border-default text-text-secondary hover:border-positive/40 hover:text-positive',
		danger: 'bg-bg-secondary border-border-default text-text-secondary hover:border-negative/40 hover:text-negative',
		warning: 'bg-bg-secondary border-border-default text-text-secondary hover:border-warning/40 hover:text-warning',
		info: 'bg-bg-secondary border-border-default text-text-secondary hover:border-info/40 hover:text-info'
	};

	const activeClasses: Record<ChipVariant, string> = {
		default: 'bg-bg-active border-border-default text-text-primary',
		primary: 'bg-accent-brand/15 border-accent-brand/50 text-accent-brand',
		success: 'bg-positive/15 border-positive/50 text-positive',
		danger: 'bg-negative/15 border-negative/50 text-negative',
		warning: 'bg-warning/15 border-warning/50 text-warning',
		info: 'bg-info/15 border-info/50 text-info'
	};

	function handlePressedChange(pressed: boolean) {
		active = pressed;
		onToggle?.(pressed);
	}

	function handleDismiss(event: MouseEvent) {
		event.stopPropagation();
		onDismiss?.();
	}
</script>

<Toggle.Root
	pressed={active}
	onPressedChange={handlePressedChange}
	{disabled}
>
	{#snippet child({ props })}
		<button
			{...props}
			class={cn(
				'inline-flex items-center font-mono font-medium rounded-md border transition-colors cursor-pointer',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20',
				'disabled:opacity-50 disabled:cursor-not-allowed',
				sizeClasses[size],
				active ? activeClasses[variant] : inactiveClasses[variant],
				className
			)}
		>
			{#if children}
				{@render children()}
			{:else}
				{#if icon}
					{@const Icon = icon}
					<Icon size={iconSizes[size]} />
				{/if}
				{#if label}
					<span>{label}</span>
				{/if}
			{/if}
			{#if onDismiss}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span
					role="button"
					tabindex="0"
					class="inline-flex items-center justify-center rounded-sm -mr-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
					onclick={handleDismiss}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDismiss(e as unknown as MouseEvent); } }}
					aria-label="Remove {label ?? 'chip'}"
					aria-disabled={disabled || undefined}
				>
					<X size={iconSizes[size]} />
				</span>
			{/if}
		</button>
	{/snippet}
</Toggle.Root>
