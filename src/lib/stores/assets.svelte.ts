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

import { getContext, setContext } from 'svelte';

const ASSET_CONTEXT_KEY = Symbol('assets');

// CoinGecko CDN base URL
const COINGECKO_CDN = 'https://assets.coingecko.com/coins/images';

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

// Built-in asset registry with common assets
// CoinGecko image IDs sourced from their API
const DEFAULT_ASSETS: Record<string, AssetFormat> = {
	// Fiat currencies
	USD: { symbol: 'USD', name: 'US Dollar', type: 'fiat', decimals: 2, prefix: '$', unicode: '$' },
	EUR: { symbol: 'EUR', name: 'Euro', type: 'fiat', decimals: 2, prefix: '€', unicode: '€' },
	GBP: { symbol: 'GBP', name: 'British Pound', type: 'fiat', decimals: 2, prefix: '£', unicode: '£' },
	JPY: { symbol: 'JPY', name: 'Japanese Yen', type: 'fiat', decimals: 0, prefix: '¥', unicode: '¥' },
	CHF: { symbol: 'CHF', name: 'Swiss Franc', type: 'fiat', decimals: 2, prefix: 'CHF ', unicode: '₣' },
	CAD: { symbol: 'CAD', name: 'Canadian Dollar', type: 'fiat', decimals: 2, prefix: 'C$', unicode: '$' },
	AUD: { symbol: 'AUD', name: 'Australian Dollar', type: 'fiat', decimals: 2, prefix: 'A$', unicode: '$' },
	CNY: { symbol: 'CNY', name: 'Chinese Yuan', type: 'fiat', decimals: 2, prefix: '¥', unicode: '¥' },
	KRW: { symbol: 'KRW', name: 'South Korean Won', type: 'fiat', decimals: 0, prefix: '₩', unicode: '₩' },
	INR: { symbol: 'INR', name: 'Indian Rupee', type: 'fiat', decimals: 2, prefix: '₹', unicode: '₹' },

	// Major cryptocurrencies (with CoinGecko image IDs)
	BTC: { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', decimals: 8, suffix: ' BTC', coingeckoId: 'bitcoin', coingeckoImageId: 1 },
	ETH: { symbol: 'ETH', name: 'Ethereum', type: 'crypto', decimals: 6, suffix: ' ETH', coingeckoId: 'ethereum', coingeckoImageId: 279 },
	SOL: { symbol: 'SOL', name: 'Solana', type: 'crypto', decimals: 4, suffix: ' SOL', coingeckoId: 'solana', coingeckoImageId: 4128 },
	BNB: { symbol: 'BNB', name: 'BNB', type: 'crypto', decimals: 4, suffix: ' BNB', coingeckoId: 'binancecoin', coingeckoImageId: 825 },
	XRP: { symbol: 'XRP', name: 'XRP', type: 'crypto', decimals: 4, suffix: ' XRP', coingeckoId: 'ripple', coingeckoImageId: 44 },
	ADA: { symbol: 'ADA', name: 'Cardano', type: 'crypto', decimals: 4, suffix: ' ADA', coingeckoId: 'cardano', coingeckoImageId: 975 },
	AVAX: { symbol: 'AVAX', name: 'Avalanche', type: 'crypto', decimals: 4, suffix: ' AVAX', coingeckoId: 'avalanche-2', coingeckoImageId: 12559 },
	DOT: { symbol: 'DOT', name: 'Polkadot', type: 'crypto', decimals: 4, suffix: ' DOT', coingeckoId: 'polkadot', coingeckoImageId: 12171 },
	MATIC: { symbol: 'MATIC', name: 'Polygon', type: 'crypto', decimals: 4, suffix: ' MATIC', coingeckoId: 'matic-network', coingeckoImageId: 4713 },
	LINK: { symbol: 'LINK', name: 'Chainlink', type: 'crypto', decimals: 4, suffix: ' LINK', coingeckoId: 'chainlink', coingeckoImageId: 877 },
	ATOM: { symbol: 'ATOM', name: 'Cosmos', type: 'crypto', decimals: 4, suffix: ' ATOM', coingeckoId: 'cosmos', coingeckoImageId: 1481 },
	LTC: { symbol: 'LTC', name: 'Litecoin', type: 'crypto', decimals: 6, suffix: ' LTC', coingeckoId: 'litecoin', coingeckoImageId: 2 },
	UNI: { symbol: 'UNI', name: 'Uniswap', type: 'crypto', decimals: 4, suffix: ' UNI', coingeckoId: 'uniswap', coingeckoImageId: 12504 },
	AAVE: { symbol: 'AAVE', name: 'Aave', type: 'crypto', decimals: 4, suffix: ' AAVE', coingeckoId: 'aave', coingeckoImageId: 12645 },
	ARB: { symbol: 'ARB', name: 'Arbitrum', type: 'crypto', decimals: 4, suffix: ' ARB', coingeckoId: 'arbitrum', coingeckoImageId: 16547 },
	OP: { symbol: 'OP', name: 'Optimism', type: 'crypto', decimals: 4, suffix: ' OP', coingeckoId: 'optimism', coingeckoImageId: 25244 },

	// Stablecoins
	USDT: { symbol: 'USDT', name: 'Tether', type: 'stablecoin', decimals: 2, suffix: ' USDT', coingeckoId: 'tether', coingeckoImageId: 325 },
	USDC: { symbol: 'USDC', name: 'USD Coin', type: 'stablecoin', decimals: 2, suffix: ' USDC', coingeckoId: 'usd-coin', coingeckoImageId: 6319 },
	DAI: { symbol: 'DAI', name: 'Dai', type: 'stablecoin', decimals: 2, suffix: ' DAI', coingeckoId: 'dai', coingeckoImageId: 9956 },
	BUSD: { symbol: 'BUSD', name: 'Binance USD', type: 'stablecoin', decimals: 2, suffix: ' BUSD', coingeckoId: 'binance-usd', coingeckoImageId: 9576 },
};

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
export function setAssetContext(options: AssetContextOptions = {}): AssetContext {
	const { customAssets = {}, overrideDefaults = false } = options;

	// Initialize registry with defaults + custom
	const registry = $state<Map<string, AssetFormat>>(
		new Map(
			Object.entries(overrideDefaults ? customAssets : { ...DEFAULT_ASSETS, ...customAssets })
		)
	);

	const context: AssetContext = {
		getFormat(symbol: string): AssetFormat | undefined {
			// Try exact match first, then uppercase
			return registry.get(symbol) ?? registry.get(symbol.toUpperCase());
		},

		getIconUrl(symbol: string, size: 'thumb' | 'small' | 'large' = 'small'): string | undefined {
			const format = this.getFormat(symbol);
			if (!format) return undefined;

			// Custom URL takes priority
			if (format.iconUrl) return format.iconUrl;

			// CoinGecko CDN for crypto/stablecoin
			if (format.coingeckoImageId && (format.type === 'crypto' || format.type === 'stablecoin')) {
				return `${COINGECKO_CDN}/${format.coingeckoImageId}/${size}/${format.coingeckoId}.png`;
			}

			// No icon for fiat (they use unicode symbols)
			return undefined;
		},

		getUnicode(symbol: string): string | undefined {
			return this.getFormat(symbol)?.unicode;
		},

		has(symbol: string): boolean {
			return registry.has(symbol) || registry.has(symbol.toUpperCase());
		},

		register(asset: AssetFormat): void {
			registry.set(asset.symbol, asset);
		},

		registerMany(assets: AssetFormat[]): void {
			for (const asset of assets) {
				registry.set(asset.symbol, asset);
			}
		},

		symbols(): string[] {
			return Array.from(registry.keys());
		}
	};

	setContext(ASSET_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the asset context.
 * Returns a context with asset lookup methods.
 * If no context is set, returns a default context with built-in assets.
 */
export function getAssetContext(): AssetContext {
	const context = getContext<AssetContext | undefined>(ASSET_CONTEXT_KEY);

	if (!context) {
		// Return a default read-only context with built-in assets
		const defaultRegistry = new Map(Object.entries(DEFAULT_ASSETS));

		return {
			getFormat(symbol: string): AssetFormat | undefined {
				return defaultRegistry.get(symbol) ?? defaultRegistry.get(symbol.toUpperCase());
			},
			getIconUrl(symbol: string, size: 'thumb' | 'small' | 'large' = 'small'): string | undefined {
				const format = this.getFormat(symbol);
				if (!format) return undefined;
				if (format.iconUrl) return format.iconUrl;
				if (format.coingeckoImageId && (format.type === 'crypto' || format.type === 'stablecoin')) {
					return `${COINGECKO_CDN}/${format.coingeckoImageId}/${size}/${format.coingeckoId}.png`;
				}
				return undefined;
			},
			getUnicode(symbol: string): string | undefined {
				return this.getFormat(symbol)?.unicode;
			},
			has(symbol: string): boolean {
				return defaultRegistry.has(symbol) || defaultRegistry.has(symbol.toUpperCase());
			},
			register(): void {
				console.warn('AssetContext: Cannot register assets without setAssetContext()');
			},
			registerMany(): void {
				console.warn('AssetContext: Cannot register assets without setAssetContext()');
			},
			symbols(): string[] {
				return Array.from(defaultRegistry.keys());
			}
		};
	}

	return context;
}

/**
 * Get default decimals for an asset type
 */
export function getDefaultDecimals(type: AssetType): number {
	switch (type) {
		case 'fiat':
			return 2;
		case 'stablecoin':
			return 2;
		case 'crypto':
			return 8;
		default:
			return 2;
	}
}
