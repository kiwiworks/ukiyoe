<script lang="ts">
	import Checkbox from '../Checkbox.svelte';
	import type { CheckboxSize } from '../Checkbox.svelte';

	let {
		checked = $bindable(false),
		disabled = false,
		loading = false,
		size = 'md' as CheckboxSize,
		ariaLabel,
		onValueChange
	}: {
		checked?: boolean;
		disabled?: boolean;
		loading?: boolean;
		size?: CheckboxSize;
		ariaLabel?: string;
		onValueChange?: (checked: boolean) => void;
	} = $props();
</script>

<Checkbox bind:checked {disabled} {loading} {size} aria-label={ariaLabel} {onValueChange} />
