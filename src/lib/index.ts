// Theme utilities
export { theme, themeToCSS } from './theme';
export type { Theme } from './theme';

// Theme store
export {
	themeStore,
	accentPalette,
	uiScalePresets,
	bgEffects,
	bgQualityPresets
} from './stores/theme.svelte';
export type {
	AccentColor,
	ThemeMode,
	ThemeColors,
	UiScalePreset,
	BgEffectType,
	BgEffect,
	BgQualityLevel,
	BgQualityPreset
} from './stores/theme.svelte';

// Privacy store
export {
	getPrivacyContext,
	setPrivacyContext,
	PRIVACY_MASK,
	PRIVACY_MASK_SHORT
} from './stores/privacy.svelte';
export type { PrivacyContext } from './stores/privacy.svelte';

// Theme provider
export { default as ThemeProvider } from './ThemeProvider.svelte';

// Core components
export { default as Widget } from './core/Widget.svelte';
export type { WidgetVariant, WidgetProps } from './core/Widget.svelte';
export { default as Button } from './core/Button.svelte';
export { default as ButtonGroup } from './core/ButtonGroup.svelte';
export type { ButtonGroupProps } from './core/ButtonGroup.svelte';
export { default as Badge } from './core/Badge.svelte';
export type { BadgeVariant, BadgeSize, BadgeProps } from './core/Badge.svelte';
export { default as Input } from './core/Input.svelte';
export { default as Textarea } from './core/Textarea.svelte';
export { default as Select } from './core/Select.svelte';
// DataTable - Compound components
export { DataTable } from './core/data-table/index';
export type {
	Column,
	ServerPaginationState,
	SortDirection,
	DataTableContext,
	DataTableProps,
	DataTableRootProps,
	DataTableToolbarProps,
	DataTableSearchProps,
	DataTablePageSizeSelectProps,
	DataTableTableProps,
	DataTableHeaderProps,
	DataTableBodyProps,
	DataTablePaginationProps,
	DataTableEmptyProps
} from './core/data-table/index';
export { getDataTableContext } from './core/data-table/index';
export { default as Numeric } from './core/Numeric.svelte';
export { default as Ip } from './core/Ip.svelte';
export { default as PrivacyToggle } from './core/PrivacyToggle.svelte';
export { default as ThemeToggle } from './core/ThemeToggle.svelte';
export type { ThemeToggleSize, ThemeToggleProps } from './core/ThemeToggle.svelte';
export { default as Modal } from './core/Modal.svelte';
export type { ModalProps } from './core/Modal.svelte';
export { default as SectionCard } from './core/SectionCard.svelte';
export type { SectionCardProps } from './core/SectionCard.svelte';
export { default as MetricCard } from './core/MetricCard.svelte';
export type { MetricCardVariant, MetricCardSize, MetricCardProps } from './core/MetricCard.svelte';
export { default as EmptyState } from './core/EmptyState.svelte';
export type { EmptyStateSize, EmptyStateProps } from './core/EmptyState.svelte';
export { default as PageHeader } from './core/PageHeader.svelte';
export type { PageHeaderProps } from './core/PageHeader.svelte';
export { default as StatusBadge } from './core/StatusBadge.svelte';
export type { StatusBadgeVariant, StatusBadgeSize, StatusBadgeProps } from './core/StatusBadge.svelte';
export { default as MandelbrotAvatar } from './core/MandelbrotAvatar.svelte';
export type { MandelbrotAvatarRounded, MandelbrotAvatarProps } from './core/MandelbrotAvatar.svelte';
export { default as AssetIcon } from './core/AssetIcon.svelte';
export { default as ActionMenu } from './core/ActionMenu.svelte';
export type { ActionMenuProps } from './core/ActionMenu.svelte';
export { default as FormField } from './core/FormField.svelte';
export type { FormFieldProps } from './core/FormField.svelte';
export { default as RandomName, generateName } from './core/RandomName.svelte';
export { default as StatsGrid } from './core/StatsGrid.svelte';
export type { StatsGridVariant, StatsGridSize, StatsGridColumns, StatItem, StatsGridProps } from './core/StatsGrid.svelte';
export { default as ListItem } from './core/ListItem.svelte';
export type { ListItemVariant, ListItemProps } from './core/ListItem.svelte';
export { default as Breadcrumb } from './core/Breadcrumb.svelte';
export type { BreadcrumbItem, BreadcrumbProps } from './core/Breadcrumb.svelte';
export { default as SidePanel } from './core/SidePanel.svelte';
export type { SidePanelPosition, SidePanelProps } from './core/SidePanel.svelte';
export { default as RefreshControl, DEFAULT_INTERVALS } from './core/RefreshControl.svelte';
export type { RefreshInterval } from './core/RefreshControl.svelte';

// Form controls
export { default as Checkbox } from './core/Checkbox.svelte';
export { default as Switch } from './core/Switch.svelte';
export { default as RadioGroup } from './core/RadioGroup.svelte';
export { default as Slider } from './core/Slider.svelte';
export { default as DateRangePicker } from './core/DateRangePicker.svelte';
export type { CheckboxSize, CheckboxProps } from './core/Checkbox.svelte';
export type { SwitchSize, SwitchProps } from './core/Switch.svelte';
export type { RadioOption, RadioGroupSize, RadioGroupProps } from './core/RadioGroup.svelte';
export type { SliderSize, SliderProps } from './core/Slider.svelte';
export type {
	DateRangePickerSize,
	DateModifier,
	DateRangePickerProps
} from './core/DateRangePicker.svelte';
// Re-export date types for convenience
export type { DateRange } from 'bits-ui';
export type { DateValue } from '@internationalized/date';

// Navigation & Disclosure
export { default as Tabs } from './core/Tabs.svelte';
export { default as Accordion } from './core/Accordion.svelte';
export type { TabItem, TabsSize, TabsProps } from './core/Tabs.svelte';
export type { AccordionItem, AccordionProps } from './core/Accordion.svelte';

// Overlays
export { default as Tooltip } from './core/Tooltip.svelte';
export { default as Popover } from './core/Popover.svelte';
export type { TooltipSide, TooltipProps } from './core/Tooltip.svelte';
export type { PopoverSide, PopoverProps } from './core/Popover.svelte';

// Feedback
export { default as Alert } from './core/Alert.svelte';
export { default as ProgressBar } from './core/ProgressBar.svelte';
export { default as Skeleton } from './core/Skeleton.svelte';
export { default as Toast, addToast, removeToast, getToasts } from './core/Toast.svelte';
export { default as Toaster } from './core/Toaster.svelte';
export type { AlertVariant, AlertProps } from './core/Alert.svelte';
export type { ProgressBarSize, ProgressBarVariant, ProgressBarProps } from './core/ProgressBar.svelte';
export type { SkeletonVariant, SkeletonProps } from './core/Skeleton.svelte';
export type { ToastVariant, ToastData, ToastProps } from './core/Toast.svelte';
export type { ToasterPosition, ToasterProps } from './core/Toaster.svelte';

// Typography
export { default as Text } from './core/Text.svelte';
export { default as Heading } from './core/Heading.svelte';
export { default as CodeBlock } from './core/CodeBlock.svelte';
export { default as Link } from './core/Link.svelte';
export { default as Divider } from './core/Divider.svelte';
export { default as MenuItem } from './core/MenuItem.svelte';
export { default as MenuDivider } from './core/MenuDivider.svelte';

// Typography types
export type { TextSize, TextVariant, TextWeight, TextElement, TextProps } from './core/Text.svelte';
export type { HeadingLevel, HeadingSize, HeadingProps } from './core/Heading.svelte';
export type { LinkVariant, LinkProps } from './core/Link.svelte';
export type { DividerVariant, DividerSpacing, DividerProps } from './core/Divider.svelte';
export type { MenuItemVariant, MenuItemProps } from './core/MenuItem.svelte';
export type { MenuDividerProps } from './core/MenuDivider.svelte';

// Core types
export type { ButtonVariant, ButtonSize, ButtonType, ButtonProps } from './core/Button.svelte';
export type { InputSize, InputAlign, InputType, InputProps } from './core/Input.svelte';
export type { TextareaSize, TextareaProps } from './core/Textarea.svelte';
export type { SelectOption, SelectSize, SelectProps } from './core/Select.svelte';
export type { CodeBlockProps } from './core/CodeBlock.svelte';
export type { NumericFormat, NumericVariant, NumericSize, NumericProps } from './core/Numeric.svelte';
export type { IpSize, IpProps } from './core/Ip.svelte';
export type { PrivacyToggleSize, PrivacyToggleProps } from './core/PrivacyToggle.svelte';
export type { AssetIconSize, AssetIconProps } from './core/AssetIcon.svelte';
export type { RandomNameConfig } from './core/RandomName.svelte';

// Visualization components
export { default as Sparkline } from './viz/Sparkline.svelte';
export { default as EquityChart } from './viz/EquityChart.svelte';
export { default as BacktestChart } from './viz/BacktestChart.svelte';
export { default as Gauge } from './viz/Gauge.svelte';
export { default as ProgressRing } from './viz/ProgressRing.svelte';

// Layout components
export { default as Header } from './layout/Header.svelte';
export { default as Sidebar } from './layout/Sidebar.svelte';
export { default as Panel } from './layout/Panel.svelte';
export { default as StatusBar } from './layout/StatusBar.svelte';

// Effects
export { default as DelaunayBackground } from './effects/DelaunayBackground.svelte';
export { default as GridPulseBackground } from './effects/GridPulseBackground.svelte';
export { default as IsometricGridBackground } from './effects/IsometricGridBackground.svelte';
export { default as ParticleFlowBackground } from './effects/ParticleFlowBackground.svelte';
export { default as SupernovaBackground } from './effects/SupernovaBackground.svelte';
export { default as NebulaOverlay } from './effects/NebulaOverlay.svelte';

// Utilities
export { renderMandelbrot } from './utils/mandelbrot';
