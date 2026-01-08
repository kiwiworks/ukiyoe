<script lang="ts" module>
	export interface FormFieldProps {
		/** Field label */
		label: string;
		/** Error message (also triggers error state) */
		error?: string;
		/** Hint text shown below the input */
		hint?: string;
		/** Mark field as required */
		required?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Child content (input, select, textarea, etc.) */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let {
		label,
		error,
		hint,
		required = false,
		class: className = '',
		children
	}: FormFieldProps = $props();
</script>

<div class="flex w-full flex-col gap-1.5 {className}">
	<label class="flex w-full flex-col gap-1.5">
		<span class="text-xs text-text-muted uppercase tracking-wide font-medium">
			{label}
			{#if required}
				<span class="text-negative">*</span>
			{/if}
		</span>
		{@render children()}
	</label>
	{#if error}
		<span class="text-xs text-negative">{error}</span>
	{:else if hint}
		<span class="text-xs text-text-muted">{hint}</span>
	{/if}
</div>
