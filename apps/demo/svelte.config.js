import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {ReturnType<typeof createHighlighter> | null} */
let highlighterPromise = null;

async function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-dark', 'github-light'],
			langs: ['typescript', 'javascript', 'svelte', 'html', 'css', 'json', 'bash', 'shell']
		});
	}
	return highlighterPromise;
}

/**
 * Escape a string for use in a Svelte template literal
 * @param {string} str
 */
function escapeTemplateLiteral(str) {
	return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang, meta) => {
			const highlighter = await getHighlighter();
			const language = lang || 'text';

			// Use shiki's dual-theme CSS variables approach
			const html = highlighter.codeToHtml(code, {
				lang: language,
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				},
				defaultColor: false
			});

			const escapedHtml = escapeTemplateLiteral(html);

			// Check if this is a preview block
			if (meta?.includes('preview')) {
				const escapedCode = escapeTemplateLiteral(code);

				// Extract title from meta
				const titleMatch = meta.match(/title="([^"]+)"/);
				const titleProp = titleMatch ? ` title="${titleMatch[1]}"` : '';

				// Return ComponentPreview with highlighted HTML as prop
				return `<ComponentPreview code={\`${escapedCode}\`} lang="${language}"${titleProp} highlightedHtml={\`${escapedHtml}\`}>
${code}
</ComponentPreview>`;
			}

			// Regular code block
			return `{@html \`${escapedHtml}\`}`;
		}
	},
	smartypants: {
		dashes: 'oldschool'
	},
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: {
					class: 'heading-anchor'
				}
			}
		]
	]
};

// Base path for GitHub Pages - set via env var for flexibility
const base = process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: false
		}),
		paths: {
			base
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Log warning but don't fail build - some components have SSR issues
				// TODO: Fix SSR compatibility for WebGL effects and lucide icons
				console.warn(`Prerender warning for ${path}: ${message}`);
			}
		}
	}
};

export default config;
