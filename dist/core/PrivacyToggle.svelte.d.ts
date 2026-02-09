/**
 * Privacy Toggle Button
 *
 * A button with an eye icon that toggles privacy mode on/off.
 * When privacy mode is enabled, all sensitive data (balances, IPs, etc.)
 * will be masked across the application.
 *
 * @example
 * <PrivacyToggle />
 * <PrivacyToggle size="sm" />
 */
export type PrivacyToggleSize = 'xs' | 'sm' | 'md' | 'lg';
export interface PrivacyToggleProps {
    /** Size preset (default: 'md') */
    size?: PrivacyToggleSize;
    /** Custom CSS class */
    class?: string;
    /** Show label text (default: false) */
    showLabel?: boolean;
}
declare const PrivacyToggle: import("svelte").Component<PrivacyToggleProps, {}, "">;
type PrivacyToggle = ReturnType<typeof PrivacyToggle>;
export default PrivacyToggle;
