<script lang="ts">
	import Input from '../Input.svelte';
	import type { InputSize, InputAlign, InputType } from '../Input.svelte';

	let {
		value = $bindable(''),
		type = 'text' as InputType,
		placeholder = '',
		size = 'md' as InputSize,
		align = 'left' as InputAlign,
		disabled = false,
		loading = false,
		readonly = false,
		required = false,
		error = false,
		prefix,
		suffix,
		ariaLabel,
		oninput,
		onchange
	}: {
		value?: string;
		type?: InputType;
		placeholder?: string;
		size?: InputSize;
		align?: InputAlign;
		disabled?: boolean;
		loading?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: boolean;
		prefix?: string;
		suffix?: string;
		ariaLabel?: string;
		oninput?: (e: Event) => void;
		onchange?: (e: Event) => void;
	} = $props();
</script>

<Input
	bind:value
	{type}
	{placeholder}
	{size}
	{align}
	{disabled}
	{loading}
	{readonly}
	{required}
	{error}
	{prefix}
	{suffix}
	aria-label={ariaLabel}
	{oninput}
	{onchange}
/>
