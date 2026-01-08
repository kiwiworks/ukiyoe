// Unified theme store - handles dark/light mode and accent colors

export interface AccentColor {
	id: string;
	name: string;
	hex: string;
	hoverHex: string;
	mutedHex: string;
}

export const accentPalette: AccentColor[] = [
	{
		id: 'orange',
		name: 'Rahapuu Orange',
		hex: '#ff6b00',
		hoverHex: '#ff8533',
		mutedHex: '#cc5500'
	},
	{
		id: 'amber',
		name: 'Amber',
		hex: '#f59e0b',
		hoverHex: '#fbbf24',
		mutedHex: '#d97706'
	},
	{
		id: 'emerald',
		name: 'Emerald',
		hex: '#10b981',
		hoverHex: '#34d399',
		mutedHex: '#059669'
	},
	{
		id: 'cyan',
		name: 'Cyan',
		hex: '#06b6d4',
		hoverHex: '#22d3ee',
		mutedHex: '#0891b2'
	},
	{
		id: 'blue',
		name: 'Blue',
		hex: '#3b82f6',
		hoverHex: '#60a5fa',
		mutedHex: '#2563eb'
	},
	{
		id: 'violet',
		name: 'Violet',
		hex: '#8b5cf6',
		hoverHex: '#a78bfa',
		mutedHex: '#7c3aed'
	},
	{
		id: 'pink',
		name: 'Pink',
		hex: '#ec4899',
		hoverHex: '#f472b6',
		mutedHex: '#db2777'
	},
	{
		id: 'rose',
		name: 'Rose',
		hex: '#f43f5e',
		hoverHex: '#fb7185',
		mutedHex: '#e11d48'
	}
];

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
	bg: {
		primary: string;
		secondary: string;
		tertiary: string;
		elevated: string;
		hover: string;
		active: string;
		overlay: string;
	};
	border: {
		subtle: string;
		default: string;
		strong: string;
	};
	text: {
		primary: string;
		secondary: string;
		muted: string;
		disabled: string;
		inverse: string;
	};
	semantic: {
		positive: string;
		positiveHover: string;
		positiveMuted: string;
		negative: string;
		negativeHover: string;
		negativeMuted: string;
		warning: string;
		warningHover: string;
		warningMuted: string;
		info: string;
		infoMuted: string;
		neutral: string;
	};
	chart: {
		line1: string;
		line2: string;
		line3: string;
		line4: string;
		area: string;
		grid: string;
	};
	scrollbar: {
		track: string;
		thumb: string;
		thumbHover: string;
	};
}

const darkColors: ThemeColors = {
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
		subtle: '#222222',
		default: '#333333',
		strong: '#444444'
	},
	text: {
		primary: '#e8e8e8',
		secondary: '#888888',
		muted: '#555555',
		disabled: '#333333',
		inverse: '#000000'
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
		warningMuted: 'rgba(255, 170, 0, 0.15)',
		info: '#00aaff',
		infoMuted: 'rgba(0, 170, 255, 0.15)',
		neutral: '#888888'
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
};

const lightColors: ThemeColors = {
	bg: {
		primary: '#ffffff',
		secondary: '#f8f8f8',
		tertiary: '#f0f0f0',
		elevated: '#ffffff',
		hover: '#e8e8e8',
		active: '#d0d0d0',
		overlay: 'rgba(0, 0, 0, 0.3)'
	},
	border: {
		subtle: '#e0e0e0',
		default: '#d0d0d0',
		strong: '#b0b0b0'
	},
	text: {
		primary: '#1a1a1a',
		secondary: '#666666',
		muted: '#999999',
		disabled: '#cccccc',
		inverse: '#ffffff'
	},
	semantic: {
		positive: '#00aa55',
		positiveHover: '#00994d',
		positiveMuted: '#00884a',
		negative: '#dd3333',
		negativeHover: '#cc2222',
		negativeMuted: '#bb2222',
		warning: '#dd8800',
		warningHover: '#cc7700',
		warningMuted: 'rgba(221, 136, 0, 0.15)',
		info: '#0088dd',
		infoMuted: 'rgba(0, 136, 221, 0.15)',
		neutral: '#666666'
	},
	chart: {
		line1: '#00aa55',
		line2: '#dd6600',
		line3: '#7744dd',
		line4: '#0088dd',
		area: 'rgba(0, 170, 85, 0.1)',
		grid: '#e0e0e0'
	},
	scrollbar: {
		track: '#f0f0f0',
		thumb: '#cccccc',
		thumbHover: '#b0b0b0'
	}
};

// UI Scale presets (Discord-style)
export interface UiScalePreset {
	id: string;
	name: string;
	scale: number; // multiplier for base sizes
}

export const uiScalePresets: UiScalePreset[] = [
	{ id: 'compact', name: 'Compact', scale: 0.875 },
	{ id: 'cozy', name: 'Cozy', scale: 1.0 },
	{ id: 'comfortable', name: 'Comfortable', scale: 1.125 },
	{ id: 'spacious', name: 'Spacious', scale: 1.25 }
];

// Background effect types
export type BgEffectType = 'none' | 'grid-pulse' | 'delaunay' | 'isometric' | 'particle-flow' | 'supernova';

export interface BgEffect {
	id: BgEffectType;
	name: string;
	description: string;
}

export const bgEffects: BgEffect[] = [
	{ id: 'none', name: 'None', description: 'No background animation' },
	{ id: 'grid-pulse', name: 'Grid Pulse', description: 'Pulsing grid like data propagation' },
	{ id: 'delaunay', name: 'Delaunay Mesh', description: 'Animated triangulation mesh' },
	{ id: 'isometric', name: 'Isometric', description: 'Wavy isometric grid terrain' },
	{ id: 'particle-flow', name: 'Particle Flow', description: 'Rising particles with connections' },
	{ id: 'supernova', name: 'Supernova', description: 'Cosmic gas formations and stellar nebulae' }
];

// Background effect quality presets (for GPU-intensive effects like Supernova)
export type BgQualityLevel = 'low' | 'medium' | 'high';

export interface BgQualityPreset {
	id: BgQualityLevel;
	name: string;
	resolution: number; // Canvas resolution multiplier (0.3 = 30% of screen)
	targetFps: number; // Target frame rate
	description: string;
}

export const bgQualityPresets: BgQualityPreset[] = [
	{ id: 'low', name: 'Low', resolution: 0.25, targetFps: 20, description: 'Battery saver' },
	{ id: 'medium', name: 'Medium', resolution: 0.4, targetFps: 30, description: 'Balanced' },
	{ id: 'high', name: 'High', resolution: 0.6, targetFps: 60, description: 'Full quality' }
];

const STORAGE_KEY_MODE = 'rahapuu-theme-mode';
const STORAGE_KEY_ACCENT = 'rahapuu-accent-color';
const STORAGE_KEY_SCALE = 'rahapuu-ui-scale';
const STORAGE_KEY_BG_EFFECT = 'rahapuu-bg-effect';
const STORAGE_KEY_BG_QUALITY = 'rahapuu-bg-quality';
const STORAGE_KEY_NEBULA = 'rahapuu-nebula-mode';
const STORAGE_KEY_SOLID_TEXT = 'rahapuu-solid-text';

function getStoredNebula(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem(STORAGE_KEY_NEBULA) === 'true';
}

function getStoredSolidText(): boolean {
	if (typeof window === 'undefined') return false; // Default to no text shadow
	const stored = localStorage.getItem(STORAGE_KEY_SOLID_TEXT);
	return stored === null ? false : stored === 'true'; // Default false (no text shadow)
}

function getStoredMode(): ThemeMode {
	if (typeof window === 'undefined') return 'dark';
	return (localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode) || 'dark';
}

function getStoredAccent(): AccentColor {
	if (typeof window === 'undefined') return accentPalette[0];
	const stored = localStorage.getItem(STORAGE_KEY_ACCENT);
	if (stored) {
		const found = accentPalette.find(c => c.id === stored);
		if (found) return found;
	}
	return accentPalette[0];
}

function getStoredScale(): UiScalePreset {
	if (typeof window === 'undefined') return uiScalePresets[1]; // cozy default
	const stored = localStorage.getItem(STORAGE_KEY_SCALE);
	if (stored) {
		const found = uiScalePresets.find(s => s.id === stored);
		if (found) return found;
	}
	return uiScalePresets[1]; // cozy default
}

function getStoredBgEffect(): BgEffect {
	if (typeof window === 'undefined') return bgEffects[1]; // grid-pulse default
	const stored = localStorage.getItem(STORAGE_KEY_BG_EFFECT);
	if (stored) {
		const found = bgEffects.find(e => e.id === stored);
		if (found) return found;
	}
	return bgEffects[1]; // grid-pulse default
}

function getStoredBgQuality(): BgQualityPreset {
	if (typeof window === 'undefined') return bgQualityPresets[1]; // medium default
	const stored = localStorage.getItem(STORAGE_KEY_BG_QUALITY);
	if (stored) {
		const found = bgQualityPresets.find(q => q.id === stored);
		if (found) return found;
	}
	return bgQualityPresets[1]; // medium default
}

class ThemeStore {
	mode = $state<ThemeMode>(getStoredMode());
	accent = $state<AccentColor>(getStoredAccent());
	uiScale = $state<UiScalePreset>(getStoredScale());
	bgEffect = $state<BgEffect>(getStoredBgEffect());
	bgQuality = $state<BgQualityPreset>(getStoredBgQuality());
	nebula = $state<boolean>(getStoredNebula());
	solidText = $state<boolean>(getStoredSolidText());

	colors = $derived<ThemeColors>(this.mode === 'dark' ? darkColors : lightColors);

	cssVars = $derived(this.generateCssVars());

	private generateCssVars(): string {
		const c = this.colors;
		const a = this.accent;
		const s = this.uiScale.scale;

		// Base values that get scaled
		const spacing = {
			xs: Math.round(2 * s),
			sm: Math.round(4 * s),
			md: Math.round(8 * s),
			lg: Math.round(12 * s),
			xl: Math.round(16 * s),
			xxl: Math.round(24 * s)
		};

		const fontSize = {
			xs: Math.round(12 * s),
			sm: Math.round(14 * s),
			md: Math.round(16 * s),
			lg: Math.round(18 * s),
			xl: Math.round(20 * s),
			xxl: Math.round(24 * s)
		};

		const radius = {
			sm: Math.round(2 * s),
			md: Math.round(4 * s),
			lg: Math.round(6 * s)
		};

		// Nebula gradient colors based on mode
		const nebulaGradient = this.nebula
			? this.mode === 'dark'
				? {
						start: '#0d0015',
						mid1: '#1a0a2e',
						mid2: '#16213e',
						end: '#0a0a0a',
						glow1: 'rgba(139, 92, 246, 0.08)',
						glow2: 'rgba(59, 130, 246, 0.06)',
						glow3: 'rgba(236, 72, 153, 0.04)'
					}
				: {
						start: '#f8f4ff',
						mid1: '#f0e8ff',
						mid2: '#e8f4ff',
						end: '#ffffff',
						glow1: 'rgba(139, 92, 246, 0.12)',
						glow2: 'rgba(59, 130, 246, 0.08)',
						glow3: 'rgba(236, 72, 153, 0.06)'
					}
			: null;

		return `
			--bg-primary: ${c.bg.primary};
			--bg-secondary: ${c.bg.secondary};
			--bg-tertiary: ${c.bg.tertiary};
			--bg-elevated: ${c.bg.elevated};
			--bg-hover: ${c.bg.hover};
			--bg-active: ${c.bg.active};
			--bg-overlay: ${c.bg.overlay};
			--nebula-enabled: ${this.nebula ? '1' : '0'};
			--nebula-gradient: ${nebulaGradient ? `linear-gradient(135deg, ${nebulaGradient.start} 0%, ${nebulaGradient.mid1} 25%, ${nebulaGradient.mid2} 50%, ${nebulaGradient.end} 100%)` : 'none'};
			--nebula-glow1: ${nebulaGradient?.glow1 ?? 'transparent'};
			--nebula-glow2: ${nebulaGradient?.glow2 ?? 'transparent'};
			--nebula-glow3: ${nebulaGradient?.glow3 ?? 'transparent'};
			--border-subtle: ${c.border.subtle};
			--border-default: ${c.border.default};
			--border-strong: ${c.border.strong};
			--text-primary: ${c.text.primary};
			--text-secondary: ${c.text.secondary};
			--text-muted: ${c.text.muted};
			--text-disabled: ${c.text.disabled};
			--text-inverse: ${c.text.inverse};
			--accent-brand: ${a.hex};
			--accent-brand-hover: ${a.hoverHex};
			--accent-brand-muted: ${a.mutedHex};
			--positive: ${c.semantic.positive};
			--positive-hover: ${c.semantic.positiveHover};
			--positive-muted: ${c.semantic.positiveMuted};
			--negative: ${c.semantic.negative};
			--negative-hover: ${c.semantic.negativeHover};
			--negative-muted: ${c.semantic.negativeMuted};
			--warning: ${c.semantic.warning};
			--warning-hover: ${c.semantic.warningHover};
			--warning-muted: ${c.semantic.warningMuted};
			--info: ${c.semantic.info};
			--info-muted: ${c.semantic.infoMuted};
			--neutral: ${c.semantic.neutral};
			--chart-line1: ${c.chart.line1};
			--chart-line2: ${a.hex};
			--chart-line3: ${c.chart.line3};
			--chart-line4: ${c.chart.line4};
			--chart-area: ${c.chart.area};
			--chart-grid: ${c.chart.grid};
			--scrollbar-track: ${c.scrollbar.track};
			--scrollbar-thumb: ${c.scrollbar.thumb};
			--scrollbar-thumb-hover: ${c.scrollbar.thumbHover};
			--spacing-xs: ${spacing.xs}px;
			--spacing-sm: ${spacing.sm}px;
			--spacing-md: ${spacing.md}px;
			--spacing-lg: ${spacing.lg}px;
			--spacing-xl: ${spacing.xl}px;
			--spacing-xxl: ${spacing.xxl}px;
			--font-size-xs: ${fontSize.xs}px;
			--font-size-sm: ${fontSize.sm}px;
			--font-size-md: ${fontSize.md}px;
			--font-size-lg: ${fontSize.lg}px;
			--font-size-xl: ${fontSize.xl}px;
			--font-size-xxl: ${fontSize.xxl}px;
			--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
			--radius-sm: ${radius.sm}px;
			--radius-md: ${radius.md}px;
			--radius-lg: ${radius.lg}px;
			--ui-scale: ${s};
			--text-shadow: ${this.solidText ? (this.mode === 'dark' ? '0 0 8px rgba(0,0,0,1), 0 0 16px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,1)' : '0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.8), 0 1px 3px rgba(255,255,255,1)') : 'none'};
			--solid-text-enabled: ${this.solidText ? '1' : '0'};
		`;
	}

	setMode(mode: ThemeMode) {
		this.mode = mode;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_MODE, mode);
		}
	}

	toggleMode() {
		this.setMode(this.mode === 'dark' ? 'light' : 'dark');
	}

	setAccent(color: AccentColor) {
		this.accent = color;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_ACCENT, color.id);
		}
	}

	setAccentById(id: string) {
		const color = accentPalette.find(c => c.id === id);
		if (color) {
			this.setAccent(color);
		}
	}

	setUiScale(scale: UiScalePreset) {
		this.uiScale = scale;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_SCALE, scale.id);
		}
	}

	setUiScaleById(id: string) {
		const scale = uiScalePresets.find(s => s.id === id);
		if (scale) {
			this.setUiScale(scale);
		}
	}

	// Get scale index for slider (0-3)
	get scaleIndex(): number {
		return uiScalePresets.findIndex(s => s.id === this.uiScale.id);
	}

	setUiScaleByIndex(index: number) {
		if (index >= 0 && index < uiScalePresets.length) {
			this.setUiScale(uiScalePresets[index]);
		}
	}

	setBgEffect(effect: BgEffect) {
		this.bgEffect = effect;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_BG_EFFECT, effect.id);
		}
	}

	setBgEffectById(id: BgEffectType) {
		const effect = bgEffects.find(e => e.id === id);
		if (effect) {
			this.setBgEffect(effect);
		}
	}

	setBgQuality(quality: BgQualityPreset) {
		this.bgQuality = quality;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_BG_QUALITY, quality.id);
		}
	}

	setBgQualityById(id: BgQualityLevel) {
		const quality = bgQualityPresets.find(q => q.id === id);
		if (quality) {
			this.setBgQuality(quality);
		}
	}

	setNebula(enabled: boolean) {
		this.nebula = enabled;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_NEBULA, String(enabled));
		}
	}

	toggleNebula() {
		this.setNebula(!this.nebula);
	}

	setSolidText(enabled: boolean) {
		this.solidText = enabled;
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY_SOLID_TEXT, String(enabled));
		}
	}

	toggleSolidText() {
		this.setSolidText(!this.solidText);
	}
}

export const themeStore = new ThemeStore();
