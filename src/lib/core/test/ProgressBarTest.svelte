<script lang="ts">
	import ProgressBar from '../ProgressBar.svelte';
	import type { ProgressBarSize, ProgressBarVariant } from '../ProgressBar.svelte';

	let {
		value = 50,
		max = 100,
		size = 'md' as ProgressBarSize,
		variant = 'default' as ProgressBarVariant,
		showValue = false,
		indeterminate = false
	}: {
		value?: number;
		max?: number;
		size?: ProgressBarSize;
		variant?: ProgressBarVariant;
		showValue?: boolean;
		indeterminate?: boolean;
	} = $props();
</script>

<ProgressBar {value} {max} {size} {variant} {showValue} {indeterminate} />
