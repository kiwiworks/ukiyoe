<script lang="ts" module>
	import type { Component } from 'svelte';

	export interface CommandItem {
		/** Unique identifier */
		id: string;
		/** Display label */
		label: string;
		/** Optional description */
		description?: string;
		/** Optional icon component */
		icon?: Component;
		/** Optional keyboard shortcut display (e.g., "⌘K") */
		shortcut?: string;
		/** Optional group/category */
		group?: string;
		/** Optional keywords for search matching */
		keywords?: string[];
		/** Whether the item is disabled */
		disabled?: boolean;
		/** Action to execute when selected */
		onSelect?: () => void;
		/** Optional href for navigation items */
		href?: string;
	}

	export interface CommandGroup {
		/** Group identifier */
		id: string;
		/** Group display label */
		label: string;
		/** Items in this group */
		items: CommandItem[];
	}

	export interface CommandPaletteProps {
		/** Whether the palette is open */
		open?: boolean;
		/** Placeholder text for the search input */
		placeholder?: string;
		/** Flat list of items (will be auto-grouped if items have group property) */
		items?: CommandItem[];
		/** Pre-grouped items */
		groups?: CommandGroup[];
		/** Empty state message when no results */
		emptyMessage?: string;
		/** Callback when an item is selected */
		onSelect?: (item: CommandItem) => void;
		/** Callback when the palette is closed */
		onClose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Search, Command } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		open = $bindable(false),
		placeholder = 'Type a command or search...',
		items = [],
		groups = [],
		emptyMessage = 'No results found.',
		onSelect,
		onClose,
		class: className = ''
	}: CommandPaletteProps = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputRef: HTMLInputElement | undefined = $state();
	let listRef: HTMLDivElement | undefined = $state();

	const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

	const computedGroups = $derived.by(() => {
		if (groups.length > 0) return groups;

		const groupMap = new Map<string, CommandItem[]>();
		for (const item of items) {
			const groupId = item.group ?? 'default';
			if (!groupMap.has(groupId)) {
				groupMap.set(groupId, []);
			}
			groupMap.get(groupId)!.push(item);
		}

		return Array.from(groupMap.entries()).map(([id, groupItems]) => ({
			id,
			label: id === 'default' ? '' : id,
			items: groupItems
		}));
	});

	const filteredGroups = $derived.by(() => {
		if (!searchQuery.trim()) return computedGroups;

		const query = searchQuery.toLowerCase();
		return computedGroups
			.map((group) => ({
				...group,
				items: group.items.filter((item) => {
					const searchTargets = [
						item.label,
						item.description ?? '',
						...(item.keywords ?? [])
					].map((s) => s.toLowerCase());
					return searchTargets.some((target) => target.includes(query));
				})
			}))
			.filter((group) => group.items.length > 0);
	});

	const flatItems = $derived(filteredGroups.flatMap((g) => g.items.filter((i) => !i.disabled)));

	$effect(() => {
		searchQuery;
		selectedIndex = 0;
	});

	function handleGlobalKeydown(e: KeyboardEvent) {
		const isModKey = isMac ? e.metaKey : e.ctrlKey;
		if (isModKey && e.key === 'k') {
			e.preventDefault();
			open = !open;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, flatItems.length - 1);
				scrollToSelected();
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				scrollToSelected();
				break;
			case 'Enter':
				e.preventDefault();
				if (flatItems[selectedIndex]) {
					selectItem(flatItems[selectedIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				handleClose();
				break;
		}
	}

	function scrollToSelected() {
		requestAnimationFrame(() => {
			const selected = listRef?.querySelector('[data-selected="true"]');
			selected?.scrollIntoView({ block: 'nearest' });
		});
	}

	function selectItem(item: CommandItem) {
		if (item.disabled) return;
		item.onSelect?.();
		onSelect?.(item);
		handleClose();
	}

	function handleClose() {
		open = false;
		searchQuery = '';
		selectedIndex = 0;
		onClose?.();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(() => inputRef?.focus());
		} else {
			document.body.style.overflow = '';
		}
	});

	function getItemIndex(item: CommandItem): number {
		return flatItems.indexOf(item);
	}
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
		style="z-index: 9999;"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Command palette"
		tabindex="-1"
	>
		<div
			class={cn(
				'flex flex-col max-h-[60vh] bg-bg-secondary border border-border-default rounded-lg shadow-2xl overflow-hidden',
				className
			)}
			style="width: 512px; max-width: calc(100vw - 2rem);"
		>
			<!-- Search input -->
			<div class="flex items-center gap-sm px-md py-sm border-b border-border-subtle">
				<Search size={16} class="text-text-muted shrink-0" />
				<input
					bind:this={inputRef}
					bind:value={searchQuery}
					type="text"
					{placeholder}
					class="flex-1 bg-transparent border-none text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
				/>
				<kbd class="hidden sm:flex px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-bg-tertiary rounded border border-border-subtle">
					esc
				</kbd>
			</div>

			<!-- Results list -->
			<div bind:this={listRef} class="flex-1 overflow-y-auto p-sm" role="listbox">
				{#if filteredGroups.length === 0}
					<div class="flex items-center justify-center py-xl text-sm text-text-muted">
						{emptyMessage}
					</div>
				{:else}
					{#each filteredGroups as group}
						{#if group.label}
							<div class="px-sm py-xs text-[10px] font-medium uppercase tracking-wider text-text-muted">
								{group.label}
							</div>
						{/if}
						{#each group.items as item}
							{@const itemIndex = getItemIndex(item)}
							{@const isSelected = itemIndex === selectedIndex}
							<button
								type="button"
								class={cn(
									'flex items-center gap-sm w-full px-sm py-sm rounded text-left transition-colors',
									isSelected ? 'bg-bg-hover' : 'bg-transparent',
									item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-bg-hover'
								)}
								data-selected={isSelected}
								disabled={item.disabled}
								onclick={() => selectItem(item)}
								onmouseenter={() => (selectedIndex = itemIndex)}
								role="option"
								aria-selected={isSelected}
							>
								{#if item.icon}
									{@const Icon = item.icon}
									<Icon size={16} class="text-text-muted shrink-0" />
								{/if}
								<div class="flex-1 min-w-0">
									<div class="text-sm text-text-primary truncate">{item.label}</div>
									{#if item.description}
										<div class="text-xs text-text-muted truncate">{item.description}</div>
									{/if}
								</div>
								{#if item.shortcut}
									<kbd class="hidden sm:block px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-bg-tertiary rounded border border-border-subtle">
										{item.shortcut}
									</kbd>
								{/if}
							</button>
						{/each}
					{/each}
				{/if}
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between px-md py-xs border-t border-border-subtle text-[10px] text-text-muted">
				<div class="flex items-center gap-md">
					<span class="flex items-center gap-1">
						<kbd class="px-1 py-0.5 bg-bg-tertiary rounded border border-border-subtle">↑</kbd>
						<kbd class="px-1 py-0.5 bg-bg-tertiary rounded border border-border-subtle">↓</kbd>
						<span>navigate</span>
					</span>
					<span class="flex items-center gap-1">
						<kbd class="px-1 py-0.5 bg-bg-tertiary rounded border border-border-subtle">↵</kbd>
						<span>select</span>
					</span>
				</div>
				<span class="flex items-center gap-1">
					<Command size={10} />
					<span>+K to toggle</span>
				</span>
			</div>
		</div>
	</div>
{/if}
