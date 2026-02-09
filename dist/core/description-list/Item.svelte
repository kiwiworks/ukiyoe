<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DescriptionListItemProps {
		/** Label for this field */
		label: string;
		/** Whether to apply monospace font to the value */
		mono?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Value content */
		children: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';

	let {
		label,
		mono = false,
		class: className = '',
		children
	}: DescriptionListItemProps = $props();
</script>

<div class={cn('flex flex-col gap-1', className)}>
	<dt class="text-xs text-text-muted uppercase tracking-wide font-medium">{label}</dt>
	<dd class={cn('text-sm text-text-primary m-0', mono && 'font-mono')}>
		{@render children()}
	</dd>
</div>
