<script lang="ts" module>
	export interface DisclosureRootProps {
		/** Whether the disclosure is expanded */
		expanded?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';
	import { setDisclosureContext, type DisclosureContext } from './context.svelte';

	let {
		expanded = $bindable(false),
		class: className = '',
		children
	}: DisclosureRootProps = $props();

	const ctx: DisclosureContext = {
		get expanded() {
			return expanded;
		},
		toggle() {
			expanded = !expanded;
		}
	};

	setDisclosureContext(ctx);
</script>

<div class={cn('border border-border-default rounded-lg overflow-hidden', className)}>
	{@render children()}
</div>
