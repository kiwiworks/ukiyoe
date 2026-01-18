<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { ListItem, Sidebar, Heading, Text, Link, SmartSelect, type SmartSelectOption } from 'ukiyoe';
	import {
		Home,
		Download,
		History,
		MousePointer2,
		FormInput,
		LayoutGrid,
		Type,
		Box as BoxIcon,
		Navigation,
		Layers,
		MessageSquare,
		Wrench,
		Bot,
		BarChart3,
		Sparkles,
		Palette,
		Search
	} from '@lucide/svelte';
	import type { Component } from 'svelte';

	interface NavItem {
		label: string;
		href: string;
		icon?: Component;
	}

	interface NavSection {
		title: string;
		icon?: Component;
		items: NavItem[];
	}

	const sections: NavSection[] = [
		{
			title: 'Getting Started',
			items: [
				{ label: 'Introduction', href: '/', icon: Home },
				{ label: 'Installation', href: '/docs/install', icon: Download },
				{ label: 'Changelog', href: '/changelog', icon: History }
			]
		},
		{
			title: 'Actions',
			icon: MousePointer2,
			items: [
				{ label: 'Button', href: '/components/button' },
				{ label: 'ButtonGroup', href: '/components/button-group' },
				{ label: 'ActionMenu', href: '/components/action-menu' }
			]
		},
		{
			title: 'Forms',
			icon: FormInput,
			items: [
				{ label: 'Input', href: '/components/input' },
				{ label: 'Textarea', href: '/components/textarea' },
				{ label: 'Select', href: '/components/select' },
				{ label: 'SmartSelect', href: '/components/smart-select' },
				{ label: 'Checkbox', href: '/components/checkbox' },
				{ label: 'Switch', href: '/components/switch' },
				{ label: 'RadioGroup', href: '/components/radio-group' },
				{ label: 'Slider', href: '/components/slider' },
				{ label: 'FormField', href: '/components/form-field' },
				{ label: 'DateRangePicker', href: '/components/date-range-picker' }
			]
		},
		{
			title: 'Data',
			icon: LayoutGrid,
			items: [
				{ label: 'Badge', href: '/components/badge' },
				{ label: 'StatusBadge', href: '/components/status-badge' },
				{ label: 'Numeric', href: '/components/numeric' },
				{ label: 'Ip', href: '/components/ip' },
				{ label: 'DataTable', href: '/components/data-table' },
				{ label: 'StatsGrid', href: '/components/stats-grid' },
				{ label: 'MetricCard', href: '/components/metric-card' }
			]
		},
		{
			title: 'Typography',
			icon: Type,
			items: [
				{ label: 'Text', href: '/components/text' },
				{ label: 'Heading', href: '/components/heading' },
				{ label: 'Link', href: '/components/link' },
				{ label: 'CodeBlock', href: '/components/code-block' },
				{ label: 'Divider', href: '/components/divider' }
			]
		},
		{
			title: 'Containers',
			icon: BoxIcon,
			items: [
				{ label: 'Widget', href: '/components/widget' },
				{ label: 'SectionCard', href: '/components/section-card' },
				{ label: 'Panel', href: '/components/panel' },
				{ label: 'PageHeader', href: '/components/page-header' },
				{ label: 'Stack', href: '/components/stack' },
				{ label: 'Grid', href: '/components/grid' }
			]
		},
		{
			title: 'Navigation',
			icon: Navigation,
			items: [
				{ label: 'Tabs', href: '/components/tabs' },
				{ label: 'Accordion', href: '/components/accordion' },
				{ label: 'Stepper', href: '/components/stepper' },
				{ label: 'Breadcrumb', href: '/components/breadcrumb' },
				{ label: 'ListItem', href: '/components/list-item' },
				{ label: 'Sidebar', href: '/components/sidebar' },
				{ label: 'Header', href: '/components/header' },
				{ label: 'StatusBar', href: '/components/status-bar' }
			]
		},
		{
			title: 'Overlays',
			icon: Layers,
			items: [
				{ label: 'Modal', href: '/components/modal' },
				{ label: 'SidePanel', href: '/components/side-panel' },
				{ label: 'CommandPalette', href: '/components/command-palette' },
				{ label: 'Tooltip', href: '/components/tooltip' },
				{ label: 'Popover', href: '/components/popover' }
			]
		},
		{
			title: 'Feedback',
			icon: MessageSquare,
			items: [
				{ label: 'Alert', href: '/components/alert' },
				{ label: 'Toast', href: '/components/toast' },
				{ label: 'ProgressBar', href: '/components/progress-bar' },
				{ label: 'Skeleton', href: '/components/skeleton' },
				{ label: 'EmptyState', href: '/components/empty-state' },
				{ label: 'NotFound', href: '/components/not-found' },
				{ label: 'ErrorPage', href: '/components/error-page' }
			]
		},
		{
			title: 'Utilities',
			icon: Wrench,
			items: [
				{ label: 'PrivacyToggle', href: '/components/privacy-toggle' },
				{ label: 'RefreshControl', href: '/components/refresh-control' },
				{ label: 'MandelbrotAvatar', href: '/components/mandelbrot-avatar' },
				{ label: 'AssetIcon', href: '/components/asset-icon' },
				{ label: 'RandomName', href: '/components/random-name' }
			]
		},
		{
			title: 'Agentic',
			icon: Bot,
			items: [
				{ label: 'Message', href: '/components/message' },
				{ label: 'StreamingText', href: '/components/streaming-text' },
				{ label: 'ThinkingIndicator', href: '/components/thinking-indicator' },
				{ label: 'AgentInput', href: '/components/agent-input' },
				{ label: 'MessageList', href: '/components/message-list' }
			]
		},
		{
			title: 'Charts',
			icon: BarChart3,
			items: [
				{ label: 'Sparkline', href: '/components/sparkline' },
				{ label: 'Gauge', href: '/components/gauge' },
				{ label: 'ProgressRing', href: '/components/progress-ring' },
				{ label: 'EquityChart', href: '/components/equity-chart' },
				{ label: 'BacktestChart', href: '/components/backtest-chart' }
			]
		},
		{
			title: 'Effects',
			icon: Sparkles,
			items: [
				{ label: 'GridPulseBackground', href: '/components/grid-pulse-background' },
				{ label: 'DelaunayBackground', href: '/components/delaunay-background' },
				{ label: 'IsometricGridBackground', href: '/components/isometric-grid-background' },
				{ label: 'ParticleFlowBackground', href: '/components/particle-flow-background' },
				{ label: 'SupernovaBackground', href: '/components/supernova-background' },
				{ label: 'NebulaOverlay', href: '/components/nebula-overlay' }
			]
		},
		{
			title: 'Customization',
			items: [{ label: 'Theme Lab', href: '/theme', icon: Palette }]
		}
	];

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
				>
					{#snippet prefix()}
						<Search size={14} class="text-text-muted" />
					{/snippet}
				</SmartSelect>
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
						<ListItem interactive selected={active} data-active={active}>
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
