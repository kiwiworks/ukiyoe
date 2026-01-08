<script lang="ts" module>
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
</script>

<script lang="ts">
	import { getPrivacyContext, PRIVACY_MASK } from '../stores/privacy.svelte';

	let {
		value,
		size = 'md',
		placeholder = '-',
		class: className = '',
		sensitive = true
	}: IpProps = $props();

	// Privacy context for masking
	const privacy = getPrivacyContext();

	// Check if value should be masked
	const isMasked = $derived(sensitive && privacy.enabled);

	// Determine if we have a valid IP
	const isValid = $derived(value != null && value.length > 0);

	// Display value - masked or actual
	const displayValue = $derived.by(() => {
		if (!isValid) return placeholder;
		if (isMasked) return PRIVACY_MASK;
		return value;
	});

	// Aria label for accessibility
	const ariaLabel = $derived(
		isMasked ? 'IP address hidden for privacy' : isValid ? `IP address: ${value}` : 'No IP address'
	);
</script>

<span
	class="ip {className}"
	class:ip--xs={size === 'xs'}
	class:ip--sm={size === 'sm'}
	class:ip--md={size === 'md'}
	class:ip--lg={size === 'lg'}
	class:ip--masked={isMasked}
	class:ip--empty={!isValid}
	aria-label={ariaLabel}
>
	{displayValue}
</span>

<style>
	.ip {
		font-family: var(--font-mono, monospace);
		font-variant-numeric: tabular-nums;
		color: var(--text-primary, inherit);
		white-space: nowrap;
	}

	/* Sizes */
	.ip--xs {
		font-size: 10px;
	}
	.ip--sm {
		font-size: 11px;
	}
	.ip--md {
		font-size: 13px;
	}
	.ip--lg {
		font-size: 16px;
	}

	/* Masked (privacy mode) */
	.ip--masked {
		color: var(--text-muted, #666);
		letter-spacing: 0.1em;
		user-select: none;
	}

	/* Empty/placeholder */
	.ip--empty {
		color: var(--text-muted, #666);
	}
</style>
