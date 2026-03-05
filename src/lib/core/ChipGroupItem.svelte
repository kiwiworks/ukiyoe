<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';
	import type { ChipSize, ChipVariant } from './Chip.svelte';

	export interface ChipGroupItemProps {
		/** Unique value identifying this item in the group */
		value: string;
		/** Display label */
		label?: string;
		/** Visual variant */
		variant?: ChipVariant;
		/** Chip size */
		size?: ChipSize;
		/** Icon component rendered before the label */
		icon?: Component;
		/** Whether this item is disabled */
		disabled?: boolean;
		/** Called when the dismiss button is clicked. Presence enables the dismiss button. */
		onDismiss?: () => void;
		/** Custom content (overrides label + icon) */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { ToggleGroup } from 'bits-ui';
	import { X } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		value,
		label,
		variant = 'default',
		size = 'md',
		icon,
		disabled = false,
		onDismiss,
		children,
		class: className
	}: ChipGroupItemProps = $props();

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

	function handleDismiss(event: MouseEvent) {
		event.stopPropagation();
		onDismiss?.();
	}
</script>

<ToggleGroup.Item {value} {disabled}>
	{#snippet child({ props, pressed })}
		<button
			{...props}
			class={cn(
				'inline-flex items-center font-mono font-medium rounded-md border transition-colors cursor-pointer',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20',
				'disabled:opacity-50 disabled:cursor-not-allowed',
				sizeClasses[size],
				pressed ? activeClasses[variant] : inactiveClasses[variant],
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
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-sm -mr-0.5 opacity-60 hover:opacity-100 transition-opacity"
					onclick={handleDismiss}
					aria-label="Remove {label ?? 'chip'}"
					{disabled}
				>
					<X size={iconSizes[size]} />
				</button>
			{/if}
		</button>
	{/snippet}
</ToggleGroup.Item>
