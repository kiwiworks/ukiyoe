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
	 * - Asset-aware formatting via asset registry
	 * - Context-based defaults for currency and locale
	 *
	 * @example
	 * // Basic usage
	 * <Numeric value={1234.56} format="currency" />
	 * <Numeric value={-5.25} format="percent" colorBySign />
	 *
	 * // Asset-based formatting (uses asset registry)
	 * <Numeric value={0.00123456} asset="BTC" />
	 * <Numeric value={1234.56} asset="EUR" />
	 *
	 * // Privacy mode
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
	export type NumericSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface NumericProps {
		/** The numeric value to display */
		value: number | string | null | undefined;

		/** Format type (default: 'number'). Ignored if `asset` is provided. */
		format?: NumericFormat;

		/**
		 * Asset symbol for asset-aware formatting (e.g., 'BTC', 'EUR', 'USDT').
		 * When provided, formatting rules are looked up from the asset registry.
		 * Takes precedence over `format`, `currency`, `decimals`, `prefix`, `suffix`.
		 */
		asset?: string;

		/** Number of decimal places (overrides format/asset default) */
		decimals?: number;

		/** Color variant (default: 'default') */
		variant?: NumericVariant;

		/** Auto-color based on sign (default: false) */
		colorBySign?: boolean;

		/** Size preset (default: 'md') */
		size?: NumericSize;

		/** Show +/- sign for positive/negative (default: depends on format) */
		showSign?: boolean;

		/** Prefix string (e.g., '$', '€'). Overrides asset prefix. */
		prefix?: string;

		/** Suffix string (e.g., '%', 'bp', 'x'). Overrides asset suffix. */
		suffix?: string;

		/** Locale for number formatting. Falls back to FormattingContext, then 'en-US'. */
		locale?: string;

		/** Currency code for currency format. Falls back to FormattingContext quoteCurrency. */
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
	import { getFormattingContext } from '../stores/formatting.svelte';
	import { getAssetContext } from '../stores/assets.svelte';
	import { cn } from '../utils/cn';
	import {
		formatNumber,
		formatPercent,
		formatCompact,
		formatDuration,
		formatBytes,
		formatCurrency,
		formatBps,
		formatRatio
	} from '../utils/format';

	let {
		value,
		format = 'number',
		asset,
		decimals,
		variant = 'default',
		colorBySign = false,
		size = 'md',
		showSign,
		prefix,
		suffix,
		locale,
		currency,
		placeholder = '-',
		animate = false,
		class: className = '',
		sensitive = false
	}: NumericProps = $props();

	// Get contexts for defaults
	const formattingCtx = getFormattingContext();
	const assetCtx = getAssetContext();

	// Resolve asset format if asset prop is provided
	const assetFormat = $derived(asset ? assetCtx.getFormat(asset) : undefined);

	// Effective values with fallback chain: prop → asset → context → default
	const effectiveLocale = $derived(locale ?? formattingCtx.locale ?? 'en-US');
	const effectiveCurrency = $derived(currency ?? formattingCtx.quoteCurrency ?? 'USD');
	const effectiveDecimals = $derived(decimals ?? assetFormat?.decimals);
	const effectivePrefix = $derived(prefix ?? assetFormat?.prefix ?? '');
	const effectiveSuffix = $derived(suffix ?? assetFormat?.suffix ?? '');

	// Determine effective format based on asset type
	const effectiveFormat = $derived.by(() => {
		if (!asset) return format;
		if (!assetFormat) return format;

		// Map asset type to format
		switch (assetFormat.type) {
			case 'fiat':
				return 'currency';
			case 'crypto':
				return 'quantity';
			case 'stablecoin':
				return 'number'; // Stablecoins use number format with suffix
			default:
				return format;
		}
	});

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

	// Format the value based on format type
	const formattedValue = $derived.by(() => {
		if (!isValid) return placeholder;

		const absValue = Math.abs(numValue);
		const sign = numValue >= 0 ? '+' : '-';
		const fmt = effectiveFormat;
		const dec = effectiveDecimals;
		const loc = effectiveLocale;
		const shouldShowSign = showSign ?? ['percent', 'pnl'].includes(fmt);

		switch (fmt) {
			case 'number':
				return formatNumber(numValue, { locale: loc, decimals: dec ?? 2 });

			case 'integer':
				return formatNumber(Math.round(numValue), { locale: loc, decimals: 0 });

			case 'percent':
				return formatPercent(numValue, { decimals: dec ?? 2, showSign: shouldShowSign });

			case 'percentPlain':
				return formatPercent(numValue, { decimals: dec ?? 2, showSign: false });

			case 'currency':
				return formatCurrency(numValue, effectiveCurrency, { locale: loc, decimals: dec ?? 2 });

			case 'pnl': {
				const formatted = formatNumber(absValue, { locale: loc, decimals: dec ?? 2 });
				// Use asset prefix if available (e.g., '€'), otherwise '$'
				const currencySymbol = assetFormat?.prefix ?? '$';
				return `${sign}${currencySymbol}${formatted}`;
			}

			case 'price': {
				// Price has Numeric-specific auto-precision tiers
				if (absValue === 0) return '0.00';
				if (absValue < 0.0001) return numValue.toPrecision(dec ?? 4);
				if (absValue < 1) return numValue.toFixed(dec ?? 6);
				if (absValue < 1000) return numValue.toFixed(dec ?? 4);
				return formatNumber(numValue, { locale: loc, decimals: dec ?? 2 });
			}

			case 'quantity':
				return formatNumber(numValue, { locale: loc, decimals: dec ?? 8 });

			case 'compact':
				return formatCompact(numValue, { decimals: dec });

			case 'duration':
				return formatDuration(absValue, { decimals: dec });

			case 'bytes':
				return formatBytes(absValue, { decimals: dec });

			case 'bps':
				return formatBps(numValue, { decimals: dec ?? 1 });

			case 'ratio':
				return formatRatio(numValue, { decimals: dec ?? 2 });

			default:
				return formatNumber(numValue, { locale: loc, decimals: dec ?? 2 });
		}
	});

	// Check if value should be masked
	const isMasked = $derived(sensitive && privacy.enabled);

	// Full display with prefix/suffix (or masked)
	// Note: For currency format, Intl already includes the symbol, so skip prefix
	const displayValue = $derived.by(() => {
		if (isMasked) return PRIVACY_MASK;

		// Currency format already includes the symbol via Intl.NumberFormat
		if (effectiveFormat === 'currency') {
			return formattedValue;
		}

		return `${effectivePrefix}${formattedValue}${effectiveSuffix}`;
	});

	// Aria label for accessibility (full precision, or hidden notice)
	const ariaLabel = $derived(
		isMasked ? 'Value hidden for privacy' : isValid ? `${numValue}` : 'No value'
	);

	// Size classes
	const sizeClasses: Record<NumericSize, string> = {
		xs: 'text-[11px]',
		sm: 'text-xs',
		md: 'text-[13px]',
		lg: 'text-base'
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
	class={cn('font-mono font-medium tabular-nums whitespace-nowrap', sizeClasses[size], variantClasses[effectiveVariant], animate && 'transition-colors duration-150', isMasked && 'tracking-wider select-none', className)}
	aria-label={ariaLabel}
>
	{displayValue}
</span>
