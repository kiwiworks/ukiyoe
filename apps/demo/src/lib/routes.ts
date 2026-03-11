import { Home, Download, History, MousePointer2, FormInput, LayoutGrid, Type, Box, Navigation, Layers, MessageSquare, Wrench, Bot, BarChart3, Sparkles, FileCode, AppWindow
} from '@lucide/svelte';
import type { Component } from 'svelte';
import type { CommandItem } from 'ukiyoe/core';

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
	/** If true, section is always expanded and never collapsible */
	pinned?: boolean;
}

export const sections: NavSection[] = [
	{
		title: 'Getting Started',
		pinned: true,
		items: [
			{ label: 'Introduction', href: '/', icon: Home },
			{ label: 'Installation', href: '/docs/install', icon: Download },
			{ label: 'Changelog', href: '/changelog', icon: History }
		]
	},
	{
		title: 'Examples',
		icon: AppWindow,
		items: [
			{ label: 'API Explorer', href: '/examples/api-explorer' },
			{ label: 'Chat Interface', href: '/examples/chat' },
			{ label: 'Dashboard', href: '/examples/dashboard' },
			{ label: 'Settings', href: '/examples/settings' }
		]
	},
	{
		title: 'Actions',
		icon: MousePointer2,
		items: [
			{ label: 'ActionMenu', href: '/components/action-menu' },
			{ label: 'Button', href: '/components/button' },
			{ label: 'ButtonGroup', href: '/components/button-group' },
			{ label: 'Chip', href: '/components/chip' },
			{ label: 'ChipGroup', href: '/components/chip-group' },
			{ label: 'ContextMenu', href: '/components/context-menu' },
			{ label: 'CopyButton', href: '/components/copy-button' },
			{ label: 'SocialButton', href: '/components/social-button' }
		]
	},
	{
		title: 'Forms',
		icon: FormInput,
		items: [
			{ label: 'Checkbox', href: '/components/checkbox' },
			{ label: 'DateRangePicker', href: '/components/date-range-picker' },
			{ label: 'Form', href: '/components/form' },
			{ label: 'Input', href: '/components/input' },
			{ label: 'RadioGroup', href: '/components/radio-group' },
			{ label: 'Select', href: '/components/select' },
			{ label: 'Slider', href: '/components/slider' },
			{ label: 'SmartSelect', href: '/components/smart-select' },
			{ label: 'Switch', href: '/components/switch' },
			{ label: 'Textarea', href: '/components/textarea' }
		]
	},
	{
		title: 'Data',
		icon: LayoutGrid,
		items: [
			{ label: 'Badge', href: '/components/badge' },
			{ label: 'DataTable', href: '/components/data-table' },
			{ label: 'DescriptionList', href: '/components/description-list' },
			{ label: 'Ip', href: '/components/ip' },
			{ label: 'Kbd', href: '/components/kbd' },
			{ label: 'MetricCard', href: '/components/metric-card' },
			{ label: 'Numeric', href: '/components/numeric' },
			{ label: 'StatsGrid', href: '/components/stats-grid' },
			{ label: 'StatusBadge', href: '/components/status-badge' }
		]
	},
	{
		title: 'Typography',
		icon: Type,
		items: [
			{ label: 'CodeBlock', href: '/components/code-block' },
			{ label: 'Divider', href: '/components/divider' },
			{ label: 'Heading', href: '/components/heading' },
			{ label: 'HighlightedCodeBlock', href: '/components/highlighted-code-block' },
			{ label: 'Link', href: '/components/link' },
			{ label: 'Text', href: '/components/text' }
		]
	},
	{
		title: 'Containers',
		icon: Box,
		items: [
			{ label: 'Grid', href: '/components/grid' },
			{ label: 'PageHeader', href: '/components/page-header' },
			{ label: 'Panel', href: '/components/panel' },
			{ label: 'SectionCard', href: '/components/section-card' },
			{ label: 'Stack', href: '/components/stack' },
			{ label: 'Widget', href: '/components/widget' }
		]
	},
	{
		title: 'Navigation',
		icon: Navigation,
		items: [
			{ label: 'Accordion', href: '/components/accordion' },
			{ label: 'Breadcrumb', href: '/components/breadcrumb' },
			{ label: 'Header', href: '/components/header' },
			{ label: 'ListItem', href: '/components/list-item' },
			{ label: 'Sidebar', href: '/components/sidebar' },
			{ label: 'StatusBar', href: '/components/status-bar' },
			{ label: 'Stepper', href: '/components/stepper' },
			{ label: 'Tabs', href: '/components/tabs' }
		]
	},
	{
		title: 'Overlays',
		icon: Layers,
		items: [
			{ label: 'AlertDialog', href: '/components/alert-dialog' },
			{ label: 'BottomSheet', href: '/components/bottom-sheet' },
			{ label: 'CommandPalette', href: '/components/command-palette', shortcut: '⌘K' },
			{ label: 'Modal', href: '/components/modal' },
			{ label: 'Popover', href: '/components/popover' },
			{ label: 'SidePanel', href: '/components/side-panel' },
			{ label: 'ThemeLabModal', href: '/components/theme-lab-modal' },
			{ label: 'Tooltip', href: '/components/tooltip' }
		]
	},
	{
		title: 'Feedback',
		icon: MessageSquare,
		items: [
			{ label: 'Alert', href: '/components/alert' },
			{ label: 'EmptyState', href: '/components/empty-state' },
			{ label: 'ErrorPage', href: '/components/error-page' },
			{ label: 'NotFound', href: '/components/not-found' },
			{ label: 'ProgressBar', href: '/components/progress-bar' },
			{ label: 'Skeleton', href: '/components/skeleton' },
			{ label: 'Toast', href: '/components/toast' }
		]
	},
	{
		title: 'Utilities',
		icon: Wrench,
		items: [
			{ label: 'AssetIcon', href: '/components/asset-icon' },
			{ label: 'BrandIcon', href: '/components/brand-icon' },
			{ label: 'MandelbrotAvatar', href: '/components/mandelbrot-avatar' },
			{ label: 'Meta', href: '/components/meta' },
			{ label: 'PrivacyToggle', href: '/components/privacy-toggle' },
			{ label: 'RandomName', href: '/components/random-name' },
			{ label: 'RefreshControl', href: '/components/refresh-control' }
		]
	},
	{
		title: 'Agentic',
		icon: Bot,
		items: [
			{ label: 'AgentInput', href: '/components/agent-input' },
			{ label: 'AgentTask', href: '/components/agent-task' },
			{ label: 'Disclosure', href: '/components/disclosure' },
			{ label: 'Markdown', href: '/components/markdown' },
			{ label: 'Message', href: '/components/message' },
			{ label: 'MessageList', href: '/components/message-list' },
			{ label: 'ReasoningTrace', href: '/components/reasoning-trace' },
			{ label: 'StreamingText', href: '/components/streaming-text' },
			{ label: 'ThinkingIndicator', href: '/components/thinking-indicator' },
			{ label: 'ToolCallDisplay', href: '/components/tool-call-display' },
			{ label: 'ToolCallGroup', href: '/components/tool-call-group' },
			{ label: 'UsageDisplay', href: '/components/usage-display' }
		]
	},
	{
		title: 'Charts',
		icon: BarChart3,
		items: [
			{ label: 'BacktestChart', href: '/components/backtest-chart' },
			{ label: 'EquityChart', href: '/components/equity-chart' },
			{ label: 'Gauge', href: '/components/gauge' },
			{ label: 'ProgressRing', href: '/components/progress-ring' },
			{ label: 'Sparkline', href: '/components/sparkline' }
		]
	},
	{
		title: 'Effects',
		icon: Sparkles,
		items: [
			{ label: 'DelaunayBackground', href: '/components/delaunay-background' },
			{ label: 'GridPulseBackground', href: '/components/grid-pulse-background' },
			{ label: 'IsometricGridBackground', href: '/components/isometric-grid-background' },
			{ label: 'NebulaOverlay', href: '/components/nebula-overlay' },
			{ label: 'ParticleFlowBackground', href: '/components/particle-flow-background' },
			{ label: 'SupernovaBackground', href: '/components/supernova-background' }
		]
	},
	{
		title: 'OpenAPI',
		icon: FileCode,
		items: [
			{ label: 'EndpointDetail', href: '/components/endpoint-detail' },
			{ label: 'EndpointList', href: '/components/endpoint-list' },
			{ label: 'OpenApiViewer', href: '/tools/openapi' },
			{ label: 'ParametersTable', href: '/components/parameters-table' },
			{ label: 'SchemaView', href: '/components/schema-view' }
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
