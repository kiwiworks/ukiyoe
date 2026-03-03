// Internal cache keyed by "locale:options-hash"
const formatterCache = new Map();
function getFormatter(locale, options) {
    const key = `${locale}:${JSON.stringify(options)}`;
    let fmt = formatterCache.get(key);
    if (!fmt) {
        fmt = new Intl.NumberFormat(locale, options);
        formatterCache.set(key, fmt);
    }
    return fmt;
}
/** Format a number with grouping separators: 1,234.56 */
export function formatNumber(value, opts) {
    const locale = opts?.locale ?? 'en-US';
    const decimals = opts?.decimals ?? 2;
    return getFormatter(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}
/** Format as percentage: +12.34% or 12.34% */
export function formatPercent(value, opts) {
    const decimals = opts?.decimals ?? 2;
    const showSign = opts?.showSign ?? false;
    const abs = Math.abs(value);
    const formatted = abs.toFixed(decimals);
    if (showSign) {
        const sign = value >= 0 ? '+' : '-';
        return `${sign}${formatted}%`;
    }
    return `${value < 0 ? '-' : ''}${formatted}%`;
}
/** Format with compact notation: 1.5M, 2.3K */
export function formatCompact(value, opts) {
    const decimals = opts?.decimals;
    const abs = Math.abs(value);
    if (abs >= 1e9)
        return `${(value / 1e9).toFixed(decimals ?? 2)}B`;
    if (abs >= 1e6)
        return `${(value / 1e6).toFixed(decimals ?? 2)}M`;
    if (abs >= 1e3)
        return `${(value / 1e3).toFixed(decimals ?? 1)}K`;
    return value.toFixed(decimals ?? 0);
}
/** Format microseconds as human-readable duration: 500µs, 1.2ms, 2.5s */
export function formatDuration(microseconds, opts) {
    const decimals = opts?.decimals;
    const abs = Math.abs(microseconds);
    if (abs < 1000)
        return `${abs.toFixed(decimals ?? 0)}µs`;
    if (abs < 1_000_000)
        return `${(abs / 1000).toFixed(decimals ?? 1)}ms`;
    return `${(abs / 1_000_000).toFixed(decimals ?? 2)}s`;
}
/** Format bytes with 1024-based units: 1.2KB, 500MB, 2GB */
export function formatBytes(bytes, opts) {
    const decimals = opts?.decimals;
    const abs = Math.abs(bytes);
    if (abs < 1024)
        return `${abs.toFixed(decimals ?? 0)}B`;
    if (abs < 1024 * 1024)
        return `${(abs / 1024).toFixed(decimals ?? 1)}KB`;
    if (abs < 1024 * 1024 * 1024)
        return `${(abs / (1024 * 1024)).toFixed(decimals ?? 2)}MB`;
    return `${(abs / (1024 * 1024 * 1024)).toFixed(decimals ?? 2)}GB`;
}
/** Format as currency using Intl: $1,234.56 */
export function formatCurrency(value, currency, opts) {
    const locale = opts?.locale ?? 'en-US';
    const decimals = opts?.decimals ?? 2;
    return getFormatter(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}
/** Format as basis points: 12.5bp */
export function formatBps(value, opts) {
    const decimals = opts?.decimals ?? 1;
    return `${value.toFixed(decimals)}bp`;
}
/** Format as ratio: 1.25x */
export function formatRatio(value, opts) {
    const decimals = opts?.decimals ?? 2;
    return `${value.toFixed(decimals)}x`;
}
/** Format as token rate: 12.3 tok/s */
export function formatTokenRate(value, opts) {
    const decimals = opts?.decimals ?? 1;
    return `${value.toFixed(decimals)} tok/s`;
}
/** Format milliseconds as human-readable elapsed: 500ms, 1.2s, 1m 3s */
export function formatElapsed(ms) {
    if (ms < 1000)
        return `${ms}ms`;
    const seconds = ms / 1000;
    if (seconds < 60)
        return `${seconds.toFixed(1)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s`;
}
