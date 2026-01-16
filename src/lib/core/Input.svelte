<script lang="ts" module>
	export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
	export type InputAlign = 'left' | 'center' | 'right';
	export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';

	export interface InputProps {
		type?: InputType;
		value?: string;
		placeholder?: string;
		size?: InputSize;
		align?: InputAlign;
		disabled?: boolean;
		/** Show loading spinner and disable interactions */
		loading?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: boolean;
		prefix?: string;
		suffix?: string;
		id?: string;
		name?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
		class?: string;
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
	}
</script>

<script lang="ts">
	import { Loader2 } from '@lucide/svelte';

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		size = 'md',
		align = 'left',
		disabled = false,
		loading = false,
		readonly = false,
		required = false,
		error = false,
		prefix,
		suffix,
		id,
		name,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		class: className = '',
		oninput,
		onchange,
		onfocus,
		onblur
	}: InputProps = $props();

	const iconSizes: Record<InputSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	const isDisabled = $derived(disabled || loading);

	const sizeClasses: Record<InputSize, string> = {
		xs: 'px-1.5 py-1 text-xs',
		sm: 'px-2 py-1.5 text-sm',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};

	const alignClasses: Record<InputAlign, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};
</script>

<div class="relative w-full {className}">
	<input
		{id}
		{name}
		{type}
		bind:value
		{placeholder}
		disabled={isDisabled}
		{required}
		readonly={readonly}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={error}
		aria-required={required}
		aria-busy={loading}
		class="w-full bg-bg-secondary border rounded-md font-mono text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-bg-tertiary read-only:cursor-default {error ? 'border-negative focus-visible:border-negative focus-visible:ring-negative/20' : 'border-border-default focus-visible:border-accent-brand focus-visible:ring-accent-brand/20'} {sizeClasses[size]} {alignClasses[align]} {prefix ? 'pl-12' : ''} {suffix || loading ? 'pr-12' : ''}"
		{oninput}
		{onchange}
		{onfocus}
		{onblur}
	/>
	{#if prefix}
		<span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">{prefix}</span>
	{/if}
	{#if loading}
		<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
			<Loader2 size={iconSizes[size]} class="animate-spin" />
		</span>
	{:else if suffix}
		<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">{suffix}</span>
	{/if}
</div>
