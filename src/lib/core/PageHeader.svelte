<script lang="ts" module>
	export interface PageHeaderProps {
		title: string;
		subtitle?: string;
		icon?: import('svelte').Component;
		backHref?: string;
		class?: string;
		badges?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let { title, subtitle, icon, backHref, class: classes = '', badges, actions }: PageHeaderProps = $props();
</script>

<header class={cn('flex justify-between items-start gap-3 mb-6 pb-3 border-b border-border-subtle', classes)}>
	<div class="flex items-start gap-3">
		{#if backHref}
			<a
				href={backHref}
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-bg-secondary text-text-muted transition-colors hover:border-border-default hover:text-text-primary"
			>
				<ArrowLeft size={16} />
			</a>
		{/if}
		{#if icon}
			{@const Icon = icon}
			<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg-tertiary text-text-secondary">
				<Icon size={18} />
			</div>
		{/if}
		<div class="flex flex-col gap-1">
			<div class="flex items-center gap-2">
				<h1 class="text-lg font-semibold text-text-primary m-0 p-0">{title}</h1>
				{#if badges}
					{@render badges()}
				{/if}
			</div>
			{#if subtitle}
				<span class="text-xs text-text-muted uppercase tracking-wide">{subtitle}</span>
			{/if}
		</div>
	</div>
	{#if actions}
		<div class="flex items-center gap-2">
			{@render actions()}
		</div>
	{/if}
</header>
