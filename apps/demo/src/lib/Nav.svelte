<script lang="ts">
	import { page } from '$app/stores';
	import { ListItem, Sidebar, Heading, Text, Link } from 'ukiyoe';
	import {
		Home,
		Download,
		MousePointer2,
		FormInput,
		LayoutGrid,
		Layers,
		MessageSquare,
		BarChart3,
		Sparkles,
		Palette,
		Type,
		Box
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
			title: 'Start',
			items: [
				{ label: 'Introduction', href: '/', icon: Home },
				{ label: 'Installation', href: '/docs/install', icon: Download }
			]
		},
		{
			title: 'Buttons',
			icon: MousePointer2,
			items: [
				{ label: 'Button', href: '/components/button' },
				{ label: 'ButtonGroup', href: '/components/button-group' },
				{ label: 'ActionMenu', href: '/components/action-menu' }
			]
		},
		{
			title: 'Inputs',
			icon: FormInput,
			items: [
				{ label: 'Input', href: '/components/input' },
				{ label: 'Textarea', href: '/components/textarea' },
				{ label: 'Select', href: '/components/select' },
				{ label: 'Checkbox', href: '/components/checkbox' },
				{ label: 'Switch', href: '/components/switch' },
				{ label: 'RadioGroup', href: '/components/radio-group' },
				{ label: 'Slider', href: '/components/slider' },
				{ label: 'FormField', href: '/components/form-field' }
			]
		},
		{
			title: 'Data Display',
			icon: LayoutGrid,
			items: [
				{ label: 'Badge', href: '/components/badge' },
				{ label: 'StatusBadge', href: '/components/status-badge' },
				{ label: 'Numeric', href: '/components/numeric' },
				{ label: 'Ip', href: '/components/ip' },
				{ label: 'MetricCard', href: '/components/metric-card' },
				{ label: 'DataTable', href: '/components/data-table' },
				{ label: 'StatsGrid', href: '/components/stats-grid' }
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
			title: 'Layout',
			icon: Layers,
			items: [
				{ label: 'PageHeader', href: '/components/page-header' },
				{ label: 'Widget', href: '/components/widget' },
				{ label: 'SectionCard', href: '/components/section-card' },
				{ label: 'Panel', href: '/components/panel' },
				{ label: 'Modal', href: '/components/modal' },
				{ label: 'SidePanel', href: '/components/side-panel' },
				{ label: 'Tabs', href: '/components/tabs' },
				{ label: 'Accordion', href: '/components/accordion' },
				{ label: 'EmptyState', href: '/components/empty-state' },
				{ label: 'Breadcrumb', href: '/components/breadcrumb' },
				{ label: 'ListItem', href: '/components/list-item' },
				{ label: 'Header', href: '/components/header' },
				{ label: 'Sidebar', href: '/components/sidebar' },
				{ label: 'StatusBar', href: '/components/status-bar' }
			]
		},
		{
			title: 'Feedback',
			icon: MessageSquare,
			items: [
				{ label: 'Alert', href: '/components/alert' },
				{ label: 'Toast', href: '/components/toast' },
				{ label: 'Tooltip', href: '/components/tooltip' },
				{ label: 'Popover', href: '/components/popover' },
				{ label: 'ProgressBar', href: '/components/progress-bar' },
				{ label: 'Skeleton', href: '/components/skeleton' },
				{ label: 'PrivacyToggle', href: '/components/privacy-toggle' },
				{ label: 'RefreshControl', href: '/components/refresh-control' },
				{ label: 'MandelbrotAvatar', href: '/components/mandelbrot-avatar' },
				{ label: 'AssetIcon', href: '/components/asset-icon' },
				{ label: 'RandomName', href: '/components/random-name' }
			]
		},
		{
			title: 'Visualization',
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
</script>

<Sidebar width={220} bind:collapsed>
	<div class="flex flex-col h-full py-sm overflow-y-auto">
		{#each sections as section}
			<div class="mb-md">
				{#if !collapsed}
					<Heading level={3} size="xs" class="uppercase tracking-widest mb-xs px-md text-text-muted">
						{section.title}
					</Heading>
				{/if}
				{#each section.items as item}
					{@const active = $page.url.pathname === item.href}
					{@const Icon = item.icon ?? section.icon}
					<Link href={item.href} class="block px-sm">
						<ListItem interactive selected={active}>
							{#snippet icon()}
								{#if Icon}
									<Icon size={14} class={active ? 'text-accent-brand' : 'text-text-muted'} />
								{:else}
									<Box size={14} class={active ? 'text-accent-brand' : 'text-text-muted'} />
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
