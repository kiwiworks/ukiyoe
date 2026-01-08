/**
 * Privacy Store
 *
 * Global privacy context for hiding sensitive data across the application.
 * Components can check this context to mask their content when privacy mode is enabled.
 *
 * @example
 * // In a component:
 * import { getPrivacyContext } from '@rahapuu/ui';
 * const privacy = getPrivacyContext();
 * // Then use privacy.enabled to check if masking should be applied
 *
 * // In layout (to provide context):
 * import { setPrivacyContext } from '@rahapuu/ui';
 * setPrivacyContext();
 */

import { getContext, setContext } from 'svelte';

const PRIVACY_CONTEXT_KEY = Symbol('privacy');

export interface PrivacyContext {
	/** Whether privacy mode is currently enabled */
	readonly enabled: boolean;
	/** Toggle privacy mode on/off */
	toggle: () => void;
	/** Explicitly set privacy mode */
	set: (enabled: boolean) => void;
}

/**
 * Create and set the privacy context.
 * Should be called once in a parent layout component.
 */
export function setPrivacyContext(): PrivacyContext {
	let enabled = $state(false);

	const context: PrivacyContext = {
		get enabled() {
			return enabled;
		},
		toggle() {
			enabled = !enabled;
		},
		set(value: boolean) {
			enabled = value;
		}
	};

	setContext(PRIVACY_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the privacy context.
 * Returns a context object with an `enabled` property and control methods.
 * If no context is set, returns a default context with privacy disabled.
 */
export function getPrivacyContext(): PrivacyContext {
	const context = getContext<PrivacyContext | undefined>(PRIVACY_CONTEXT_KEY);

	if (!context) {
		// Return a default non-reactive context if not in a provider
		return {
			enabled: false,
			toggle: () => {},
			set: () => {}
		};
	}

	return context;
}

/** Default mask character for hiding sensitive values */
export const PRIVACY_MASK = '•••••';

/** Shorter mask for compact displays */
export const PRIVACY_MASK_SHORT = '•••';
