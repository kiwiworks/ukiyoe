<script lang="ts" module>
	export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
	export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

	export interface HeadingProps {
		level?: HeadingLevel;
		size?: HeadingSize;
		id?: string;
		anchor?: boolean;
		class?: string;
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn';

	let { level = 2, size, id, anchor = false, class: className = '', children }: HeadingProps = $props();

	function handleAnchorClick(event: MouseEvent) {
		if (!id) return;
		event.preventDefault();

		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			// Update URL without triggering navigation
			history.pushState(null, '', `#${id}`);
		}
	}

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

{#snippet content()}
	{#if id && anchor}
		<a href="#{id}" class="heading-anchor" onclick={handleAnchorClick}>{@render children()}</a>
	{:else}
		{@render children()}
	{/if}
{/snippet}

{#if level === 1}
	<h1 {id} class={computedClasses}>{@render content()}</h1>
{:else if level === 2}
	<h2 {id} class={computedClasses}>{@render content()}</h2>
{:else if level === 3}
	<h3 {id} class={computedClasses}>{@render content()}</h3>
{:else if level === 4}
	<h4 {id} class={computedClasses}>{@render content()}</h4>
{:else if level === 5}
	<h5 {id} class={computedClasses}>{@render content()}</h5>
{:else}
	<h6 {id} class={computedClasses}>{@render content()}</h6>
{/if}
