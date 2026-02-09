/**
 * AssetIcon - displays currency icon for crypto/fiat.
 *
 * Automatically looks up icons from the asset registry if no logoUri is provided.
 * Uses CoinGecko CDN for crypto assets, unicode symbols for fiat.
 *
 * Fallback chain:
 * 1. If logoUri provided: shows image
 * 2. If symbol in registry with icon: shows CoinGecko image
 * 3. If symbol in registry with unicode: shows unicode symbol
 * 4. Otherwise: shows first 2 chars of symbol
 *
 * @example
 * <AssetIcon symbol="BTC" />           // Auto-fetches from CoinGecko
 * <AssetIcon symbol="USD" />           // Shows $ unicode
 * <AssetIcon symbol="BTC" logoUri={customUrl} />  // Uses custom URL
 */
export type AssetIconSize = 'xs' | 'sm' | 'md' | 'lg';
export interface AssetIconProps {
    /** Asset symbol (e.g., "BTC", "USD"). Used for registry lookup. */
    symbol: string;
    /** Logo URI for the asset. Overrides registry lookup. */
    logoUri?: string | null;
    /** Unicode symbol (for fiat like "$", "€"). Overrides registry lookup. */
    unicode?: string | null;
    /** Size preset. */
    size?: AssetIconSize;
    /** Custom CSS class. */
    class?: string;
}
declare const AssetIcon: import("svelte").Component<AssetIconProps, {}, "">;
type AssetIcon = ReturnType<typeof AssetIcon>;
export default AssetIcon;
