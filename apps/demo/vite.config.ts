import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'ukiyoe/styles.css': path.resolve(__dirname, '../../src/lib/styles.css')
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('codemirror') || id.includes('@codemirror')) return 'vendor-codemirror';
					if (id.includes('shiki')) return 'vendor-shiki';
					if (id.includes('bits-ui')) return 'vendor-bits-ui';
					if (id.includes('@scalar') || id.includes('ajv')) return 'vendor-openapi';
					if (id.includes('marked')) return 'vendor-marked';
				}
			}
		}
	}
});
