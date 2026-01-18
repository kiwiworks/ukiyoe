<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="h-full w-full flex items-center justify-center py-20">
	<div class="text-center max-w-md mx-auto">
		<div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-bg-tertiary">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted">
				<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
				<path d="M14 2v4a2 2 0 0 0 2 2h4"/>
				<circle cx="10" cy="13" r="2"/>
				<path d="m20 17-1.1-1.1"/>
				<path d="M13.9 14.1 20 20"/>
			</svg>
		</div>

		<p class="mb-2 text-sm text-text-muted">{$page.status}</p>
		<h1 class="mb-3 text-xl font-medium text-text-primary">
			{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="mb-8 text-sm text-text-muted">
			{$page.status === 404
				? "The page you're looking for doesn't exist or has been moved."
				: $page.error?.message ?? 'An unexpected error occurred.'}
		</p>

		<div class="flex items-center justify-center gap-3">
			<button
				onclick={() => history.back()}
				class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-border-default rounded text-text-primary hover:bg-bg-hover transition-colors"
			>
				Go back
			</button>
			<a
				href={base || '/'}
				class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded bg-accent-brand text-text-inverse hover:bg-accent-brand-hover transition-colors"
			>
				Go home
			</a>
		</div>
	</div>
</div>
