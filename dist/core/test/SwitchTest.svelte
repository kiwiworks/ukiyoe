<script lang="ts">
	import Switch from '../Switch.svelte';
	import type { SwitchSize } from '../Switch.svelte';

	let {
		checked = $bindable(false),
		disabled = false,
		size = 'md' as SwitchSize,
		ariaLabel,
		onchange
	}: {
		checked?: boolean;
		disabled?: boolean;
		size?: SwitchSize;
		ariaLabel?: string;
		onchange?: (checked: boolean) => void;
	} = $props();
</script>

<Switch bind:checked {disabled} {size} aria-label={ariaLabel} {onchange} />
