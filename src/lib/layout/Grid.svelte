<script lang="ts" module>
	export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto';
	export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	export interface GridProps {
		/** Number of columns */
		cols?: GridColumns;
		/** Number of columns on small screens */
		colsSm?: GridColumns;
		/** Number of columns on medium screens */
		colsMd?: GridColumns;
		/** Number of columns on large screens */
		colsLg?: GridColumns;
		/** Gap between items */
		gap?: GridGap;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		cols = 1,
		colsSm,
		colsMd,
		colsLg,
		gap = 'md',
		class: className = '',
		children
	}: GridProps = $props();

	const colsClasses: Record<GridColumns, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
		12: 'grid-cols-12',
		auto: 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'
	};

	const colsSmClasses: Record<GridColumns, string> = {
		1: 'sm:grid-cols-1',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-3',
		4: 'sm:grid-cols-4',
		5: 'sm:grid-cols-5',
		6: 'sm:grid-cols-6',
		12: 'sm:grid-cols-12',
		auto: 'sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'
	};

	const colsMdClasses: Record<GridColumns, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4',
		5: 'md:grid-cols-5',
		6: 'md:grid-cols-6',
		12: 'md:grid-cols-12',
		auto: 'md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'
	};

	const colsLgClasses: Record<GridColumns, string> = {
		1: 'lg:grid-cols-1',
		2: 'lg:grid-cols-2',
		3: 'lg:grid-cols-3',
		4: 'lg:grid-cols-4',
		5: 'lg:grid-cols-5',
		6: 'lg:grid-cols-6',
		12: 'lg:grid-cols-12',
		auto: 'lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'
	};

	const gapClasses: Record<GridGap, string> = {
		none: 'gap-0',
		xs: 'gap-xs',
		sm: 'gap-sm',
		md: 'gap-md',
		lg: 'gap-lg',
		xl: 'gap-xl'
	};
</script>

<div
	class={cn(
		'grid',
		colsClasses[cols],
		colsSm && colsSmClasses[colsSm],
		colsMd && colsMdClasses[colsMd],
		colsLg && colsLgClasses[colsLg],
		gapClasses[gap],
		className
	)}
>
	{@render children?.()}
</div>
