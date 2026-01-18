<script lang="ts" module>
	export type PageSectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

	export interface PageSectionProps {
		/** Section title */
		title?: string;
		/** Section description */
		description?: string;
		/** Spacing above the section */
		spacing?: PageSectionSpacing;
		/** Additional CSS classes */
		class?: string;
		/** Title slot for custom headers */
		header?: import('svelte').Snippet;
		/** Children content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';
	import Heading from '../core/Heading.svelte';
	import Text from '../core/Text.svelte';

	let {
		title,
		description,
		spacing = 'lg',
		class: className = '',
		header,
		children
	}: PageSectionProps = $props();

	const spacingClasses: Record<PageSectionSpacing, string> = {
		none: '',
		sm: 'mt-md',
		md: 'mt-lg',
		lg: 'mt-xl',
		xl: 'mt-xxl'
	};
</script>

<section class={cn(spacingClasses[spacing], className)}>
	{#if header}
		{@render header()}
	{:else if title}
		<div class="mb-md">
			<Heading level={2} size="md">{title}</Heading>
			{#if description}
				<Text variant="muted" size="sm" class="mt-xs">{description}</Text>
			{/if}
		</div>
	{/if}
	{@render children?.()}
</section>
