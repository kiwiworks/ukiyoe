<script lang="ts" module>
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
</script>

<script lang="ts">
	let {
		title,
		siteName,
		description,
		url,
		image,
		imageAlt,
		type = 'website',
		twitterCard = 'summary_large_image',
		twitterSite,
		themeColor,
		robots,
		publishedTime,
		author,
		keywords,
		locale = 'en_US'
	}: MetaProps = $props();

	const fullTitle = $derived(
		title && siteName ? `${title} | ${siteName}` : title || siteName || ''
	);
</script>

<svelte:head>
	{#if fullTitle}
		<title>{fullTitle}</title>
		<meta property="og:title" content={title || siteName} />
		<meta name="twitter:title" content={title || siteName} />
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}

	{#if url}
		<link rel="canonical" href={url} />
		<meta property="og:url" content={url} />
	{/if}

	{#if image}
		<meta property="og:image" content={image} />
		<meta name="twitter:image" content={image} />
		{#if imageAlt}
			<meta property="og:image:alt" content={imageAlt} />
			<meta name="twitter:image:alt" content={imageAlt} />
		{/if}
	{/if}

	{#if siteName}
		<meta property="og:site_name" content={siteName} />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:locale" content={locale} />
	<meta name="twitter:card" content={twitterCard} />

	{#if twitterSite}
		<meta name="twitter:site" content="@{twitterSite}" />
	{/if}

	{#if themeColor}
		<meta name="theme-color" content={themeColor} />
	{/if}

	{#if robots}
		<meta name="robots" content={robots} />
	{/if}

	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
	{/if}

	{#if author}
		<meta name="author" content={author} />
		<meta property="article:author" content={author} />
	{/if}

	{#if keywords?.length}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
</svelte:head>
