<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	export interface TabItem {
		value: string;
		label: string;
		disabled?: boolean;
		/** Icon component to render before the label */
		icon?: Component;
		/** Count displayed after the label */
		count?: number;
	}

	export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
	export type TabsVariant = 'pill' | 'underline';

	export interface TabsProps {
		value?: string;
		tabs: TabItem[] | string[];
		size?: TabsSize;
		/** Visual variant */
		variant?: TabsVariant;
		class?: string;
		onchange?: (value: string) => void;
		children?: Snippet<[string]>;
		/** Custom trigger snippet for full control over tab rendering */
		trigger?: Snippet<[{ tab: TabItem; active: boolean }]>;
	}
</script>

<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		value = $bindable(''),
		tabs,
		size = 'md',
		variant = 'pill',
		class: className = '',
		onchange,
		children,
		trigger
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

	const iconSizes: Record<TabsSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	const pillListClasses =
		'inline-flex items-center gap-1 rounded-lg bg-bg-tertiary p-1 shrink-0';

	const underlineListClasses =
		'inline-flex items-center gap-0 border-b border-border-default shrink-0';

	const pillTriggerClasses =
		'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-bg-primary data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-muted hover:text-text-primary';

	const underlineTriggerClasses =
		'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:pointer-events-none disabled:opacity-50 border-b-2 -mb-px data-[state=active]:border-accent-brand data-[state=active]:text-text-primary border-transparent text-text-muted hover:text-text-primary';

	function handleChange(newValue: string) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<Tabs.Root {value} onValueChange={handleChange} class={cn(className)}>
	<Tabs.List
		class={variant === 'pill' ? pillListClasses : underlineListClasses}
	>
		{#each items as tab (tab.value)}
			<Tabs.Trigger
				value={tab.value}
				disabled={tab.disabled}
				class="{variant === 'pill' ? pillTriggerClasses : underlineTriggerClasses} {triggerSizes[size]}"
			>
				{#if trigger}
					{@render trigger({ tab, active: value === tab.value })}
				{:else}
					{#if tab.icon}
						<tab.icon size={iconSizes[size]} />
					{/if}
					{tab.label}
					{#if tab.count != null}
						<span class="text-text-muted text-xs">({tab.count})</span>
					{/if}
				{/if}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#if children}
		{#each items as tab (tab.value)}
			<Tabs.Content value={tab.value} class="mt-4 flex-1 min-h-0 flex flex-col">
				<div class="flex-1 min-h-0 flex flex-col">
					{@render children(tab.value)}
				</div>
			</Tabs.Content>
		{/each}
	{/if}
</Tabs.Root>
