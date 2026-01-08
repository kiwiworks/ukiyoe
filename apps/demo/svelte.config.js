import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

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
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
