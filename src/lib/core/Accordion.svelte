<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface AccordionItem {
		value: string;
		title: string;
		content?: string;
	}

	export interface AccordionProps {
		items: AccordionItem[];
		type?: 'single' | 'multiple';
		value?: string | string[];
		class?: string;
		children?: Snippet<[AccordionItem]>;
	}
</script>

<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { ChevronDown } from '@lucide/svelte';

	let {
		items,
		type = 'single',
		value = $bindable(type === 'single' ? '' : []),
		class: className = '',
		children
	}: AccordionProps = $props();
</script>

{#if type === 'single'}
	<Accordion.Root
		type="single"
		value={value as string}
		onValueChange={(v) => (value = v)}
		class="w-full divide-y divide-border-subtle {className}"
	>
		{#each items as item}
			<Accordion.Item value={item.value} class="py-0">
				<Accordion.Header>
					<Accordion.Trigger
						class="flex w-full items-center justify-between py-3 text-sm font-medium text-text-primary transition-colors hover:text-text-secondary [&[data-state=open]>svg]:rotate-180"
					>
						{item.title}
						<ChevronDown size={16} class="shrink-0 text-text-muted transition-transform duration-200" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content
					class="overflow-hidden text-sm text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
				>
					<div class="pb-3">
						{#if children}
							{@render children(item)}
						{:else}
							{item.content}
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{:else}
	<Accordion.Root
		type="multiple"
		value={value as string[]}
		onValueChange={(v) => (value = v)}
		class="w-full divide-y divide-border-subtle {className}"
	>
		{#each items as item}
			<Accordion.Item value={item.value} class="py-0">
				<Accordion.Header>
					<Accordion.Trigger
						class="flex w-full items-center justify-between py-3 text-sm font-medium text-text-primary transition-colors hover:text-text-secondary [&[data-state=open]>svg]:rotate-180"
					>
						{item.title}
						<ChevronDown size={16} class="shrink-0 text-text-muted transition-transform duration-200" />
					</Accordion.Trigger>
				</Accordion.Header>
				<Accordion.Content
					class="overflow-hidden text-sm text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
				>
					<div class="pb-3">
						{#if children}
							{@render children(item)}
						{:else}
							{item.content}
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{/if}
