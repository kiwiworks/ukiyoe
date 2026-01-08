<script lang="ts">
	import '../app.css';
	import { Badge, Header, ThemeProvider, ThemeToggle } from 'ukiyoe';
	import Nav from '$lib/Nav.svelte';
</script>

<ThemeProvider>
	<div class="h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden">
		<Header title="Ukiyoe UI" subtitle="Component Library">
			<ThemeToggle size="sm" />
			<Badge size="xs" variant="brand" text="Alpha" />
		</Header>

		<div class="flex flex-1 pt-[1.75rem] overflow-hidden">
			<Nav />
			<main class="flex-1 overflow-y-auto p-lg">
				<div class="max-w-4xl">
					<slot />
				</div>
			</main>
		</div>
	</div>
</ThemeProvider>
