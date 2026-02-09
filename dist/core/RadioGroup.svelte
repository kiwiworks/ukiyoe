<script lang="ts" module>
	export interface RadioOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	export type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface RadioGroupProps {
		/** Selected value (bindable) */
		value?: string;
		/** Available options */
		options: RadioOption[] | string[];
		/** Size preset */
		size?: RadioGroupSize;
		/** Disable interactions */
		disabled?: boolean;
		/** Show loading spinner and disable interactions */
		loading?: boolean;
		/** Layout orientation */
		orientation?: 'horizontal' | 'vertical';
		/** HTML name attribute for form submission */
		name?: string;
		/** Required field */
		required?: boolean;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** ID of element describing this radio group */
		'aria-describedby'?: string;
		/** Indicates radio group has invalid value */
		'aria-invalid'?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (value: string) => void;
	}
</script>

<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import { Loader2 } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		value = $bindable(''),
		options,
		size = 'md',
		disabled = false,
		loading = false,
		orientation = 'vertical',
		name,
		required = false,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		class: className = '',
		onchange
	}: RadioGroupProps = $props();

	const isDisabled = $derived(disabled || loading);

	const items = $derived(
		options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt))
	);

	const radioSizes: Record<RadioGroupSize, string> = {
		xs: 'h-3.5 w-3.5',
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	};

	const indicatorSizes: Record<RadioGroupSize, string> = {
		xs: 'h-1.5 w-1.5',
		sm: 'h-2 w-2',
		md: 'h-2.5 w-2.5',
		lg: 'h-3 w-3'
	};

	const textSizes: Record<RadioGroupSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-sm',
		lg: 'text-base'
	};

	const iconSizes: Record<RadioGroupSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	function handleChange(newValue: string) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class={cn('relative inline-block', className)}>
	<RadioGroup.Root
		{name}
		{value}
		disabled={isDisabled}
		{required}
		onValueChange={handleChange}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={ariaInvalid}
		aria-busy={loading}
		class="flex {orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4'}"
	>
		{#each items as item}
			<div class="flex items-center gap-2">
				<RadioGroup.Item
					value={item.value}
					disabled={item.disabled}
					class="inline-flex items-center justify-center rounded-full border border-border-default bg-bg-secondary transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 focus-visible:border-accent-brand disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:border-accent-brand {radioSizes[size]}"
				>
					{#snippet children({ checked })}
						{#if checked}
							<span class="rounded-full bg-accent-brand {indicatorSizes[size]}"></span>
						{/if}
					{/snippet}
				</RadioGroup.Item>
				<span class="text-text-primary {textSizes[size]} cursor-pointer {isDisabled ? 'opacity-50' : ''}">
					{item.label}
				</span>
			</div>
		{/each}
	</RadioGroup.Root>
	{#if loading}
		<span class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-2 text-text-muted">
			<Loader2 size={iconSizes[size]} class="animate-spin" />
		</span>
	{/if}
</div>
