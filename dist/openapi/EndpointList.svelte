<script lang="ts" module>
	import type { EndpointGroup, Endpoint } from './types.js';

	export interface EndpointListProps {
		/** Endpoint groups */
		groups: EndpointGroup[];
		/** Currently selected endpoint */
		selectedEndpoint: Endpoint | null;
		/** Callback when endpoint is selected */
		onSelect: (endpoint: Endpoint) => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { Input, Badge, Accordion } from '../index.js';
	import type { AccordionItem } from '../core/Accordion.svelte';

	let { groups, selectedEndpoint, onSelect, class: className = '' }: EndpointListProps = $props();

	// Search state
	let searchQuery = $state('');

	// Filter groups by search query
	const filteredGroups = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return groups;
		return groups
			.map((group) => ({
				...group,
				endpoints: group.endpoints.filter(
					(ep) =>
						ep.path.toLowerCase().includes(q) ||
						ep.method.toLowerCase().includes(q) ||
						(ep.summary?.toLowerCase().includes(q) ?? false) ||
						(ep.operationId?.toLowerCase().includes(q) ?? false)
				)
			}))
			.filter((group) => group.endpoints.length > 0);
	});

	// Build accordion items from filtered groups
	const accordionItems = $derived<AccordionItem[]>(
		filteredGroups.map((group) => ({
			value: group.tag,
			title: `${group.tag} (${group.endpoints.length})`
		}))
	);

	// Start with all groups expanded
	let accordionValue = $state<string | string[]>([] as string[]);

	// Initialize with all groups expanded on mount
	$effect(() => {
		if ((accordionValue as string[]).length === 0 && groups.length > 0) {
			accordionValue = groups.map((g) => g.tag);
		}
	});

	// Re-expand all when search changes
	$effect(() => {
		if (searchQuery.trim()) {
			accordionValue = filteredGroups.map((g) => g.tag);
		}
	});
</script>

<nav class={cn('space-y-sm', className)}>
	<!-- Search -->
	<div class="sticky top-0 z-10 bg-bg-primary pb-sm">
		<Input
			type="search"
			placeholder="Search endpoints..."
			size="sm"
			value={searchQuery}
			onValueChange={(value) => (searchQuery = value)}
			suffix="/"
		/>
	</div>

	<!-- Accordion groups -->
	<Accordion
		items={accordionItems}
		type="multiple"
		bind:value={accordionValue}
	>
		{#snippet children(item)}
			{@const group = filteredGroups.find((g) => g.tag === item.value)}
			{#if group}
				<ul class="space-y-px">
					{#each group.endpoints as endpoint (endpoint.id)}
						{@const isSelected = selectedEndpoint?.id === endpoint.id}
						<li>
							<button
								type="button"
								class={cn(
									'w-full flex items-center gap-sm px-sm py-xs rounded-md text-left transition-colors touch-target',
									'hover:bg-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand',
									isSelected && 'bg-bg-active border-l-2 border-accent-brand'
								)}
								onclick={() => onSelect(endpoint)}
								aria-pressed={isSelected}
							>
								<span class="font-mono uppercase shrink-0">
									<Badge
										variant={endpoint.method === 'get' ? 'success' : endpoint.method === 'post' ? 'brand' : endpoint.method === 'delete' ? 'danger' : 'warning'}
										size="xs"
										text={endpoint.method}
									/>
								</span>
								<span
									class={cn(
										'font-mono text-xs truncate text-text-secondary',
										endpoint.deprecated && 'line-through text-text-muted',
										isSelected && 'text-text-primary'
									)}
								>
									{endpoint.path}
								</span>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		{/snippet}
	</Accordion>
</nav>
