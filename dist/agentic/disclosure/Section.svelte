<script lang="ts" module>
	export interface DisclosureSectionProps {
		/** Section label */
		label: string;
		/** Additional CSS classes */
		class?: string;
		/** Content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';
	import Text from '../../core/Text.svelte';

	let { label, class: className = '', children }: DisclosureSectionProps = $props();
</script>

<div class={cn('space-y-1', className)}>
	<Text size="xs" variant="muted" weight="medium" as="span" class="uppercase tracking-wide"
		>{label}</Text
	>
	{@render children()}
</div>
