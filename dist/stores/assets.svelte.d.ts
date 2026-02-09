/**
 * Asset Registry
 *
 * Centralized registry for asset metadata including formatting rules and icon URLs.
 * Uses CoinGecko CDN for crypto asset icons.
 *
 * @example
 * // In layout - set up context with custom assets
 * import { setAssetContext } from 'ukiyoe';
 * setAssetContext({
 *   customAssets: {
 *     MYTOKEN: { symbol: 'MYTOKEN', type: 'crypto', decimals: 18, coingeckoId: 'my-token' }
 *   }
 * });
 *
 * // In components - get asset info
 * import { getAssetContext } from 'ukiyoe';
 * const assets = getAssetContext();
 * const btcIcon = assets.getIconUrl('BTC');
 * const btcFormat = assets.getFormat('BTC');
 */
export type AssetType = 'fiat' | 'crypto' | 'stablecoin';
export interface AssetFormat {
    /** Asset symbol (e.g., 'BTC', 'USD') */
    symbol: string;
    /** Human-readable name */
    name?: string;
    /** Asset type for formatting behavior */
    type: AssetType;
    /** Display decimals (default: 2 for fiat, 8 for crypto) */
    decimals: number;
    /** Minimum decimals to show */
    minDecimals?: number;
    /** Prefix for display (e.g., '$', '€') */
    prefix?: string;
    /** Suffix for display (e.g., ' BTC', ' ETH') */
    suffix?: string;
    /** Unicode symbol for fiat currencies */
    unicode?: string;
    /** CoinGecko coin ID for icon lookup */
    coingeckoId?: string;
    /** CoinGecko image ID (number) for direct CDN access */
    coingeckoImageId?: number;
    /** Custom icon URL (overrides CoinGecko) */
    iconUrl?: string;
}
export interface AssetContext {
    /** Get format config for an asset */
    getFormat(symbol: string): AssetFormat | undefined;
    /** Get icon URL for an asset (CoinGecko CDN) */
    getIconUrl(symbol: string, size?: 'thumb' | 'small' | 'large'): string | undefined;
    /** Get unicode symbol for an asset (fiat only) */
    getUnicode(symbol: string): string | undefined;
    /** Check if asset is registered */
    has(symbol: string): boolean;
    /** Register a custom asset */
    register(asset: AssetFormat): void;
    /** Register multiple assets */
    registerMany(assets: AssetFormat[]): void;
    /** Get all registered asset symbols */
    symbols(): string[];
}
export interface AssetContextOptions {
    /** Custom assets to register on init */
    customAssets?: Record<string, AssetFormat>;
    /** Override default assets */
    overrideDefaults?: boolean;
}
/**
 * Create and set the asset context.
 * Should be called once in a parent layout component.
 */
export declare function setAssetContext(options?: AssetContextOptions): AssetContext;
/**
 * Get the asset context.
 * Returns a context with asset lookup methods.
 * If no context is set, returns a default context with built-in assets.
 */
export declare function getAssetContext(): AssetContext;
/**
 * Get default decimals for an asset type
 */
export declare function getDefaultDecimals(type: AssetType): number;
