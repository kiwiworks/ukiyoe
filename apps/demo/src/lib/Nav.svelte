<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { ListItem, Sidebar, Heading, Text, Link, SmartSelect, type SmartSelectOption } from 'ukiyoe';
	import { Box as BoxIcon } from '@lucide/svelte';
	import { sections } from './routes';

	let collapsed = $state(false);
	let searchValue = $state('');
	let navContainer: HTMLDivElement | undefined = $state();

	// Generate SmartSelect options from sections
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
		}
	}

	// Auto-scroll to active item on mount and route change
	$effect(() => {
		const currentPath = $page.url.pathname;
		requestAnimationFrame(() => {
			const activeItem = navContainer?.querySelector('[data-active="true"]');
			activeItem?.scrollIntoView({ block: 'center', behavior: 'instant' });
		});
	});
</script>

<Sidebar width={220} bind:collapsed>
	<div bind:this={navContainer} class="flex flex-col py-sm">
		<!-- Quick Search -->
		{#if !collapsed}
			<div class="px-sm mb-md">
				<SmartSelect
					options={searchOptions}
					value={searchValue}
					placeholder="Search..."
					size="sm"
					onchange={handleSearchSelect}
				/>
			</div>
		{/if}

		{#each sections as section}
			<div class="mb-md">
				{#if !collapsed}
					<Heading level={3} size="xs" class="uppercase tracking-widest mb-xs px-md text-text-muted">
						{section.title}
					</Heading>
				{/if}
				{#each section.items as item}
					{@const fullHref = item.href === '/' ? (base || '/') : base + item.href}
					{@const active = $page.url.pathname === fullHref}
					{@const Icon = item.icon ?? section.icon}
					<Link href={fullHref} class="block px-sm">
						<ListItem interactive selected={active}>
							{#snippet icon()}
								{#if Icon}
									<Icon size={14} class={active ? 'text-accent-brand' : 'text-text-muted'} />
								{:else}
									<BoxIcon size={14} class={active ? 'text-accent-brand' : 'text-text-muted'} />
								{/if}
							{/snippet}
							{#if !collapsed}
								<Text as="span" size="sm" variant={active ? 'primary' : 'secondary'}>
									{item.label}
								</Text>
							{/if}
						</ListItem>
					</Link>
				{/each}
			</div>
		{/each}
	</div>
</Sidebar>
