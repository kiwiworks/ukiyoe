<script lang="ts">
	import { PageHeader, Text, Badge, Heading, Divider } from 'ukiyoe';

	type ChangeType = 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed' | 'security';

	interface ChangeItem {
		text: string;
		subitems?: string[];
	}

	interface ChangelogEntry {
		version: string;
		date: string;
		badge?: { text: string; variant: 'success' | 'brand' | 'default' };
		description?: string;
		changes: Partial<Record<ChangeType, ChangeItem[]>>;
	}

	const changeTypeConfig: Record<ChangeType, { label: string; color: string }> = {
		added: { label: 'Added', color: 'text-positive' },
		changed: { label: 'Changed', color: 'text-warning' },
		fixed: { label: 'Fixed', color: 'text-info' },
		deprecated: { label: 'Deprecated', color: 'text-text-muted' },
		removed: { label: 'Removed', color: 'text-negative' },
		security: { label: 'Security', color: 'text-negative' }
	};

	const changelog: ChangelogEntry[] = [
		{
			version: '0.2.2',
			date: '2026-01-20',
			badge: { text: 'Latest', variant: 'success' },
			description: 'ContextMenu component and theme system cleanup with Cyan as default accent.',
			changes: {
				added: [
					{
						text: 'ContextMenu component - Right-click contextual menu using bits-ui',
						subitems: [
							'ContextMenu.Root - Wrapper with trigger area and menu content',
							'ContextMenu.Item - Menu item with variants (default/danger) and icon support',
							'ContextMenu.Divider - Separator between item groups',
							'Keyboard navigation, click-outside dismissal, portal rendering'
						]
					}
				],
				changed: [
					{ text: 'Default accent color changed from Orange to Cyan (#06b6d4)' }
				],
				removed: [
					{ text: 'Dead theme.ts file (exported but never used)' },
					{ text: '"Rahapuu Orange" from accent color palette' }
				],
				fixed: [
					{ text: 'Invalid CSS variables: bg-bg-danger, text-text-brand, text-text-danger → semantic equivalents' },
					{ text: 'Semantic CSS variable misuse: text-border-strong, bg-text-muted → proper categories' }
				]
			}
		},
		{
			version: '0.2.1',
			date: '2026-01-20',
			description: 'OpenAPI documentation module with interactive API testing and comprehensive schema visualization.',
			changes: {
				added: [
					{
						text: 'OpenAPI module with comprehensive API documentation components',
						subitems: [
							'OpenApiViewer - Full-featured OpenAPI spec viewer with endpoint navigation',
							'EndpointList - Grouped endpoint navigation sidebar',
							'EndpointDetail - Detailed endpoint documentation view',
							'EndpointTester - Interactive API request testing with parameter forms',
							'ParametersTable - Parameter documentation table',
							'SchemaView - Expandable JSON schema visualization',
							'SchemaForm - Dynamic form generation from JSON schemas',
							'ResponseViewer - API response display with syntax highlighting'
						]
					},
					{ text: 'CodeEditor component - Monaco-style code editor with syntax highlighting' },
					{ text: 'NebulaOverlay enabled prop for manual control over theme store setting' }
				],
				fixed: [
					{ text: 'SchemaView reactivity warning with depth prop capture' },
					{ text: 'DateRangePicker unused today import' },
					{ text: 'Demo a11y warnings in breadcrumb, tooltip, button, error-page, not-found, and backtest-chart pages' }
				]
			}
		},
		{
			version: '0.2.0',
			date: '2026-01-19',
			description: 'Brand identity component with customizable animations and support for custom SVG designs.',
			changes: {
				added: [
					{
						text: 'BrandIcon component for animated brand identity icons',
						subitems: [
							'Calligraphy-inspired default design evoking 浮世絵 (ukiyo-e) aesthetics',
							'Size presets (xs/sm/md/lg/xl) and custom pixel values',
							'Three animations: wave (stroke drawing), pulse (ink spreading), breathe (subtle opacity)',
							'Customizable colors via color and backgroundColor props',
							'CSS variables for custom SVG content (--ukiyoe-color, --ukiyoe-bg, --ukiyoe-duration)',
							'children snippet for fully custom SVG designs',
							'showCircle prop to toggle background circle'
						]
					},
					{ text: 'Theme-adaptive favicon with prefers-color-scheme media query support' }
				],
				changed: [
					{ text: 'Demo header now uses BrandIcon instead of simple indicator dot' },
					{ text: 'Demo BrandIcon page includes interactive speed slider and custom SVG examples' }
				],
				fixed: [
					{ text: 'Form component type errors with partial initial values' },
					{ text: 'Added zod as optional peer dependency for Form validation types' }
				]
			}
		},
		{
			version: '0.1.4',
			date: '2026-01-19',
			changes: {
				added: [
					{
						text: 'SocialButton component for branded social/external links',
						subitems: [
							'Official SVG icons for 8 platforms (GitHub, Twitter, Discord, LinkedIn, npm, YouTube, Mastodon, Bluesky)',
							'Official brand colors from platform guidelines',
							'Platform-specific props: stars/forks (GitHub), members (Discord), downloads/version (npm)',
							'Variants: filled, outline, ghost',
							'Custom badge snippet support'
						]
					}
				],
				changed: [
					{ text: 'Install page redesigned with Ukiyoe components (MetricCard, Stepper, SectionCard)' }
				]
			}
		},
		{
			version: '0.1.3',
			date: '2026-01-19',
			changes: {
				added: [
					{
						text: 'Form compound component with three sub-components',
						subitems: [
							'Form.Root - State management with Zod and custom validation support',
							'Form.Field - Auto-wiring for labels, IDs, aria attributes, and error display',
							'Form.Auto - Data-driven field generation from schema definitions'
						]
					},
					{ text: 'Heading anchor links: id and anchor props for clickable section links' },
					{ text: 'Demo site heading anchors via rehype-slug and rehype-autolink-headings' }
				],
				changed: [
					{ text: 'Demo site now includes Toaster component in layout for toast notifications' }
				],
				fixed: [
					{ text: 'Toaster width: Fixed toast notifications collapsing to zero width' }
				],
				removed: [
					{ text: 'FormField component: Replaced by Form.Field with improved API' }
				]
			}
		},
		{
			version: '0.1.2',
			date: '2026-01-18',
			changes: {
				added: [
					{
						text: 'Markdown component for rendering markdown content in chat messages',
						subitems: [
							'Uses HighlightedCodeBlock for code blocks with copy button and syntax highlighting',
							'Full markdown support: headings, bold/italic, lists, links, blockquotes, tables, horizontal rules',
							'Lexer-based rendering using Svelte components instead of HTML strings'
						]
					}
				]
			}
		},
		{
			version: '0.1.1',
			date: '2026-01-18',
			changes: {
				added: [
					{ text: 'DataTable responsive columns: hideAt prop on Column definitions to hide columns below specific breakpoints (sm/md/lg/xl/2xl)' },
					{ text: 'MetricCard brand variant: Gradient background styling for hero metrics' }
				],
				changed: [
					{
						text: 'Improved documentation discoverability for existing features',
						subitems: [
							'SectionCard: Added collapsible demo (feature existed but wasn\'t showcased)',
							'Button: Dedicated loading state section with spinner examples',
							'ListItem: Updated to clarify clickable card use case'
						]
					}
				]
			}
		},
		{
			version: '0.1.0',
			date: '2026-01-18',
			badge: { text: 'Stable', variant: 'default' },
			description: 'First stable release! Ukiyoe is now production-ready with 70+ components.',
			changes: {
				added: [
					{ text: 'Kbd component for displaying keyboard shortcuts and key combinations' },
					{ text: 'HighlightedCodeBlock component with optional Shiki syntax highlighting (tree-shakeable)' },
					{ text: 'Command palette search button with keyboard shortcut hint in header' }
				],
				changed: [
					{ text: 'Demo routing refactored to shared routes file for single source of truth' },
					{ text: 'Shiki added as optional peer dependency for syntax highlighting' }
				],
				fixed: [
					{ text: 'BacktestChart using incorrect Svelte 5 pattern ($derived vs $derived.by)' },
					{ text: 'ThemeLabModal width constraints' },
					{ text: 'Nav.svelte invalid props on SmartSelect and ListItem' }
				]
			}
		},
		{
			version: '0.1.0-beta.5',
			date: '2026-01-18',
			changes: {
				added: [
					{ text: 'NotFound component for 404 pages with customizable navigation' },
					{ text: 'ErrorPage component with status-specific defaults for common HTTP errors' },
					{ text: 'cn() utility (clsx + tailwind-merge) for intelligent class merging' }
				],
				changed: [
					{ text: 'All components now use cn() utility for className merging' },
					{ text: 'Viz components (Gauge, Sparkline, ProgressRing) updated to follow codebase conventions' }
				],
				fixed: [
					{ text: 'ListItem demo using incorrect API (Components instead of Snippets)' },
					{ text: 'Stepper demo missing icon imports and state variable' },
					{ text: 'Install page template literal parsing errors' }
				]
			}
		},
		{
			version: '0.1.0-beta.4',
			date: '2026-01-17',
			changes: {
				added: [
					{
						text: 'Stepper component for multi-step workflows',
						subitems: [
							'States: pending, active, completed, error',
							'Orientations: horizontal and vertical',
							'Sizes: xs, sm, md, lg',
							'Compact mode (indicators only)',
							'Clickable steps with navigation callbacks',
							'Icon support and optional step markers'
						]
					}
				]
			}
		},
		{
			version: '0.1.0-beta.3',
			date: '2026-01-16',
			changes: {
				added: [
					{ text: 'Export HeaderSize and HeaderProps types' }
				],
				changed: [
					{ text: 'Header enhancements: size prop (sm/md/lg), fixed prop, showIndicator prop, icon snippet' },
					{
						text: 'Tailwind refactoring - 18 components converted from style blocks to pure Tailwind',
						subitems: [
							'Core: Breadcrumb, Ip, ListItem, RandomName, RefreshControl, SidePanel, Widget',
							'Layout: Panel, Sidebar, StatusBar',
							'Viz: BacktestChart, EquityChart',
							'Effects: DelaunayBackground, GridPulseBackground, IsometricGridBackground, NebulaOverlay, ParticleFlowBackground, SupernovaBackground'
						]
					}
				]
			}
		},
		{
			version: '0.1.0-beta.2',
			date: '2025-01-16',
			changes: {
				fixed: [
					{ text: 'ActionMenu positioning and z-index issues (migrated to bits-ui DropdownMenu with Portal)' },
					{ text: 'SmartSelect dropdown not opening on click/focus' },
					{ text: 'Missing \'xs\' size in Input, Textarea, and RadioGroup iconSizes' },
					{ text: 'DataTable Svelte 5 reactivity warnings' }
				],
				changed: [
					{ text: 'ActionMenu now uses bits-ui DropdownMenu for proper positioning' },
					{ text: 'MenuItem uses DropdownMenu.Item, MenuDivider uses DropdownMenu.Separator' },
					{ text: 'Demo pages use toast notifications instead of browser alerts' }
				]
			}
		},
		{
			version: '0.1.0-beta.1',
			date: '2025-01-16',
			changes: {
				added: [
					{
						text: 'Agentic components for conversational AI interfaces',
						subitems: [
							'Message - Role-based message bubbles (user/assistant/system)',
							'StreamingText - Animated text reveal with cursor',
							'ThinkingIndicator - Activity status indicator',
							'AgentInput - Enhanced textarea with attachments',
							'MessageList - Auto-scrolling container'
						]
					},
					{ text: 'SmartSelect component with filtering, highlight matching, and scroll indicators' },
					{ text: 'DateRangePicker component with modifier support' },
					{ text: 'Loading state support for form components' },
					{ text: 'Unit tests for core components' },
					{ text: 'ARIA attributes for interactive components' },
					{ text: 'GitHub Pages demo site' }
				],
				changed: [
					{ text: 'Standardized size scale across all components (xs/sm/md/lg)' },
					{ text: 'Standardized variant naming across feedback components' },
					{ text: 'Aligned color token naming convention in theme system' },
					{ text: 'Standardized z-index system with theme variables' }
				],
				fixed: [
					{ text: 'SmartSelect filtering reactivity' },
					{ text: 'Select scroll behavior with scroll indicators' },
					{ text: 'Layout component prop type exports' }
				]
			}
		},
		{
			version: '0.0.1',
			date: '2025-01-04',
			description: 'Initial release with core component library.',
			changes: {
				added: [
					{ text: 'Core: Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider' },
					{ text: 'Data Display: Badge, StatusBadge, Numeric, MetricCard, DataTable' },
					{ text: 'Typography: Text, Heading, Link, CodeBlock, Divider' },
					{ text: 'Layout: PageHeader, Widget, Modal, SidePanel, Tabs, Accordion' },
					{ text: 'Feedback: Alert, Toast, Tooltip, Popover, ProgressBar, Skeleton' },
					{ text: 'Visualization: Sparkline, Gauge, ProgressRing, EquityChart' },
					{ text: 'Effects: GridPulse, Delaunay, Isometric, ParticleFlow, Supernova backgrounds' },
					{ text: 'Theme system with CSS variables and Tailwind v4 preset' },
					{ text: 'Dark-first design with light mode support' }
				]
			}
		}
	];

	const latestVersion = changelog[0].version;
</script>

<svelte:head>
	<title>Changelog - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Changelog" subtitle="All notable changes to this project">
	{#snippet badges()}
		<Badge size="sm" variant="brand" text="v{latestVersion}" />
	{/snippet}
</PageHeader>

<div class="mt-lg flex flex-col gap-xl">
	{#each changelog as entry, idx}
		<section>
			<div class="flex items-center gap-md mb-md">
				<Heading level={2} size="lg" id="v{entry.version}" anchor>{entry.version}</Heading>
				{#if entry.badge}
					<Badge size="xs" variant={entry.badge.variant} text={entry.badge.text} />
				{/if}
				<Text size="sm" variant="muted">{entry.date}</Text>
			</div>

			{#if entry.description}
				<Text variant="secondary" class="mb-md">{entry.description}</Text>
			{/if}

			<div class="flex flex-col gap-lg">
				{#each Object.entries(entry.changes) as [type, items]}
					{@const config = changeTypeConfig[type as ChangeType]}
					<div>
						<Heading level={3} size="md" class="{config.color} mb-sm">{config.label}</Heading>
						<ul class="list-disc list-inside text-sm text-text-secondary flex flex-col gap-xs">
							{#each items as item}
								<li>
									{item.text}
									{#if item.subitems}
										<ul class="list-disc list-inside ml-lg mt-xs flex flex-col gap-xs">
											{#each item.subitems as subitem}
												<li>{subitem}</li>
											{/each}
										</ul>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>

		{#if idx < changelog.length - 1}
			<Divider />
		{/if}
	{/each}
</div>
