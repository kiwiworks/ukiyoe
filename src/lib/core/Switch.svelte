<script lang="ts" module>
	export type SwitchSize = 'sm' | 'md' | 'lg';

	export interface SwitchProps {
		/** Checked state (bindable) */
		checked?: boolean;
		/** Disable interactions */
		disabled?: boolean;
		/** Size preset */
		size?: SwitchSize;
		/** HTML id attribute for label association */
		id?: string;
		/** HTML name attribute for form submission */
		name?: string;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** ID of element describing this switch */
		'aria-describedby'?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (checked: boolean) => void;
	}
</script>

<script lang="ts">
	import { Switch } from 'bits-ui';

	let {
		checked = $bindable(false),
		disabled = false,
		size = 'md',
		id,
		name,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		class: className = '',
		onchange
	}: SwitchProps = $props();

	const trackSizes: Record<SwitchSize, string> = {
		sm: 'h-4 w-7',
		md: 'h-5 w-9',
		lg: 'h-6 w-11'
	};

	const thumbSizes: Record<SwitchSize, string> = {
		sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
		md: 'h-4 w-4 data-[state=checked]:translate-x-4',
		lg: 'h-5 w-5 data-[state=checked]:translate-x-5'
	};

	function handleChange(newChecked: boolean) {
		checked = newChecked;
		onchange?.(newChecked);
	}
</script>

<Switch.Root
	{id}
	{name}
	{checked}
	{disabled}
	onCheckedChange={handleChange}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	class="inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-brand data-[state=checked]:border-accent-brand data-[state=unchecked]:bg-bg-tertiary data-[state=unchecked]:border-border-default {trackSizes[size]} {className}"
>
	<Switch.Thumb
		class="pointer-events-none block rounded-full shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0.5 data-[state=checked]:bg-white data-[state=unchecked]:bg-text-muted {thumbSizes[size]}"
	/>
</Switch.Root>
