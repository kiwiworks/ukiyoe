<script lang="ts">
	import '../app.css';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Badge, Header, ThemeProvider, ThemeToggle, CommandPalette, type CommandItem } from 'ukiyoe';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	import {
		Home,
		Download,
		History,
		MousePointer2,
		FormInput,
		LayoutGrid,
		Type,
		Box,
		Navigation,
		Layers,
		MessageSquare,
		Wrench,
		Bot,
		BarChart3,
		Sparkles,
		Palette
	} from '@lucide/svelte';
	import Nav from '$lib/Nav.svelte';

	let commandPaletteOpen = $state(false);

	const commandItems: CommandItem[] = [
		// Getting Started
		{ id: 'home', label: 'Introduction', group: 'Getting Started', icon: Home, href: '/' },
		{ id: 'install', label: 'Installation', group: 'Getting Started', icon: Download, href: '/docs/install' },
		{ id: 'changelog', label: 'Changelog', group: 'Getting Started', icon: History, href: '/changelog' },
		// Actions
		{ id: 'button', label: 'Button', group: 'Actions', icon: MousePointer2, href: '/components/button' },
		{ id: 'button-group', label: 'ButtonGroup', group: 'Actions', icon: MousePointer2, href: '/components/button-group' },
		{ id: 'action-menu', label: 'ActionMenu', group: 'Actions', icon: MousePointer2, href: '/components/action-menu' },
		// Forms
		{ id: 'input', label: 'Input', group: 'Forms', icon: FormInput, href: '/components/input' },
		{ id: 'textarea', label: 'Textarea', group: 'Forms', icon: FormInput, href: '/components/textarea' },
		{ id: 'select', label: 'Select', group: 'Forms', icon: FormInput, href: '/components/select' },
		{ id: 'smart-select', label: 'SmartSelect', group: 'Forms', icon: FormInput, href: '/components/smart-select' },
		{ id: 'checkbox', label: 'Checkbox', group: 'Forms', icon: FormInput, href: '/components/checkbox' },
		{ id: 'switch', label: 'Switch', group: 'Forms', icon: FormInput, href: '/components/switch' },
		{ id: 'radio-group', label: 'RadioGroup', group: 'Forms', icon: FormInput, href: '/components/radio-group' },
		{ id: 'slider', label: 'Slider', group: 'Forms', icon: FormInput, href: '/components/slider' },
		{ id: 'form-field', label: 'FormField', group: 'Forms', icon: FormInput, href: '/components/form-field' },
		{ id: 'date-range-picker', label: 'DateRangePicker', group: 'Forms', icon: FormInput, href: '/components/date-range-picker' },
		// Data
		{ id: 'badge', label: 'Badge', group: 'Data', icon: LayoutGrid, href: '/components/badge' },
		{ id: 'status-badge', label: 'StatusBadge', group: 'Data', icon: LayoutGrid, href: '/components/status-badge' },
		{ id: 'numeric', label: 'Numeric', group: 'Data', icon: LayoutGrid, href: '/components/numeric' },
		{ id: 'ip', label: 'Ip', group: 'Data', icon: LayoutGrid, href: '/components/ip' },
		{ id: 'data-table', label: 'DataTable', group: 'Data', icon: LayoutGrid, href: '/components/data-table' },
		{ id: 'stats-grid', label: 'StatsGrid', group: 'Data', icon: LayoutGrid, href: '/components/stats-grid' },
		{ id: 'metric-card', label: 'MetricCard', group: 'Data', icon: LayoutGrid, href: '/components/metric-card' },
		// Typography
		{ id: 'text', label: 'Text', group: 'Typography', icon: Type, href: '/components/text' },
		{ id: 'heading', label: 'Heading', group: 'Typography', icon: Type, href: '/components/heading' },
		{ id: 'link', label: 'Link', group: 'Typography', icon: Type, href: '/components/link' },
		{ id: 'code-block', label: 'CodeBlock', group: 'Typography', icon: Type, href: '/components/code-block' },
		{ id: 'divider', label: 'Divider', group: 'Typography', icon: Type, href: '/components/divider' },
		// Containers
		{ id: 'widget', label: 'Widget', group: 'Containers', icon: Box, href: '/components/widget' },
		{ id: 'section-card', label: 'SectionCard', group: 'Containers', icon: Box, href: '/components/section-card' },
		{ id: 'panel', label: 'Panel', group: 'Containers', icon: Box, href: '/components/panel' },
		{ id: 'page-header', label: 'PageHeader', group: 'Containers', icon: Box, href: '/components/page-header' },
		{ id: 'stack', label: 'Stack', group: 'Containers', icon: Box, href: '/components/stack' },
		{ id: 'grid', label: 'Grid', group: 'Containers', icon: Box, href: '/components/grid' },
		// Navigation
		{ id: 'tabs', label: 'Tabs', group: 'Navigation', icon: Navigation, href: '/components/tabs' },
		{ id: 'accordion', label: 'Accordion', group: 'Navigation', icon: Navigation, href: '/components/accordion' },
		{ id: 'stepper', label: 'Stepper', group: 'Navigation', icon: Navigation, href: '/components/stepper' },
		{ id: 'breadcrumb', label: 'Breadcrumb', group: 'Navigation', icon: Navigation, href: '/components/breadcrumb' },
		{ id: 'list-item', label: 'ListItem', group: 'Navigation', icon: Navigation, href: '/components/list-item' },
		{ id: 'sidebar', label: 'Sidebar', group: 'Navigation', icon: Navigation, href: '/components/sidebar' },
		{ id: 'header', label: 'Header', group: 'Navigation', icon: Navigation, href: '/components/header' },
		{ id: 'status-bar', label: 'StatusBar', group: 'Navigation', icon: Navigation, href: '/components/status-bar' },
		// Overlays
		{ id: 'modal', label: 'Modal', group: 'Overlays', icon: Layers, href: '/components/modal' },
		{ id: 'side-panel', label: 'SidePanel', group: 'Overlays', icon: Layers, href: '/components/side-panel' },
		{ id: 'command-palette', label: 'CommandPalette', group: 'Overlays', icon: Layers, href: '/components/command-palette', shortcut: '⌘K' },
		{ id: 'tooltip', label: 'Tooltip', group: 'Overlays', icon: Layers, href: '/components/tooltip' },
		{ id: 'popover', label: 'Popover', group: 'Overlays', icon: Layers, href: '/components/popover' },
		// Feedback
		{ id: 'alert', label: 'Alert', group: 'Feedback', icon: MessageSquare, href: '/components/alert' },
		{ id: 'toast', label: 'Toast', group: 'Feedback', icon: MessageSquare, href: '/components/toast' },
		{ id: 'progress-bar', label: 'ProgressBar', group: 'Feedback', icon: MessageSquare, href: '/components/progress-bar' },
		{ id: 'skeleton', label: 'Skeleton', group: 'Feedback', icon: MessageSquare, href: '/components/skeleton' },
		{ id: 'empty-state', label: 'EmptyState', group: 'Feedback', icon: MessageSquare, href: '/components/empty-state' },
		{ id: 'not-found', label: 'NotFound', group: 'Feedback', icon: MessageSquare, href: '/components/not-found' },
		{ id: 'error-page', label: 'ErrorPage', group: 'Feedback', icon: MessageSquare, href: '/components/error-page' },
		// Utilities
		{ id: 'privacy-toggle', label: 'PrivacyToggle', group: 'Utilities', icon: Wrench, href: '/components/privacy-toggle' },
		{ id: 'refresh-control', label: 'RefreshControl', group: 'Utilities', icon: Wrench, href: '/components/refresh-control' },
		{ id: 'mandelbrot-avatar', label: 'MandelbrotAvatar', group: 'Utilities', icon: Wrench, href: '/components/mandelbrot-avatar' },
		{ id: 'asset-icon', label: 'AssetIcon', group: 'Utilities', icon: Wrench, href: '/components/asset-icon' },
		{ id: 'random-name', label: 'RandomName', group: 'Utilities', icon: Wrench, href: '/components/random-name' },
		// Agentic
		{ id: 'message', label: 'Message', group: 'Agentic', icon: Bot, href: '/components/message' },
		{ id: 'streaming-text', label: 'StreamingText', group: 'Agentic', icon: Bot, href: '/components/streaming-text' },
		{ id: 'thinking-indicator', label: 'ThinkingIndicator', group: 'Agentic', icon: Bot, href: '/components/thinking-indicator' },
		{ id: 'agent-input', label: 'AgentInput', group: 'Agentic', icon: Bot, href: '/components/agent-input' },
		{ id: 'message-list', label: 'MessageList', group: 'Agentic', icon: Bot, href: '/components/message-list' },
		// Charts
		{ id: 'sparkline', label: 'Sparkline', group: 'Charts', icon: BarChart3, href: '/components/sparkline' },
		{ id: 'gauge', label: 'Gauge', group: 'Charts', icon: BarChart3, href: '/components/gauge' },
		{ id: 'progress-ring', label: 'ProgressRing', group: 'Charts', icon: BarChart3, href: '/components/progress-ring' },
		{ id: 'equity-chart', label: 'EquityChart', group: 'Charts', icon: BarChart3, href: '/components/equity-chart' },
		{ id: 'backtest-chart', label: 'BacktestChart', group: 'Charts', icon: BarChart3, href: '/components/backtest-chart' },
		// Effects
		{ id: 'grid-pulse', label: 'GridPulseBackground', group: 'Effects', icon: Sparkles, href: '/components/grid-pulse-background' },
		{ id: 'delaunay', label: 'DelaunayBackground', group: 'Effects', icon: Sparkles, href: '/components/delaunay-background' },
		{ id: 'isometric', label: 'IsometricGridBackground', group: 'Effects', icon: Sparkles, href: '/components/isometric-grid-background' },
		{ id: 'particle', label: 'ParticleFlowBackground', group: 'Effects', icon: Sparkles, href: '/components/particle-flow-background' },
		{ id: 'supernova', label: 'SupernovaBackground', group: 'Effects', icon: Sparkles, href: '/components/supernova-background' },
		{ id: 'nebula', label: 'NebulaOverlay', group: 'Effects', icon: Sparkles, href: '/components/nebula-overlay' },
		// Customization
		{ id: 'theme-lab', label: 'Theme Lab', group: 'Customization', icon: Palette, href: '/theme' }
	];

	function handleCommandSelect(item: CommandItem) {
		if (item.href) {
			const fullHref = item.href === '/' ? (base || '/') : base + item.href;
			goto(fullHref);
		}
	}
</script>

<ThemeProvider>
	<div class="h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden">
		<Header title="Ukiyoe UI" subtitle="Component Library" size="lg" fixed={false}>
			<ThemeToggle size="sm" />
			<Badge size="xs" variant="brand" text="Beta" />
		</Header>

		<div class="flex flex-1 overflow-hidden">
			<Nav />
			<main class="flex-1 overflow-y-auto p-lg">
				{@render children()}
			</main>
		</div>
	</div>

	<CommandPalette
		bind:open={commandPaletteOpen}
		items={commandItems}
		placeholder="Search components..."
		onSelect={handleCommandSelect}
	/>
</ThemeProvider>
