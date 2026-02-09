<script lang="ts" module>
	export type StackDirection = 'vertical' | 'horizontal';
	export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

	export interface StackProps {
		/** Stack direction */
		direction?: StackDirection;
		/** Gap between items */
		gap?: StackGap;
		/** Align items on cross axis */
		align?: StackAlign;
		/** Justify items on main axis */
		justify?: StackJustify;
		/** Wrap items */
		wrap?: boolean;
		/** Render as inline element */
		inline?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		direction = 'vertical',
		gap = 'md',
		align = 'stretch',
		justify = 'start',
		wrap = false,
		inline = false,
		class: className = '',
		children
	}: StackProps = $props();

	const gapClasses: Record<StackGap, string> = {
		none: 'gap-0',
		xs: 'gap-xs',
		sm: 'gap-sm',
		md: 'gap-md',
		lg: 'gap-lg',
		xl: 'gap-xl'
	};

	const alignClasses: Record<StackAlign, string> = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch',
		baseline: 'items-baseline'
	};

	const justifyClasses: Record<StackJustify, string> = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		between: 'justify-between',
		around: 'justify-around',
		evenly: 'justify-evenly'
	};
</script>

<div
	class={cn(
		inline ? 'inline-flex' : 'flex',
		direction === 'horizontal' ? 'flex-row' : 'flex-col',
		gapClasses[gap],
		alignClasses[align],
		justifyClasses[justify],
		wrap && 'flex-wrap',
		className
	)}
>
	{@render children?.()}
</div>
