/**
 * IP Address Component
 *
 * Displays IP addresses with automatic privacy mode support.
 * When privacy mode is enabled, the IP is masked.
 *
 * @example
 * <Ip value="192.168.1.100" />
 * <Ip value="2001:db8::1" />
 */
export type IpSize = 'xs' | 'sm' | 'md' | 'lg';
export interface IpProps {
    /** The IP address to display */
    value: string | null | undefined;
    /** Size preset (default: 'md') */
    size?: IpSize;
    /** Placeholder when value is null/undefined (default: '-') */
    placeholder?: string;
    /** Custom CSS class */
    class?: string;
    /** Whether this is sensitive data - always true by default for IPs */
    sensitive?: boolean;
}
declare const Ip: import("svelte").Component<IpProps, {}, "">;
type Ip = ReturnType<typeof Ip>;
export default Ip;
