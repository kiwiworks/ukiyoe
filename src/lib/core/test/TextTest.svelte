<script lang="ts">
	import Text from '../Text.svelte';
	import type { TextSize, TextVariant, TextWeight, TextElement } from '../Text.svelte';

	let {
		text = 'Sample text',
		size = 'md' as TextSize,
		variant = 'primary' as TextVariant,
		weight = 'normal' as TextWeight,
		as = 'p' as TextElement,
		mono = false,
		truncate = false
	}: {
		text?: string;
		size?: TextSize;
		variant?: TextVariant;
		weight?: TextWeight;
		as?: TextElement;
		mono?: boolean;
		truncate?: boolean;
	} = $props();
</script>

<Text {size} {variant} {weight} {as} {mono} {truncate}>{text}</Text>
