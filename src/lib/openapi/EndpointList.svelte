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
	import { getMethodColor } from './utils.js';
	import { Text, Badge } from '../index.js';

	let { groups, selectedEndpoint, onSelect, class: className = '' }: EndpointListProps = $props();
</script>

<nav class={cn('space-y-lg', className)}>
	{#each groups as group (group.tag)}
		<div>
			<div class="flex items-center justify-between px-sm mb-sm">
				<Text variant="muted" size="xs" class="uppercase tracking-wider font-semibold">
					{group.tag}
				</Text>
				<Text variant="muted" size="xs">
					{group.endpoints.length}
				</Text>
			</div>
			<ul class="space-y-px">
				{#each group.endpoints as endpoint (endpoint.id)}
					{@const isSelected = selectedEndpoint?.id === endpoint.id}
					<li>
						<button
							type="button"
							class={cn(
								'w-full flex items-center gap-sm px-sm py-xs rounded-md text-left transition-colors',
								'hover:bg-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand',
								isSelected && 'bg-bg-active border-l-2 border-accent-brand'
							)}
							onclick={() => onSelect(endpoint)}
							aria-pressed={isSelected}
						>
							<Badge
								variant={endpoint.method === 'get' ? 'success' : endpoint.method === 'post' ? 'brand' : endpoint.method === 'delete' ? 'danger' : 'warning'}
								size="xs"
								text={endpoint.method}
								class="!font-mono !uppercase shrink-0"
							/>
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
		</div>
	{/each}
</nav>
