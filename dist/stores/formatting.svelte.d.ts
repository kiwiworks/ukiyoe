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
 * Create and set the formatting context.
 * Should be called once in a parent layout component.
 */
export declare function setFormattingContext(options?: FormattingContextOptions): FormattingContext;
/**
 * Get the formatting context.
 * Returns context with quoteCurrency and locale.
 * If no context is set, returns sensible defaults.
 */
export declare function getFormattingContext(): FormattingContext;
