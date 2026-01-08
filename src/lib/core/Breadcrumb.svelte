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

<nav class="breadcrumb" aria-label="Breadcrumb">
	<ol>
		{#if showHome}
			<li>
				<a href="/" class="breadcrumb-item home" aria-label="Home">
					<Home size={14} />
				</a>
				<ChevronRight size={12} class="separator" />
			</li>
		{/if}
		{#each items as item, i}
			<li>
				{#if item.href && i < items.length - 1}
					<a href={item.href} class="breadcrumb-item">
						{#if item.icon}
							<item.icon size={14} />
						{/if}
						<span>{item.label}</span>
					</a>
				{:else}
					<span class="breadcrumb-item current" aria-current="page">
						{#if item.icon}
							<item.icon size={14} />
						{/if}
						<span>{item.label}</span>
					</span>
				{/if}
				{#if i < items.length - 1}
					<ChevronRight size={12} class="separator" />
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumb {
		font-family: var(--font-mono);
	}

	ol {
		display: flex;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.25rem;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 11px;
		font-weight: 500;
		color: var(--text-muted);
		text-decoration: none;
		border-radius: 4px;
		transition: all 0.15s ease;
	}

	.breadcrumb-item.home {
		padding: 0.375rem;
	}

	a.breadcrumb-item:hover {
		color: var(--text-primary);
		background: var(--bg-secondary);
	}

	.breadcrumb-item.current {
		color: var(--text-primary);
		font-weight: 600;
	}

	:global(.separator) {
		color: var(--text-muted);
		opacity: 0.5;
		flex-shrink: 0;
	}
</style>
