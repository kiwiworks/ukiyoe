<script lang="ts" module>
	import type { ComponentType, SvelteComponent } from 'svelte';

	export interface BreadcrumbItem {
		label: string;
		href?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: ComponentType<SvelteComponent<any>>;
	}

	export interface BreadcrumbProps {
		items: BreadcrumbItem[];
		showHome?: boolean;
	}
</script>

<script lang="ts">
	import { ChevronRight, Home } from '@lucide/svelte';

	let { items, showHome = true }: BreadcrumbProps = $props();
</script>

<nav class="font-mono" aria-label="Breadcrumb">
	<ol class="m-0 flex list-none items-center gap-1 p-0">
		{#if showHome}
			<li class="flex items-center gap-1">
				<a
					href="/"
					class="flex items-center gap-1.5 rounded-[var(--radius-md)] p-1.5 text-[11px] font-medium text-text-muted no-underline transition-all duration-150 ease-out hover:bg-bg-secondary hover:text-text-primary"
					aria-label="Home"
				>
					<Home size={14} />
				</a>
				<ChevronRight size={12} class="shrink-0 text-text-muted opacity-50" />
			</li>
		{/if}
		{#each items as item, i}
			<li class="flex items-center gap-1">
				{#if item.href && i < items.length - 1}
					<a
						href={item.href}
						class="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-[11px] font-medium text-text-muted no-underline transition-all duration-150 ease-out hover:bg-bg-secondary hover:text-text-primary"
					>
						{#if item.icon}
							<item.icon size={14} />
						{/if}
						<span>{item.label}</span>
					</a>
				{:else}
					<span
						class="flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-[11px] font-semibold text-text-primary"
						aria-current="page"
					>
						{#if item.icon}
							<item.icon size={14} />
						{/if}
						<span>{item.label}</span>
					</span>
				{/if}
				{#if i < items.length - 1}
					<ChevronRight size={12} class="shrink-0 text-text-muted opacity-50" />
				{/if}
			</li>
		{/each}
	</ol>
</nav>
