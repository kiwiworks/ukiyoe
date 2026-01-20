/**
 * Formatting Context
 *
 * Provides default formatting settings (quote currency, locale) for numeric display.
 * Components like Numeric use this as fallback when props aren't explicitly provided.
 *
 * @example
 * // In layout - set up context
 * import { setFormattingContext } from 'ukiyoe';
 * setFormattingContext({
 *   quoteCurrency: 'EUR',
 *   locale: 'fr-FR'
 * });
 *
 * // In components - Numeric uses context automatically
 * <Numeric value={1234.56} format="currency" />
 * // Renders as "1 234,56 €" (French locale, EUR currency)
 */

import { getContext, setContext } from 'svelte';

const FORMATTING_CONTEXT_KEY = Symbol('formatting');

export interface FormattingContext {
	/** Default quote currency for currency formatting (e.g., 'USD', 'EUR') */
	readonly quoteCurrency: string;
	/** Default locale for number/date formatting (e.g., 'en-US', 'fr-FR') */
	readonly locale: string;
	/** Update the quote currency */
	setQuoteCurrency: (currency: string) => void;
	/** Update the locale */
	setLocale: (locale: string) => void;
}

export interface FormattingContextOptions {
	/** Initial quote currency (default: 'USD') */
	quoteCurrency?: string;
	/** Initial locale (default: navigator.language or 'en-US') */
	locale?: string;
}

/**
 * Get browser locale safely (works in SSR)
 */
function getBrowserLocale(): string {
	if (typeof navigator !== 'undefined' && navigator.language) {
		return navigator.language;
	}
	return 'en-US';
}

/**
 * Create and set the formatting context.
 * Should be called once in a parent layout component.
 */
export function setFormattingContext(options: FormattingContextOptions = {}): FormattingContext {
	let quoteCurrency = $state(options.quoteCurrency ?? 'USD');
	let locale = $state(options.locale ?? getBrowserLocale());

	const context: FormattingContext = {
		get quoteCurrency() {
			return quoteCurrency;
		},
		get locale() {
			return locale;
		},
		setQuoteCurrency(currency: string) {
			quoteCurrency = currency;
		},
		setLocale(newLocale: string) {
			locale = newLocale;
		}
	};

	setContext(FORMATTING_CONTEXT_KEY, context);
	return context;
}

/**
 * Get the formatting context.
 * Returns context with quoteCurrency and locale.
 * If no context is set, returns sensible defaults.
 */
export function getFormattingContext(): FormattingContext {
	const context = getContext<FormattingContext | undefined>(FORMATTING_CONTEXT_KEY);

	if (!context) {
		// Return default non-reactive context
		return {
			quoteCurrency: 'USD',
			locale: getBrowserLocale(),
			setQuoteCurrency: () => {
				console.warn('FormattingContext: Cannot set quoteCurrency without setFormattingContext()');
			},
			setLocale: () => {
				console.warn('FormattingContext: Cannot set locale without setFormattingContext()');
			}
		};
	}

	return context;
}
