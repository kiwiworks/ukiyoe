<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type DescriptionListColumns = 1 | 2 | 3;
	export type DescriptionListGap = 'sm' | 'md' | 'lg';

	export interface DescriptionListRootProps {
		/** Number of columns for the grid layout */
		columns?: DescriptionListColumns;
		/** Gap between items */
		gap?: DescriptionListGap;
		/** Additional CSS classes */
		class?: string;
		/** Description list items */
		children: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';

	let {
		columns = 1,
		gap = 'md',
		class: className = '',
		children
	}: DescriptionListRootProps = $props();

	const gapClasses: Record<DescriptionListGap, string> = {
		sm: 'gap-sm',
		md: 'gap-md',
		lg: 'gap-lg'
	};

	const columnClasses: Record<DescriptionListColumns, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 sm:grid-cols-2',
		3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
	};
</script>

<dl class={cn('grid m-0', columnClasses[columns], gapClasses[gap], className)}>
	{@render children()}
</dl>
