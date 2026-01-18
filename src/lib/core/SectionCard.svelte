<script lang="ts" module>
	export interface SectionCardProps {
		title: string;
		icon?: import('svelte').Component;
		collapsible?: boolean;
		defaultOpen?: boolean;
		href?: string;
		class?: string;
		actions?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		empty?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { ChevronDown, ExternalLink } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let { title, icon, collapsible = false, defaultOpen = true, href, class: className = '', actions, children, empty }: SectionCardProps = $props();

	let open = $state(true);
	$effect(() => {
		open = defaultOpen;
	});

	function toggle() {
		if (collapsible) {
			open = !open;
		}
	}
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	class={cn('block bg-bg-secondary border border-border-subtle rounded-md overflow-hidden', href && 'cursor-pointer transition-all no-underline hover:border-border-default hover:bg-bg-tertiary', className)}
	{href}
>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<header
		class="flex items-center gap-2 p-3 text-[11px] font-semibold uppercase tracking-wide select-none {collapsible ? 'cursor-pointer' : ''}"
		onclick={collapsible ? toggle : undefined}
		onkeydown={collapsible ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } } : undefined}
		role={collapsible ? 'button' : undefined}
		tabindex={collapsible ? 0 : undefined}
		aria-expanded={collapsible ? open : undefined}
	>
		{#if icon}
			{@const Icon = icon}
			<Icon size={14} class="shrink-0 text-text-secondary" />
		{/if}
		<span class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-text-primary">{title}</span>
		{#if actions}
			<div class="flex items-center gap-2">
				{@render actions()}
			</div>
		{/if}
		{#if collapsible}
			<ChevronDown size={14} class="shrink-0 text-text-muted transition-transform {open ? '' : '-rotate-90'}" />
		{/if}
		{#if href}
			<ExternalLink size={12} class="shrink-0 text-text-muted" />
		{/if}
	</header>
	{#if !collapsible || open}
		<div class="p-3 border-t border-border-subtle">
			{#if children}
				{@render children()}
			{:else if empty}
				{@render empty()}
			{/if}
		</div>
	{/if}
</svelte:element>
