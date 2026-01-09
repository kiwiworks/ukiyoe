<script lang="ts" module>
	export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface TextareaProps {
		value?: string;
		placeholder?: string;
		size?: TextareaSize;
		rows?: number;
		disabled?: boolean;
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
	let {
		value = $bindable(''),
		placeholder = '',
		size = 'md',
		rows = 3,
		disabled = false,
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

	const sizeClasses: Record<TextareaSize, string> = {
		xs: 'px-1.5 py-1 text-xs',
		sm: 'px-2 py-1.5 text-sm',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};
</script>

<div class="w-full {className}">
	<textarea
		{id}
		{name}
		bind:value
		{placeholder}
		{rows}
		{disabled}
		{required}
		readonly={readonly}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-invalid={error}
		aria-required={required}
		class="w-full resize-y bg-bg-secondary border rounded-md font-mono text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-bg-tertiary read-only:cursor-default {error ? 'border-negative focus-visible:border-negative focus-visible:ring-negative/20' : 'border-border-default focus-visible:border-accent-brand focus-visible:ring-accent-brand/20'} {sizeClasses[size]}"
		{oninput}
		{onchange}
		{onfocus}
		{onblur}
	></textarea>
</div>
