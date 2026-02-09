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
export declare function setPrivacyContext(): PrivacyContext;
/**
 * Get the privacy context.
 * Returns a context object with an `enabled` property and control methods.
 * If no context is set, returns a default context with privacy disabled.
 */
export declare function getPrivacyContext(): PrivacyContext;
/** Default mask character for hiding sensitive values */
export declare const PRIVACY_MASK = "\u2022\u2022\u2022\u2022\u2022";
/** Shorter mask for compact displays */
export declare const PRIVACY_MASK_SHORT = "\u2022\u2022\u2022";
