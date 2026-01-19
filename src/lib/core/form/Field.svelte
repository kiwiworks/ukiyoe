<script lang="ts" module>
	export type { FormFieldProps } from './types';
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '../../utils/cn';
	import { getFormContext } from './context.svelte';
	import type { FormFieldProps, FieldRenderProps, FieldValue } from './types';

	let { name, label, hint, required = false, class: className = '', children }: FormFieldProps =
		$props();

	const ctx = getFormContext();

	// Capture name at mount time (field names don't change, intentionally non-reactive)
	const _name = untrack(() => name);

	// Generate unique IDs
	const fieldId = `form-field-${_name}`;
	const descriptionId = `form-field-${_name}-description`;

	// Derived state from context
	const value = $derived(ctx.getValue(name));
	const errorMessage = $derived(ctx.getError(name) ?? null);
	const isTouched = $derived(ctx.isTouched(name));

	// Only show error if touched (when showErrorsOnTouched is true) or always
	const showError = $derived(
		errorMessage && (!ctx.showErrorsOnTouched || isTouched)
	);

	const hasDescription = $derived(showError || hint);

	// Props to pass to child component
	const fieldProps: FieldRenderProps = $derived({
		id: fieldId,
		name,
		value,
		error: !!showError,
		errorMessage: showError ? errorMessage : null,
		'aria-describedby': hasDescription ? descriptionId : undefined,
		'aria-invalid': !!showError,
		onchange: (newValue: FieldValue) => {
			ctx.setValue(name, newValue);
		},
		onblur: () => {
			ctx.setTouched(name);
		}
	});
</script>

<div class={cn('flex w-full flex-col gap-1.5', className)}>
	<label for={fieldId} class="flex w-full flex-col gap-1.5">
		<span class="text-xs text-text-muted uppercase tracking-wide font-medium">
			{label}
			{#if required}
				<span class="text-negative">*</span>
			{/if}
		</span>
		{@render children(fieldProps)}
	</label>
	{#if showError}
		<span id={descriptionId} class="text-xs text-negative" role="alert">{errorMessage}</span>
	{:else if hint}
		<span id={descriptionId} class="text-xs text-text-muted">{hint}</span>
	{/if}
</div>
