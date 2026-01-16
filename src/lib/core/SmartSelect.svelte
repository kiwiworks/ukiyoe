<script lang="ts" module>
	import type { Snippet, Component } from 'svelte';

	export interface SmartSelectOption {
		value: string;
		label: string;
		description?: string;
		icon?: Component<{ size?: number; class?: string }>;
		shortcut?: string;
		disabled?: boolean;
		group?: string;
	}

	export interface SmartSelectAction {
		id: string;
		label: string;
		description?: string;
		icon?: Component<{ size?: number; class?: string }>;
		shortcut?: string;
		onSelect: () => void;
	}

	export type SmartSelectSize = 'sm' | 'md' | 'lg';

	export interface SmartSelectProps {
		/** Selected value (bindable) */
		value?: string;
		/** Available options */
		options?: SmartSelectOption[];
		/** Actions that can be triggered */
		actions?: SmartSelectAction[];
		/** Size preset */
		size?: SmartSelectSize;
		/** Disable interactions */
		disabled?: boolean;
		/** Show loading spinner */
		loading?: boolean;
		/** Placeholder text */
		placeholder?: string;
		/** Empty state message */
		emptyMessage?: string;
		/** HTML id attribute */
		id?: string;
		/** Accessible label */
		'aria-label'?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler for option selection */
		onchange?: (value: string) => void;
		/** Custom filter function */
		filter?: (option: SmartSelectOption, query: string) => boolean;
		/** Highlight matching text in results */
		highlightMatch?: boolean;
		/** Custom class for highlighted text */
		highlightClass?: string;
	}
</script>

<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { Search, Check, Loader2 } from '@lucide/svelte';

	let {
		value = $bindable(''),
		options = [],
		actions = [],
		size = 'md',
		disabled = false,
		loading = false,
		placeholder = 'Search...',
		emptyMessage = 'No results found',
		id,
		'aria-label': ariaLabel,
		class: className = '',
		onchange,
		filter,
		highlightMatch = false,
		highlightClass = 'bg-accent-brand/20 text-accent-brand'
	}: SmartSelectProps = $props();

	function highlightText(text: string, query: string): { text: string; highlight: boolean }[] {
		if (!query || !highlightMatch) return [{ text, highlight: false }];
		const lowerText = text.toLowerCase();
		const lowerQuery = query.toLowerCase();
		const index = lowerText.indexOf(lowerQuery);
		if (index === -1) return [{ text, highlight: false }];
		return [
			{ text: text.slice(0, index), highlight: false },
			{ text: text.slice(index, index + query.length), highlight: true },
			{ text: text.slice(index + query.length), highlight: false }
		].filter((part) => part.text.length > 0);
	}

	let searchValue = $state('');
	let open = $state(false);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchValue = target.value;
	}

	const defaultFilter = (option: SmartSelectOption, query: string) => {
		const q = query.toLowerCase();
		return (
			option.label.toLowerCase().includes(q) ||
			option.description?.toLowerCase().includes(q) ||
			option.value.toLowerCase().includes(q)
		);
	};

	const filterFn = $derived(filter ?? defaultFilter);

	// Combine options and actions into items for bits-ui
	const allItems = $derived([
		...options.map((opt) => ({ value: opt.value, label: opt.label, type: 'option' as const })),
		...actions.map((act) => ({ value: act.id, label: act.label, type: 'action' as const }))
	]);

	// Custom filter function for bits-ui Combobox
	function comboboxFilter(item: { value: string; label: string; type: 'option' | 'action' }, query: string) {
		if (!query) return true;
		const q = query.toLowerCase();

		if (item.type === 'option') {
			const opt = options.find((o) => o.value === item.value);
			if (!opt) return false;
			return filterFn(opt, query);
		} else {
			const act = actions.find((a) => a.id === item.value);
			if (!act) return false;
			return (
				act.label.toLowerCase().includes(q) ||
				act.description?.toLowerCase().includes(q)
			);
		}
	}

	const filteredOptions = $derived(
		searchValue ? options.filter((opt) => filterFn(opt, searchValue)) : options
	);

	const filteredActions = $derived(
		searchValue
			? actions.filter(
					(action) =>
						action.label.toLowerCase().includes(searchValue.toLowerCase()) ||
						action.description?.toLowerCase().includes(searchValue.toLowerCase())
				)
			: actions
	);

	const groupedOptions = $derived.by(() => {
		const groups = new Map<string | undefined, SmartSelectOption[]>();
		for (const opt of filteredOptions) {
			const group = opt.group;
			if (!groups.has(group)) {
				groups.set(group, []);
			}
			groups.get(group)!.push(opt);
		}
		return groups;
	});

	const hasResults = $derived(filteredOptions.length > 0 || filteredActions.length > 0);

	const selectedLabel = $derived(options.find((opt) => opt.value === value)?.label ?? '');

	const sizeClasses: Record<SmartSelectSize, string> = {
		sm: 'py-1.5 pl-8 pr-3 text-sm',
		md: 'py-2 pl-10 pr-3 text-sm',
		lg: 'py-3 pl-12 pr-4 text-base'
	};

	const iconSizes: Record<SmartSelectSize, number> = {
		sm: 14,
		md: 16,
		lg: 18
	};

	const iconPositions: Record<SmartSelectSize, string> = {
		sm: 'left-2',
		md: 'left-3',
		lg: 'left-4'
	};

	function handleSelect(selectedValue: string | undefined) {
		if (!selectedValue) return;

		const action = actions.find((a) => a.id === selectedValue);
		if (action) {
			action.onSelect();
			searchValue = '';
			open = false;
			return;
		}

		value = selectedValue;
		searchValue = '';
		onchange?.(selectedValue);
	}

	let viewportEl: HTMLElement | null = $state(null);
	let canScrollUp = $state(false);
	let canScrollDown = $state(false);

	function updateScrollState() {
		if (!viewportEl) return;
		canScrollUp = viewportEl.scrollTop > 0;
		canScrollDown = viewportEl.scrollTop < viewportEl.scrollHeight - viewportEl.clientHeight - 1;
	}
</script>

<div class="w-full {className}">
	<Combobox.Root
		type="single"
		{disabled}
		bind:open
		value={value || undefined}
		onValueChange={handleSelect}
		items={allItems}
	>
		<div class="relative">
			<Combobox.Trigger class="absolute {iconPositions[size]} top-1/2 -translate-y-1/2 text-text-muted">
				{#if loading}
					<Loader2 size={iconSizes[size]} class="animate-spin" />
				{:else}
					<Search size={iconSizes[size]} />
				{/if}
			</Combobox.Trigger>
			<Combobox.Input
				{id}
				aria-label={ariaLabel}
				{placeholder}
				onclick={() => { open = true; }}
				onfocus={() => { open = true; }}
				oninput={(e) => {
					handleInput(e);
					if (!open) open = true;
				}}
				class="w-full appearance-none bg-bg-secondary border border-border-default rounded-md font-mono text-text-primary transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:border-accent-brand focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-text-muted {sizeClasses[size]}"
			/>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				class="z-50 overflow-hidden rounded-md shadow-lg border border-border-default bg-bg-elevated w-[var(--bits-combobox-anchor-width)] min-w-64"
				sideOffset={4}
			>
				<div class="relative">
					<div
						class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-bg-elevated to-transparent pointer-events-none z-10 transition-opacity duration-150"
						class:opacity-0={!canScrollUp}
					></div>
					<div
						bind:this={viewportEl}
						onscroll={updateScrollState}
						class="p-1 max-h-72 overflow-y-auto"
					>
						{#if !hasResults}
							<div class="py-6 text-center text-text-muted text-sm">
								{emptyMessage}
							</div>
						{:else}
							{#if filteredActions.length > 0}
								<div class="px-2 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wide">
									Actions
								</div>
								{#each filteredActions as action}
									<Combobox.Item
										value={action.id}
										label={action.label}
										disabled={false}
										class="relative flex items-center gap-3 rounded-sm py-2 px-2 text-sm font-mono cursor-pointer select-none outline-none text-text-primary data-[highlighted]:bg-bg-hover"
									>
										{#if action.icon}
											<span class="text-text-muted">
												<action.icon size={16} />
											</span>
										{/if}
										<div class="flex-1 min-w-0">
											<div class="truncate">
												{#each highlightText(action.label, searchValue) as part}
													{#if part.highlight}
														<span class={highlightClass}>{part.text}</span>
													{:else}
														{part.text}
													{/if}
												{/each}
											</div>
											{#if action.description}
												<div class="text-xs text-text-muted truncate">
													{#each highlightText(action.description, searchValue) as part}
														{#if part.highlight}
															<span class={highlightClass}>{part.text}</span>
														{:else}
															{part.text}
														{/if}
													{/each}
												</div>
											{/if}
										</div>
										{#if action.shortcut}
											<kbd class="ml-auto text-xs text-text-muted bg-bg-tertiary px-1.5 py-0.5 rounded border border-border-default font-mono">
												{action.shortcut}
											</kbd>
										{/if}
									</Combobox.Item>
								{/each}
							{/if}

							{#each [...groupedOptions.entries()] as [group, groupOptions]}
								{#if group}
									<div class="px-2 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wide mt-2 first:mt-0">
										{group}
									</div>
								{/if}
								{#each groupOptions as option}
									<Combobox.Item
										value={option.value}
										label={option.label}
										disabled={option.disabled}
										class="relative flex items-center gap-3 rounded-sm py-2 pl-8 pr-2 text-sm font-mono cursor-pointer select-none outline-none text-text-primary data-[highlighted]:bg-bg-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
									>
										{#snippet children({ selected })}
											<span class="absolute left-2 flex h-4 w-4 items-center justify-center">
												{#if selected}
													<Check size={14} />
												{/if}
											</span>
											{#if option.icon}
												<span class="text-text-muted">
													<option.icon size={16} />
												</span>
											{/if}
											<div class="flex-1 min-w-0">
												<div class="truncate">
													{#each highlightText(option.label, searchValue) as part}
														{#if part.highlight}
															<span class={highlightClass}>{part.text}</span>
														{:else}
															{part.text}
														{/if}
													{/each}
												</div>
												{#if option.description}
													<div class="text-xs text-text-muted truncate">
														{#each highlightText(option.description, searchValue) as part}
															{#if part.highlight}
																<span class={highlightClass}>{part.text}</span>
															{:else}
																{part.text}
															{/if}
														{/each}
													</div>
												{/if}
											</div>
											{#if option.shortcut}
												<kbd class="ml-auto text-xs text-text-muted bg-bg-tertiary px-1.5 py-0.5 rounded border border-border-default font-mono">
													{option.shortcut}
												</kbd>
											{/if}
										{/snippet}
									</Combobox.Item>
								{/each}
							{/each}
						{/if}
					</div>
					<div
						class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-bg-elevated to-transparent pointer-events-none z-10 transition-opacity duration-150"
						class:opacity-0={!canScrollDown}
					></div>
				</div>
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
</div>
