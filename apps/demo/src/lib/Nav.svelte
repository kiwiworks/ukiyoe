<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto, afterNavigate } from '$app/navigation';
	import { SmartSelect, type SmartSelectOption } from 'ukiyoe/core';
	import { viewportStore } from 'ukiyoe/core';
	import { Sidebar } from 'ukiyoe/layout';
	import { ChevronRight } from '@lucide/svelte';
	import { sections } from './routes';

	let { drawerOpen = $bindable(false) }: { drawerOpen?: boolean } = $props();

	let collapsed = $state(false);
	let manualCollapse: boolean | undefined = $state(undefined);
	let searchValue = $state('');
	let navContainer: HTMLElement | undefined = $state();

	const autoCollapse = $derived(viewportStore.width < 1280);

	let prevAuto: boolean | undefined;
	$effect(() => {
		if (prevAuto !== undefined && autoCollapse !== prevAuto) {
			manualCollapse = undefined;
		}
		prevAuto = autoCollapse;
		collapsed = manualCollapse ?? autoCollapse;
	});

	function handleSidebarToggle() {
		manualCollapse = collapsed;
	}

	let manualExpanded: Record<string, boolean | undefined> = $state({});

	const activeSectionTitle = $derived.by(() => {
		const currentPath = $page.url.pathname;
		for (const section of sections) {
			for (const item of section.items) {
				const fullHref = item.href === '/' ? (base || '/') : base + item.href;
				if (currentPath === fullHref) return section.title;
			}
		}
		return null;
	});

	function isSectionExpanded(section: typeof sections[number]): boolean {
		if (section.pinned) return true;
		const manual = manualExpanded[section.title];
		if (manual !== undefined) return manual;
		return activeSectionTitle === section.title;
	}

	function toggleSection(title: string) {
		const section = sections.find(s => s.title === title);
		if (section?.pinned) return;
		const current = manualExpanded[title];
		if (current !== undefined) {
			manualExpanded[title] = !current;
		} else {
			manualExpanded[title] = activeSectionTitle !== title;
		}
	}

	afterNavigate(() => {
		manualExpanded = {};
		manualCollapse = undefined;
		if (viewportStore.isMobile) {
			drawerOpen = false;
		}
	});

	const searchOptions: SmartSelectOption[] = $derived(
		sections.flatMap((section) =>
			section.items.map((item) => ({
				value: item.href,
				label: item.label,
				group: section.title
			}))
		)
	);

	function handleSearchSelect(value: string) {
		if (value) {
			const fullHref = value === '/' ? (base || '/') : base + value;
			goto(fullHref);
			searchValue = '';
			drawerOpen = false;
		}
	}

	$effect(() => {
		const currentPath = $page.url.pathname;
		requestAnimationFrame(() => {
			const activeItem = navContainer?.querySelector('[data-active="true"]');
			activeItem?.scrollIntoView({ block: 'center', behavior: 'instant' });
		});
	});

	const sidebarMode = $derived(viewportStore.isMobile ? 'drawer' as const : 'sidebar' as const);
	// Drawer always shows expanded content regardless of collapsed state
	const showCollapsed = $derived(collapsed && sidebarMode !== 'drawer');
</script>

<Sidebar width={220} bind:collapsed mode={sidebarMode} bind:drawerOpen onToggle={handleSidebarToggle}>
	<nav bind:this={navContainer} class="flex flex-col py-sm" aria-label="Documentation">
		{#if !showCollapsed && sidebarMode === 'drawer'}
			<div class="px-sm mb-md">
				<SmartSelect
					options={searchOptions}
					value={searchValue}
					placeholder="Search..."
					size="sm"
					onValueChange={handleSearchSelect}
				/>
			</div>
		{/if}

		{#each sections as section}
			{@const expanded = isSectionExpanded(section)}
			{@const sectionHasActive = activeSectionTitle === section.title}
			{@const Icon = section.icon}
			{@const firstHref = section.items[0]?.href === '/' ? (base || '/') : base + section.items[0]?.href}
			<div class="mt-px">
				{#if showCollapsed}
					<!-- Collapsed: one icon per section, or per-item icons for pinned sections -->
					{#if section.pinned && !Icon}
						{#each section.items as item}
							{@const fullHref = item.href === '/' ? (base || '/') : base + item.href}
							{@const active = $page.url.pathname === fullHref}
							{@const ItemIcon = item.icon}
							{#if ItemIcon}
								<a
									href={fullHref}
									title={item.label}
									class="flex items-center justify-center py-1.5 transition-colors
										{active ? 'text-accent-brand' : 'text-text-muted hover:text-text-secondary'}"
								>
									<ItemIcon size={16} />
								</a>
							{/if}
						{/each}
					{:else if Icon}
						<a
							href={firstHref}
							title={section.title}
							class="flex items-center justify-center py-2 transition-colors
								{sectionHasActive ? 'text-accent-brand' : 'text-text-muted hover:text-text-secondary'}"
						>
							<Icon size={18} />
						</a>
					{/if}
				{:else}
					<!-- Expanded: header + item list -->
					<button
						type="button"
						class="w-full flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium tracking-wide select-none transition-colors
							{section.pinned ? 'cursor-default text-text-muted' : 'cursor-pointer text-text-muted hover:text-text-secondary'}
							{sectionHasActive ? '!text-text-primary' : ''}"
						onclick={() => toggleSection(section.title)}
						aria-expanded={expanded}
					>
						{#if !section.pinned}
							<ChevronRight
								size={10}
								class="shrink-0 text-text-muted transition-transform duration-150 {expanded ? 'rotate-90' : ''}"
							/>
						{:else if Icon}
							<Icon size={12} class="shrink-0 text-text-muted" />
						{/if}
						<span class="truncate">{section.title}</span>
						{#if !section.pinned && !expanded}
							<span class="ml-auto text-[10px] text-text-muted/50 tabular-nums">{section.items.length}</span>
						{/if}
					</button>
					{#if expanded}
						<ul class="flex flex-col pb-1">
							{#each section.items as item}
								{@const fullHref = item.href === '/' ? (base || '/') : base + item.href}
								{@const active = $page.url.pathname === fullHref}
								<li>
									<a
										href={fullHref}
										data-active={active}
										class="flex items-center gap-2 pl-6 px-3 py-[3px] text-[13px] transition-colors
											{active
												? 'text-accent-brand font-medium bg-accent-brand/8'
												: 'text-text-secondary hover:text-text-primary hover:bg-bg-hover/50'}"
									>
										<span class="truncate">{item.label}</span>
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</div>
		{/each}
	</nav>
</Sidebar>
