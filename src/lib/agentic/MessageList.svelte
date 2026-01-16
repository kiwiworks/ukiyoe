<script lang="ts" module>
	export interface MessageListProps {
		/** Enable auto-scroll to bottom on new messages */
		autoscroll?: boolean;
		/** Called when user scrolls to top (for loading history) */
		onLoadMore?: () => void;
		/** Show loading indicator at top */
		loadingMore?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Message content */
		children: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { Loader2 } from '@lucide/svelte';

	let {
		autoscroll = true,
		onLoadMore,
		loadingMore = false,
		class: className = '',
		children
	}: MessageListProps = $props();

	let containerRef: HTMLDivElement | undefined = $state();
	let isUserScrolling = $state(false);
	let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

	// Auto-scroll to bottom when content changes
	$effect(() => {
		if (!containerRef || !autoscroll || isUserScrolling) return;

		// Use mutation observer to detect content changes
		const observer = new MutationObserver(() => {
			if (!isUserScrolling) {
				containerRef?.scrollTo({
					top: containerRef.scrollHeight,
					behavior: 'smooth'
				});
			}
		});

		observer.observe(containerRef, {
			childList: true,
			subtree: true,
			characterData: true
		});

		return () => observer.disconnect();
	});

	function handleScroll() {
		if (!containerRef) return;

		// Clear previous timeout
		if (scrollTimeout) clearTimeout(scrollTimeout);

		// Check if user is at bottom
		const { scrollTop, scrollHeight, clientHeight } = containerRef;
		const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

		// User is manually scrolling if not at bottom
		isUserScrolling = !isAtBottom;

		// Reset after user stops scrolling and is at bottom
		scrollTimeout = setTimeout(() => {
			if (isAtBottom) isUserScrolling = false;
		}, 150);

		// Load more when near top
		if (scrollTop < 100 && onLoadMore && !loadingMore) {
			onLoadMore();
		}
	}

	export function scrollToBottom(smooth = true) {
		containerRef?.scrollTo({
			top: containerRef.scrollHeight,
			behavior: smooth ? 'smooth' : 'instant'
		});
		isUserScrolling = false;
	}
</script>

<div
	bind:this={containerRef}
	class="flex flex-col gap-4 overflow-y-auto overscroll-contain {className}"
	onscroll={handleScroll}
	role="log"
	aria-live="polite"
	aria-label="Conversation messages"
>
	<!-- Loading more indicator -->
	{#if loadingMore}
		<div class="flex justify-center py-4">
			<Loader2 size={20} class="text-text-muted animate-spin" />
		</div>
	{/if}

	{@render children()}

	<!-- Scroll anchor for auto-scroll -->
	<div class="shrink-0 h-px"></div>
</div>

<!-- Scroll to bottom button (shown when user scrolled up) -->
{#if isUserScrolling}
	<button
		type="button"
		class="absolute bottom-20 right-4 p-2 bg-bg-secondary border border-border-default rounded-full shadow-lg hover:bg-bg-hover transition-colors"
		onclick={() => scrollToBottom()}
		aria-label="Scroll to bottom"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-text-secondary"
		>
			<path d="M12 5v14M5 12l7 7 7-7" />
		</svg>
	</button>
{/if}
