/** Dark mode theme (primary) */
export const darkTheme = {
	colors: {
		bg: {
			primary: '#0a0a0a',
			secondary: '#111111',
			tertiary: '#161616',
			elevated: '#1a1a1a',
			hover: '#222222',
			active: '#333333',
			overlay: 'rgba(0, 0, 0, 0.5)'
		},
		border: {
			subtle: 'rgba(255, 255, 255, 0.08)',
			default: 'rgba(255, 255, 255, 0.15)',
			strong: 'rgba(255, 255, 255, 0.25)'
		},
		text: {
			primary: '#e8e8e8',
			secondary: '#888888',
			muted: '#555555',
			disabled: '#333333',
			inverse: '#000000'
		},
		accent: {
			brand: '#ff6b00',
			brandHover: '#ff8533',
			brandMuted: '#cc5500'
		},
		semantic: {
			positive: '#00ff88',
			positiveHover: '#00dd77',
			positiveMuted: '#00cc6a',
			negative: '#ff4444',
			negativeHover: '#ff6666',
			negativeMuted: '#cc3333',
			warning: '#ffaa00',
			warningHover: '#ffbb33',
			info: '#00aaff'
		},
		chart: {
			line1: '#00ff88',
			line2: '#ff6b00',
			line3: '#9966ff',
			line4: '#00aaff',
			area: 'rgba(0, 255, 136, 0.1)',
			grid: '#222222'
		},
		scrollbar: {
			track: '#1a1a1a',
			thumb: '#333333',
			thumbHover: '#444444'
		}
	},
	spacing: {
		xs: '2px',
		sm: '4px',
		md: '8px',
		lg: '12px',
		xl: '16px',
		xxl: '24px'
	},
	fontSize: {
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '18px',
		xl: '20px',
		xxl: '24px'
	},
	fontFamily: {
		mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
	},
	borderRadius: {
		sm: '2px',
		md: '4px',
		lg: '6px'
	}
} as const;

export type Theme = typeof darkTheme;

/** Alias for backwards compatibility */
export const theme = darkTheme;

/**
 * Converts theme object to CSS custom properties string.
 * Used by ThemeProvider to inject styles into the document.
 */
export function themeToCSS(t: Theme = darkTheme): string {
	return `
		--bg-primary: ${t.colors.bg.primary};
		--bg-secondary: ${t.colors.bg.secondary};
		--bg-tertiary: ${t.colors.bg.tertiary};
		--bg-elevated: ${t.colors.bg.elevated};
		--bg-hover: ${t.colors.bg.hover};
		--bg-active: ${t.colors.bg.active};
		--bg-overlay: ${t.colors.bg.overlay};
		--border-subtle: ${t.colors.border.subtle};
		--border-default: ${t.colors.border.default};
		--border-strong: ${t.colors.border.strong};
		--text-primary: ${t.colors.text.primary};
		--text-secondary: ${t.colors.text.secondary};
		--text-muted: ${t.colors.text.muted};
		--text-disabled: ${t.colors.text.disabled};
		--text-inverse: ${t.colors.text.inverse};
		--accent-brand: ${t.colors.accent.brand};
		--accent-brand-hover: ${t.colors.accent.brandHover};
		--accent-brand-muted: ${t.colors.accent.brandMuted};
		--color-positive: ${t.colors.semantic.positive};
		--color-positive-hover: ${t.colors.semantic.positiveHover};
		--color-positive-muted: ${t.colors.semantic.positiveMuted};
		--color-negative: ${t.colors.semantic.negative};
		--color-negative-hover: ${t.colors.semantic.negativeHover};
		--color-negative-muted: ${t.colors.semantic.negativeMuted};
		--color-warning: ${t.colors.semantic.warning};
		--color-warning-hover: ${t.colors.semantic.warningHover};
		--color-info: ${t.colors.semantic.info};
		--chart-line1: ${t.colors.chart.line1};
		--chart-line2: ${t.colors.chart.line2};
		--chart-line3: ${t.colors.chart.line3};
		--chart-line4: ${t.colors.chart.line4};
		--chart-area: ${t.colors.chart.area};
		--chart-grid: ${t.colors.chart.grid};
		--scrollbar-track: ${t.colors.scrollbar.track};
		--scrollbar-thumb: ${t.colors.scrollbar.thumb};
		--scrollbar-thumb-hover: ${t.colors.scrollbar.thumbHover};
		--spacing-xs: ${t.spacing.xs};
		--spacing-sm: ${t.spacing.sm};
		--spacing-md: ${t.spacing.md};
		--spacing-lg: ${t.spacing.lg};
		--spacing-xl: ${t.spacing.xl};
		--spacing-xxl: ${t.spacing.xxl};
		--font-size-xs: ${t.fontSize.xs};
		--font-size-sm: ${t.fontSize.sm};
		--font-size-md: ${t.fontSize.md};
		--font-size-lg: ${t.fontSize.lg};
		--font-size-xl: ${t.fontSize.xl};
		--font-size-xxl: ${t.fontSize.xxl};
		--font-mono: ${t.fontFamily.mono};
		--radius-sm: ${t.borderRadius.sm};
		--radius-md: ${t.borderRadius.md};
		--radius-lg: ${t.borderRadius.lg};
	`;
}
