export interface FormatOptions {
    locale?: string;
    decimals?: number;
}
export interface FormatPercentOptions extends FormatOptions {
    showSign?: boolean;
}
/** Format a number with grouping separators: 1,234.56 */
export declare function formatNumber(value: number, opts?: FormatOptions): string;
/** Format as percentage: +12.34% or 12.34% */
export declare function formatPercent(value: number, opts?: FormatPercentOptions): string;
/** Format with compact notation: 1.5M, 2.3K */
export declare function formatCompact(value: number, opts?: FormatOptions): string;
/** Format microseconds as human-readable duration: 500µs, 1.2ms, 2.5s */
export declare function formatDuration(microseconds: number, opts?: FormatOptions): string;
/** Format bytes with 1024-based units: 1.2KB, 500MB, 2GB */
export declare function formatBytes(bytes: number, opts?: FormatOptions): string;
/** Format as currency using Intl: $1,234.56 */
export declare function formatCurrency(value: number, currency: string, opts?: FormatOptions): string;
/** Format as basis points: 12.5bp */
export declare function formatBps(value: number, opts?: FormatOptions): string;
/** Format as ratio: 1.25x */
export declare function formatRatio(value: number, opts?: FormatOptions): string;
/** Format as token rate: 12.3 tok/s */
export declare function formatTokenRate(value: number, opts?: FormatOptions): string;
/** Format milliseconds as human-readable elapsed: 500ms, 1.2s, 1m 3s */
export declare function formatElapsed(ms: number): string;
