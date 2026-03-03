/**
 * Reactive viewport store — tracks window size, input modality, and media preferences.
 * Uses Svelte 5 runes. Same singleton pattern as themeStore.
 */
declare class ViewportStore {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouch: boolean;
    prefersReducedMotion: boolean;
    isStandalone: boolean;
    keyboardVisible: boolean;
    keyboardHeight: number;
    constructor();
}
export declare const viewportStore: ViewportStore;
export {};
