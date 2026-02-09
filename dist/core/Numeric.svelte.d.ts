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
export type NumericFormat = 'number' | 'integer' | 'percent' | 'percentPlain' | 'currency' | 'pnl' | 'price' | 'quantity' | 'compact' | 'duration' | 'bytes' | 'bps' | 'ratio';
export type NumericVariant = 'default' | 'positive' | 'negative' | 'muted' | 'accent';
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
declare const Numeric: import("svelte").Component<NumericProps, {}, "">;
type Numeric = ReturnType<typeof Numeric>;
export default Numeric;
