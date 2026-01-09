<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface TabItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface TabsProps {
		value?: string;
		tabs: TabItem[] | string[];
		size?: TabsSize;
		class?: string;
		onchange?: (value: string) => void;
		children?: Snippet<[string]>;
	}
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';

	let {
		value = $bindable(''),
		tabs,
		size = 'md',
		class: className = '',
		onchange,
		children
	}: TabsProps = $props();

	const items = $derived(
		tabs.map((tab) => (typeof tab === 'string' ? { value: tab, label: tab } : tab))
	);

	// Set default value to first tab if not set
	$effect(() => {
		if (!value && items.length > 0) {
			value = items[0].value;
		}
	});

	const triggerSizes: Record<TabsSize, string> = {
		xs: 'px-2 py-1 text-[10px]',
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-base'
	};

	function handleChange(newValue: string) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<Tabs.Root {value} onValueChange={handleChange} class={className}>
	<Tabs.List
		class="inline-flex items-center gap-1 rounded-lg bg-bg-tertiary p-1"
	>
		{#each items as tab}
			<Tabs.Trigger
				value={tab.value}
				disabled={tab.disabled}
				class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-bg-primary data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-muted hover:text-text-primary {triggerSizes[size]}"
			>
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#if children}
		{#each items as tab}
			<Tabs.Content value={tab.value} class="mt-4">
				{@render children(tab.value)}
			</Tabs.Content>
		{/each}
	{/if}
</Tabs.Root>
