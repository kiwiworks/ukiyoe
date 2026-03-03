/**
 * Reactive viewport store — tracks window size, input modality, and media preferences.
 * Uses Svelte 5 runes. Same singleton pattern as themeStore.
 */

class ViewportStore {
	width = $state(typeof window !== 'undefined' ? window.innerWidth : 1024);
	height = $state(typeof window !== 'undefined' ? window.innerHeight : 768);

	isMobile = $derived(this.width < 768);
	isTablet = $derived(this.width >= 768 && this.width < 1024);
	isDesktop = $derived(this.width >= 1024);

	isTouch = $state(false);
	prefersReducedMotion = $state(false);
	isStandalone = $state(false);
	keyboardVisible = $state(false);
	keyboardHeight = $state(0);

	constructor() {
		if (typeof window === 'undefined') return;

		// Resize listener
		const onResize = () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		};
		window.addEventListener('resize', onResize);

		// Touch detection
		const touchMq = window.matchMedia('(pointer: coarse)');
		this.isTouch = touchMq.matches;
		touchMq.addEventListener('change', (e) => {
			this.isTouch = e.matches;
		});

		// Reduced motion
		const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
		this.prefersReducedMotion = motionMq.matches;
		motionMq.addEventListener('change', (e) => {
			this.prefersReducedMotion = e.matches;
		});

		// Standalone (Tauri / PWA)
		const standaloneMq = window.matchMedia('(display-mode: standalone)');
		this.isStandalone =
			standaloneMq.matches || (navigator as { standalone?: boolean }).standalone === true;
		standaloneMq.addEventListener('change', (e) => {
			this.isStandalone = e.matches;
		});

		// Virtual keyboard detection via visualViewport API
		if (window.visualViewport) {
			const vv = window.visualViewport;
			const onViewportResize = () => {
				const heightDiff = window.innerHeight - vv.height;
				this.keyboardVisible = heightDiff > 100;
				this.keyboardHeight = this.keyboardVisible ? heightDiff : 0;
			};
			vv.addEventListener('resize', onViewportResize);
		}
	}
}

export const viewportStore = new ViewportStore();
