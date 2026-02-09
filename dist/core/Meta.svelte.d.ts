export interface MetaProps {
    /** Page title - will be used for <title> and og:title */
    title?: string;
    /** Site name - appended to title as "Page | Site Name" */
    siteName?: string;
    /** Page description - used for meta description and og:description */
    description?: string;
    /** Canonical URL of the page */
    url?: string;
    /** Open Graph image URL (recommended: 1200x630px) */
    image?: string;
    /** Alt text for the Open Graph image */
    imageAlt?: string;
    /** Open Graph type (default: website) */
    type?: 'website' | 'article' | 'profile' | 'product';
    /** Twitter card type (default: summary_large_image) */
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    /** Twitter username (without @) */
    twitterSite?: string;
    /** Theme color for browser UI */
    themeColor?: string;
    /** Robots directive */
    robots?: string;
    /** Article publish date (ISO 8601) */
    publishedTime?: string;
    /** Article author */
    author?: string;
    /** Keywords for SEO */
    keywords?: string[];
    /** Locale (default: en_US) */
    locale?: string;
}
declare const Meta: import("svelte").Component<MetaProps, {}, "">;
type Meta = ReturnType<typeof Meta>;
export default Meta;
