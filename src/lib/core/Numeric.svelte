<script lang="ts" module>
	/**
	 * Numeric Component
	 *
	 * A reusable, null-safe component for displaying formatted numeric values.
	 * Supports localization via Intl.NumberFormat and theming via CSS variables.
	 *
	 * Features:
	 * - Multiple format types (currency, percent, compact, etc.)
	 * - Auto-coloring by sign (positive/negative)
	 * - Privacy mode support via `sensitive` prop
	 *
	 * @example
	 * <Numeric value={1234.56} format="currency" />
	 * <Numeric value={-5.25} format="percent" colorBySign />
	 * <Numeric value={1500} format="duration" />
	 * <Numeric value={10000} format="currency" sensitive />
	 */

	// Format types - predefined formatters with semantic meaning
	export type NumericFormat =
		| 'number' // 1,234.56
		| 'integer' // 1,235
		| 'percent' // +12.34% or -5.67%
		| 'percentPlain' // 12.34% (no sign)
		| 'currency' // $1,234.56
		| 'pnl' // +$100.00 or -$50.00
		| 'price' // Auto-precision: 0.00001234 / 45,000.12
		| 'quantity' // 0.00012345 (up to 8 decimals)
		| 'compact' // 1.5M, 2.3K, 500
		| 'duration' // 1.2ms, 500µs, 2.5s
		| 'bytes' // 1.2KB, 500MB, 2GB
		| 'bps' // 12.5bp (basis points)
		| 'ratio'; // 1.25x

	// Semantic color variants
	export type NumericVariant =
		| 'default' // inherit color
		| 'positive' // green (auto for > 0)
		| 'negative' // red (auto for < 0)
		| 'muted' // dimmed
		| 'accent'; // brand color

	// Size presets
	export type NumericSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	export interface NumericProps {
		/** The numeric value to display */
		value: number | string | null | undefined;

		/** Format type (default: 'number') */
		format?: NumericFormat;

		/** Number of decimal places (overrides format default) */
		decimals?: number;

		/** Color variant (default: 'default') */
		variant?: NumericVariant;

		/** Auto-color based on sign (default: false) */
		colorBySign?: boolean;

		/** Size preset (default: 'md') */
		size?: NumericSize;

		/** Show +/- sign for positive/negative (default: depends on format) */
		showSign?: boolean;

		/** Prefix string (e.g., '$', '€') */
		prefix?: string;

		/** Suffix string (e.g., '%', 'bp', 'x') */
		suffix?: string;

		/** Locale for number formatting (default: 'en-US') */
		locale?: string;

		/** Currency code for currency format (default: 'USD') */
		currency?: string;

		/** Placeholder when value is null/undefined (default: '-') */
		placeholder?: string;

		/** Animate value changes */
		animate?: boolean;

		/** Custom CSS class */
		class?: string;

		/** Mark as sensitive data - will be masked when privacy mode is enabled */
		sensitive?: boolean;
	}
</script>

<script lang="ts">
	import { getPrivacyContext, PRIVACY_MASK } from '../stores/privacy.svelte';

	let {
		value,
		format = 'number',
		decimals,
		variant = 'default',
		colorBySign = false,
		size = 'md',
		showSign,
		prefix = '',
		suffix = '',
		locale = 'en-US',
		currency = 'USD',
		placeholder = '-',
		animate = false,
		class: className = '',
		sensitive = false
	}: NumericProps = $props();

	// Privacy context for masking sensitive values
	const privacy = getPrivacyContext();

	// Convert value to number safely
	function toNumber(val: number | string | null | undefined): number {
		if (val == null) return NaN;
		const num = typeof val === 'string' ? parseFloat(val) : val;
		return isNaN(num) ? NaN : num;
	}

	// Check if value is valid
	const numValue = $derived(toNumber(value));
	const isValid = $derived(!isNaN(numValue));

	// Determine effective variant based on colorBySign
	const effectiveVariant = $derived.by(() => {
		if (!isValid) return 'muted';
		if (colorBySign) {
			if (numValue > 0) return 'positive';
			if (numValue < 0) return 'negative';
			return 'muted';
		}
		return variant;
	});

	// Create cached formatters
	const formatters = $derived.by(() => {
		return {
			number: new Intl.NumberFormat(locale, {
				minimumFractionDigits: decimals ?? 2,
				maximumFractionDigits: decimals ?? 2
			}),
			integer: new Intl.NumberFormat(locale, {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			}),
			currency: new Intl.NumberFormat(locale, {
				style: 'currency',
				currency: currency,
				minimumFractionDigits: decimals ?? 2,
				maximumFractionDigits: decimals ?? 2
			}),
			quantity: new Intl.NumberFormat(locale, {
				minimumFractionDigits: 0,
				maximumFractionDigits: decimals ?? 8
			}),
			compact: new Intl.NumberFormat(locale, {
				notation: 'compact',
				minimumFractionDigits: decimals ?? 1,
				maximumFractionDigits: decimals ?? 1
			})
		};
	});

	// Format the value based on format type
	const formattedValue = $derived.by(() => {
		if (!isValid) return placeholder;

		const absValue = Math.abs(numValue);
		const sign = numValue >= 0 ? '+' : '-';
		const shouldShowSign = showSign ?? ['percent', 'pnl'].includes(format);

		switch (format) {
			case 'number':
				return formatters.number.format(numValue);

			case 'integer':
				return formatters.integer.format(Math.round(numValue));

			case 'percent': {
				const formatted = absValue.toFixed(decimals ?? 2);
				return `${shouldShowSign ? sign : numValue < 0 ? '-' : ''}${formatted}%`;
			}

			case 'percentPlain': {
				return `${numValue.toFixed(decimals ?? 2)}%`;
			}

			case 'currency':
				return formatters.currency.format(numValue);

			case 'pnl': {
				const formatted = formatters.number.format(absValue);
				return `${sign}$${formatted}`;
			}

			case 'price': {
				if (absValue === 0) return '0.00';
				if (absValue < 0.0001) return numValue.toPrecision(decimals ?? 4);
				if (absValue < 1) return numValue.toFixed(decimals ?? 6);
				if (absValue < 1000) return numValue.toFixed(decimals ?? 4);
				return formatters.number.format(numValue);
			}

			case 'quantity':
				return formatters.quantity.format(numValue);

			case 'compact': {
				if (absValue >= 1e9) return `${(numValue / 1e9).toFixed(decimals ?? 2)}B`;
				if (absValue >= 1e6) return `${(numValue / 1e6).toFixed(decimals ?? 2)}M`;
				if (absValue >= 1e3) return `${(numValue / 1e3).toFixed(decimals ?? 1)}K`;
				return numValue.toFixed(decimals ?? 0);
			}

			case 'duration': {
				// Input assumed in microseconds
				const us = absValue;
				if (us < 1000) return `${us.toFixed(decimals ?? 0)}µs`;
				if (us < 1000000) return `${(us / 1000).toFixed(decimals ?? 1)}ms`;
				return `${(us / 1000000).toFixed(decimals ?? 2)}s`;
			}

			case 'bytes': {
				const bytes = absValue;
				if (bytes < 1024) return `${bytes.toFixed(decimals ?? 0)}B`;
				if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(decimals ?? 1)}KB`;
				if (bytes < 1024 * 1024 * 1024)
					return `${(bytes / (1024 * 1024)).toFixed(decimals ?? 2)}MB`;
				return `${(bytes / (1024 * 1024 * 1024)).toFixed(decimals ?? 2)}GB`;
			}

			case 'bps':
				return `${numValue.toFixed(decimals ?? 1)}bp`;

			case 'ratio':
				return `${numValue.toFixed(decimals ?? 2)}x`;

			default:
				return formatters.number.format(numValue);
		}
	});

	// Check if value should be masked
	const isMasked = $derived(sensitive && privacy.enabled);

	// Full display with prefix/suffix (or masked)
	const displayValue = $derived(
		isMasked ? PRIVACY_MASK : `${prefix}${formattedValue}${suffix}`
	);

	// Aria label for accessibility (full precision, or hidden notice)
	const ariaLabel = $derived(
		isMasked ? 'Value hidden for privacy' : isValid ? `${numValue}` : 'No value'
	);

	// Size classes
	const sizeClasses: Record<NumericSize, string> = {
		xs: 'text-[10px]',
		sm: 'text-[11px]',
		md: 'text-[13px]',
		lg: 'text-base',
		xl: 'text-xl'
	};

	// Variant classes
	const variantClasses: Record<NumericVariant, string> = {
		default: 'text-text-primary',
		positive: 'text-positive',
		negative: 'text-negative',
		muted: 'text-text-muted',
		accent: 'text-accent-brand'
	};
</script>

<span
	class="font-mono font-medium tabular-nums whitespace-nowrap {sizeClasses[size]} {variantClasses[effectiveVariant]} {animate ? 'transition-colors duration-150' : ''} {isMasked ? 'tracking-wider select-none' : ''} {className}"
	aria-label={ariaLabel}
>
	{displayValue}
</span>
