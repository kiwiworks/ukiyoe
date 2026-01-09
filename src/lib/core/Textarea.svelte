<script lang="ts" module>
	export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface TextareaProps {
		value?: string;
		placeholder?: string;
		size?: TextareaSize;
		rows?: number;
		disabled?: boolean;
		/** Show loading spinner and disable interactions */
		loading?: boolean;
		readonly?: boolean;
		required?: boolean;
		error?: boolean;
		id?: string;
		name?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
		class?: string;
		oninput?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
		onchange?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
		onfocus?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
	}
</script>

<script lang="ts">
	import { Loader2 } from '@lucide/svelte';

	let {
		value = $bindable(''),
		placeholder = '',
		size = 'md',
		rows = 3,
		disabled = false,
		loading = false,
		readonly = false,
		required = false,
		error = false,
		id,
		name,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		class: className = '',
		oninput,
		onchange,
		onfocus,
		onblur
	}: TextareaProps = $props();

	const isDisabled = $derived(disabled || loading);

	const sizeClasses: Record<TextareaSize, string> = {
		xs: 'px-1.5 py-1 text-xs',
		sm: 'px-2 py-1.5 text-sm',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};

	const iconSizes: Record<TextareaSize, number> = {
		sm: 14,
		md: 16,
		lg: 18
	};
</script>

<div class="relative w-full {className}">
	<textarea
		{id}
		{name}
		bind:value
		{placeholder}
		{rows}
		disabled={isDisabled}
		{required}
		readonly={readonly}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={error}
		aria-required={required}
		aria-busy={loading}
		class="w-full resize-y bg-bg-secondary border rounded-md font-mono text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-bg-tertiary read-only:cursor-default {error ? 'border-negative focus-visible:border-negative focus-visible:ring-negative/20' : 'border-border-default focus-visible:border-accent-brand focus-visible:ring-accent-brand/20'} {sizeClasses[size]}"
		{oninput}
		{onchange}
		{onfocus}
		{onblur}
	></textarea>
	{#if loading}
		<span class="absolute right-3 top-3 text-text-muted pointer-events-none">
			<Loader2 size={iconSizes[size]} class="animate-spin" />
		</span>
	{/if}
</div>
