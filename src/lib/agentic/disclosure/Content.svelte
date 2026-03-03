<script lang="ts" module>
	export interface DisclosureContentProps {
		/** Additional CSS classes */
		class?: string;
		/** Content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';
	import { getDisclosureContext } from './context.svelte';

	let { class: className = '', children }: DisclosureContentProps = $props();

	const ctx = getDisclosureContext();
</script>

{#if ctx.expanded}
	<div class={cn('border-t border-border-default p-3 space-y-3 bg-bg-primary', className)}>
		{@render children()}
	</div>
{/if}
