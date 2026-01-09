<script lang="ts">
	import Button from '../Button.svelte';
	import type { ButtonVariant, ButtonSize, ButtonType } from '../Button.svelte';

	let {
		text = 'Button',
		variant = 'default' as ButtonVariant,
		size = 'md' as ButtonSize,
		type = 'button' as ButtonType,
		disabled = false,
		loading = false,
		active = false,
		fullWidth = false,
		href,
		ariaLabel,
		onclick
	}: {
		text?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: ButtonType;
		disabled?: boolean;
		loading?: boolean;
		active?: boolean;
		fullWidth?: boolean;
		href?: string;
		ariaLabel?: string;
		onclick?: (e: MouseEvent) => void;
	} = $props();
</script>

<Button {variant} {size} {type} {disabled} {loading} {active} {fullWidth} {href} aria-label={ariaLabel} {onclick}>
	{text}
</Button>
