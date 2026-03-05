<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
	export type InputAlign = 'left' | 'center' | 'right';
	export type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local';

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
		/** Left adornment — plain string or Snippet for icons/custom content */
		prefix?: string | Snippet;
		/** Right adornment — plain string or Snippet for icons/custom content (loading spinner takes priority) */
		suffix?: string | Snippet;
		id?: string;
		name?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
		class?: string;
		onValueChange?: (value: string) => void;
		onFocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		onBlur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
	}
</script>

<script lang="ts">
	import { Loader2 } from '@lucide/svelte';
	import { cn } from '../utils/cn';

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
		onValueChange,
		onFocus,
		onBlur
	}: InputProps = $props();

	const iconSizes: Record<InputSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	const isDisabled = $derived(disabled || loading);
	const hasPrefix = $derived(!!prefix);
	const hasSuffix = $derived(!!suffix || loading);
	const isSnippet = (v: unknown): v is Snippet => typeof v === 'function';

	const sizeClasses: Record<InputSize, string> = {
		xs: 'px-1.5 py-1 text-xs',
		sm: 'px-2 py-1.5 text-sm',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};

	const prefixPaddingClasses: Record<InputSize, string> = {
		xs: 'pl-7',
		sm: 'pl-8',
		md: 'pl-10',
		lg: 'pl-12'
	};

	const suffixPaddingClasses: Record<InputSize, string> = {
		xs: 'pr-7',
		sm: 'pr-8',
		md: 'pr-10',
		lg: 'pr-12'
	};

	const adornmentSizeClasses: Record<InputSize, string> = {
		xs: 'text-xs',
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base'
	};

	const alignClasses: Record<InputAlign, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};

	function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
		onValueChange?.(event.currentTarget.value);
	}
</script>

<div class={cn('relative w-full', className)}>
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
		class="w-full bg-bg-secondary border rounded-md font-mono text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-bg-tertiary read-only:cursor-default touch-target {error ? 'border-negative focus-visible:border-negative focus-visible:ring-negative/20' : 'border-border-default focus-visible:border-accent-brand focus-visible:ring-accent-brand/20'} {sizeClasses[size]} {alignClasses[align]} {hasPrefix ? prefixPaddingClasses[size] : ''} {hasSuffix ? suffixPaddingClasses[size] : ''}"
		oninput={handleInput}
		onfocus={onFocus}
		onblur={onBlur}
	/>
	{#if prefix}
		<span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted {adornmentSizeClasses[size]} pointer-events-none">
			{#if isSnippet(prefix)}
				{@render prefix()}
			{:else}
				{prefix}
			{/if}
		</span>
	{/if}
	{#if loading}
		<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
			<Loader2 size={iconSizes[size]} class="animate-spin" />
		</span>
	{:else if suffix}
		<span class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted {adornmentSizeClasses[size]} pointer-events-none">
			{#if isSnippet(suffix)}
				{@render suffix()}
			{:else}
				{suffix}
			{/if}
		</span>
	{/if}
</div>
