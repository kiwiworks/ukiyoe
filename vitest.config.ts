import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [svelte({ hot: false })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['src/lib/test/setup.ts'],
		deps: {
			// Process svelte files in these packages
			inline: [/bits-ui/, /@lucide\/svelte/]
		}
	},
	resolve: {
		conditions: ['browser']
	}
});
