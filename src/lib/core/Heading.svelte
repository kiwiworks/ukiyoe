<script lang="ts" module>
	export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
	export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	export interface HeadingProps {
		level?: HeadingLevel;
		size?: HeadingSize;
		class?: string;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let { level = 2, size, class: className = '', children }: HeadingProps = $props();

	const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
		1: '2xl',
		2: 'lg',
		3: 'md',
		4: 'sm',
		5: 'xs',
		6: 'xs'
	};

	const sizeClasses: Record<HeadingSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl'
	};

	const resolvedSize = $derived(size ?? defaultSizeByLevel[level]);
	const computedClasses = $derived(
		cn(sizeClasses[resolvedSize], 'font-medium text-text-primary', className)
	);
</script>

{#if level === 1}
	<h1 class={computedClasses}>{@render children()}</h1>
{:else if level === 2}
	<h2 class={computedClasses}>{@render children()}</h2>
{:else if level === 3}
	<h3 class={computedClasses}>{@render children()}</h3>
{:else if level === 4}
	<h4 class={computedClasses}>{@render children()}</h4>
{:else if level === 5}
	<h5 class={computedClasses}>{@render children()}</h5>
{:else}
	<h6 class={computedClasses}>{@render children()}</h6>
{/if}
