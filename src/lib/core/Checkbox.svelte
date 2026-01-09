<script lang="ts" module>
	export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface CheckboxProps {
		/** Checked state (bindable) */
		checked?: boolean;
		/** Disable interactions */
		disabled?: boolean;
		/** Size preset */
		size?: CheckboxSize;
		/** HTML id attribute for label association */
		id?: string;
		/** HTML name attribute for form submission */
		name?: string;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** ID of element describing this checkbox */
		'aria-describedby'?: string;
		/** Indicates checkbox has invalid value */
		'aria-invalid'?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (checked: boolean) => void;
	}
</script>

<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { Check } from '@lucide/svelte';

	let {
		checked = $bindable(false),
		disabled = false,
		size = 'md',
		id,
		name,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		class: className = '',
		onchange
	}: CheckboxProps = $props();

	const sizeClasses: Record<CheckboxSize, string> = {
		xs: 'h-3.5 w-3.5',
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	};

	const iconSizes: Record<CheckboxSize, number> = {
		xs: 10,
		sm: 12,
		md: 14,
		lg: 16
	};

	function handleChange(newChecked: boolean | 'indeterminate') {
		if (typeof newChecked === 'boolean') {
			checked = newChecked;
			onchange?.(newChecked);
		}
	}
</script>

<Checkbox.Root
	{id}
	{name}
	{checked}
	{disabled}
	onCheckedChange={handleChange}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	aria-invalid={ariaInvalid}
	class="inline-flex items-center justify-center rounded border border-border-default bg-bg-secondary transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 focus-visible:border-accent-brand disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-accent-brand data-[state=checked]:border-accent-brand cursor-pointer {sizeClasses[size]} {className}"
>
	{#snippet children({ checked: isChecked })}
		<span class="text-white flex items-center justify-center">
			{#if isChecked}
				<Check size={iconSizes[size]} />
			{/if}
		</span>
	{/snippet}
</Checkbox.Root>
