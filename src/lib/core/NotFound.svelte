<script lang="ts" module>
	export interface NotFoundProps {
		/** Page title */
		title?: string;
		/** Description message */
		description?: string;
		/** Back button text */
		backText?: string;
		/** Back button href */
		backHref?: string;
		/** Home button text */
		homeText?: string;
		/** Home button href */
		homeHref?: string;
		/** Show home button */
		showHome?: boolean;
		/** Show back button */
		showBack?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Custom content slot */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { FileQuestion } from '@lucide/svelte';
	import Button from './Button.svelte';
	import { cn } from '../utils/cn';

	let {
		title = 'Page not found',
		description = "The page you're looking for doesn't exist or has been moved.",
		backText = 'Go back',
		backHref,
		homeText = 'Go home',
		homeHref = '/',
		showHome = true,
		showBack = true,
		class: className = '',
		children
	}: NotFoundProps = $props();

	function handleBack() {
		if (typeof window !== 'undefined') {
			window.history.back();
		}
	}
</script>

<div class={cn('min-h-[60vh] flex items-center justify-center p-8', className)}>
	<div class="text-center">
		<div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-bg-tertiary">
			<FileQuestion size={48} class="text-text-muted" />
		</div>

		<p class="mb-2 font-mono text-sm text-text-muted">404</p>
		<h1 class="mb-2 text-xl font-medium text-text-primary">{title}</h1>
		<p class="mb-6 text-sm text-text-muted max-w-sm mx-auto">{description}</p>

		{#if children}
			{@render children()}
		{:else}
			<div class="flex items-center justify-center gap-3">
				{#if showBack}
					{#if backHref}
						<Button variant="outline" href={backHref}>{backText}</Button>
					{:else}
						<Button variant="outline" onclick={handleBack}>{backText}</Button>
					{/if}
				{/if}
				{#if showHome}
					<Button variant="primary" href={homeHref}>{homeText}</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>
