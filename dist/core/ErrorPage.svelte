<script lang="ts" module>
	export interface ErrorPageProps {
		/** HTTP status code */
		status?: number;
		/** Error title */
		title?: string;
		/** Error message/description */
		message?: string;
		/** Stack trace (only shown if showStack is true) */
		stack?: string;
		/** Show stack trace */
		showStack?: boolean;
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
		/** Retry callback */
		onRetry?: () => void;
		/** Show retry button */
		showRetry?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Custom content slot */
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { AlertTriangle, RefreshCw } from '@lucide/svelte';
	import Button from './Button.svelte';
	import { cn } from '../utils/cn';

	let {
		status = 500,
		title,
		message,
		stack,
		showStack = false,
		backText = 'Go back',
		backHref,
		homeText = 'Go home',
		homeHref = '/',
		showHome = true,
		showBack = true,
		onRetry,
		showRetry = false,
		class: className = '',
		children
	}: ErrorPageProps = $props();

	const defaultTitles: Record<number, string> = {
		400: 'Bad request',
		401: 'Unauthorized',
		403: 'Forbidden',
		404: 'Not found',
		500: 'Server error',
		502: 'Bad gateway',
		503: 'Service unavailable',
		504: 'Gateway timeout'
	};

	const defaultMessages: Record<number, string> = {
		400: 'The request could not be understood by the server.',
		401: 'You need to be authenticated to access this resource.',
		403: "You don't have permission to access this resource.",
		404: "The page you're looking for doesn't exist.",
		500: 'Something went wrong on our end. Please try again later.',
		502: 'The server received an invalid response from an upstream server.',
		503: 'The service is temporarily unavailable. Please try again later.',
		504: 'The server took too long to respond.'
	};

	const effectiveTitle = $derived(title ?? defaultTitles[status] ?? 'Something went wrong');
	const effectiveMessage = $derived(message ?? defaultMessages[status] ?? 'An unexpected error occurred.');

	function handleBack() {
		if (typeof window !== 'undefined') {
			window.history.back();
		}
	}
</script>

<div class={cn('min-h-[60vh] flex flex-col items-center justify-center p-8', className)}>
	<div class="flex flex-col items-center text-center max-w-md w-full self-stretch">
		<div class="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-negative/10">
			<AlertTriangle size={48} class="text-negative" />
		</div>

		<p class="mb-3 font-mono text-sm text-text-muted tracking-wider">{status}</p>
		<h1 class="mb-3 text-2xl font-semibold text-text-primary">{effectiveTitle}</h1>
		<p class="mb-8 text-base text-text-secondary leading-relaxed">{effectiveMessage}</p>

		{#if children}
			{@render children()}
		{:else}
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#if showRetry && onRetry}
					<Button variant="outline" onclick={onRetry}>
						<RefreshCw size={16} class="mr-1" />
						Retry
					</Button>
				{/if}
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

		{#if showStack && stack}
			<div class="mt-8 w-full text-left">
				<p class="mb-2 text-xs font-medium text-text-muted uppercase tracking-wide">Stack trace</p>
				<pre class="p-4 bg-bg-tertiary rounded-lg text-xs text-text-secondary overflow-auto max-h-48 font-mono">{stack}</pre>
			</div>
		{/if}
	</div>
</div>
