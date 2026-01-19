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
	Sparkles
} from '@lucide/svelte';
import type { Component } from 'svelte';
import type { CommandItem } from 'ukiyoe';

export interface NavItem {
	label: string;
	href: string;
	icon?: Component;
	shortcut?: string;
}

export interface NavSection {
	title: string;
	icon?: Component;
	items: NavItem[];
}

export const sections: NavSection[] = [
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
			{ label: 'SocialButton', href: '/components/social-button' },
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
			{ label: 'Form', href: '/components/form' },
			{ label: 'DateRangePicker', href: '/components/date-range-picker' }
		]
	},
	{
		title: 'Data',
		icon: LayoutGrid,
		items: [
			{ label: 'Badge', href: '/components/badge' },
			{ label: 'StatusBadge', href: '/components/status-badge' },
			{ label: 'Kbd', href: '/components/kbd' },
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
			{ label: 'HighlightedCodeBlock', href: '/components/highlighted-code-block' },
			{ label: 'Divider', href: '/components/divider' }
		]
	},
	{
		title: 'Containers',
		icon: Box,
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
			{ label: 'ThemeLabModal', href: '/components/theme-lab-modal' },
			{ label: 'SidePanel', href: '/components/side-panel' },
			{ label: 'CommandPalette', href: '/components/command-palette', shortcut: '⌘K' },
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
			{ label: 'BrandIcon', href: '/components/brand-icon' },
			{ label: 'Meta', href: '/components/meta' },
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
			{ label: 'Markdown', href: '/components/markdown' },
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
	}
];

// Convert sections to CommandItem format for command palette
export function getCommandItems(): CommandItem[] {
	return sections.flatMap((section) =>
		section.items.map((item) => ({
			id: item.href.replace(/\//g, '-').replace(/^-/, ''),
			label: item.label,
			group: section.title,
			icon: item.icon ?? section.icon,
			href: item.href,
			shortcut: item.shortcut
		}))
	);
}
