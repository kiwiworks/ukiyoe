<script lang="ts" module>
	export type PageContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	export interface PageContainerProps {
		/** Maximum width of the container */
		size?: PageContainerSize;
		/** Center the container horizontally */
		centered?: boolean;
		/** Add horizontal padding */
		padded?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let {
		size = 'lg',
		centered = true,
		padded = true,
		class: className = '',
		children
	}: PageContainerProps = $props();

	const sizeClasses: Record<PageContainerSize, string> = {
		sm: 'max-w-xl',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl',
		full: 'max-w-full'
	};
</script>

<div
	class={cn(
		'w-full',
		sizeClasses[size],
		centered && 'mx-auto',
		padded && 'px-md',
		className
	)}
>
	{@render children?.()}
</div>
