export interface AccentColor {
    id: string;
    name: string;
    hex: string;
    hoverHex: string;
    mutedHex: string;
}
export declare const accentPalette: AccentColor[];
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
export interface UiScalePreset {
    id: string;
    name: string;
    scale: number;
}
export declare const uiScalePresets: UiScalePreset[];
export type BgEffectType = 'none' | 'grid-pulse' | 'delaunay' | 'isometric' | 'particle-flow' | 'supernova';
export interface BgEffect {
    id: BgEffectType;
    name: string;
    description: string;
}
export declare const bgEffects: BgEffect[];
export type BgQualityLevel = 'low' | 'medium' | 'high';
export interface BgQualityPreset {
    id: BgQualityLevel;
    name: string;
    resolution: number;
    targetFps: number;
    description: string;
}
export declare const bgQualityPresets: BgQualityPreset[];
declare class ThemeStore {
    mode: ThemeMode;
    accent: AccentColor;
    uiScale: UiScalePreset;
    bgEffect: BgEffect;
    bgQuality: BgQualityPreset;
    nebula: boolean;
    solidText: boolean;
    colors: ThemeColors;
    cssVars: string;
    private generateCssVars;
    setMode(mode: ThemeMode): void;
    toggleMode(): void;
    setAccent(color: AccentColor): void;
    setAccentById(id: string): void;
    setUiScale(scale: UiScalePreset): void;
    setUiScaleById(id: string): void;
    get scaleIndex(): number;
    setUiScaleByIndex(index: number): void;
    setBgEffect(effect: BgEffect): void;
    setBgEffectById(id: BgEffectType): void;
    setBgQuality(quality: BgQualityPreset): void;
    setBgQualityById(id: BgQualityLevel): void;
    setNebula(enabled: boolean): void;
    toggleNebula(): void;
    setSolidText(enabled: boolean): void;
    toggleSolidText(): void;
}
export declare const themeStore: ThemeStore;
export {};
