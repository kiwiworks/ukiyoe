<script lang="ts" module>
	export type StreamingSpeed = 'instant' | 'fast' | 'natural';

	export interface StreamingTextProps {
		/** Text to display */
		text: string;
		/** Animation speed */
		speed?: StreamingSpeed;
		/** Show blinking cursor */
		cursor?: boolean;
		/** Callback when streaming completes */
		onComplete?: () => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	let {
		text,
		speed = 'natural',
		cursor = true,
		onComplete,
		class: className = ''
	}: StreamingTextProps = $props();

	const speedMs: Record<StreamingSpeed, number> = {
		instant: 0,
		fast: 8,
		natural: 25
	};

	let displayedText = $state('');
	let isComplete = $state(false);
	let currentIndex = $state(0);

	// Reset when text changes
	$effect(() => {
		text; // track dependency
		displayedText = '';
		currentIndex = 0;
		isComplete = false;
	});

	// Streaming animation
	$effect(() => {
		if (currentIndex >= text.length) {
			if (!isComplete) {
				isComplete = true;
				onComplete?.();
			}
			return;
		}

		if (speed === 'instant') {
			displayedText = text;
			currentIndex = text.length;
			return;
		}

		const delay = speedMs[speed];
		const timeout = setTimeout(() => {
			// Handle multiple chars for fast mode
			const charsPerTick = speed === 'fast' ? 3 : 1;
			const nextIndex = Math.min(currentIndex + charsPerTick, text.length);
			displayedText = text.slice(0, nextIndex);
			currentIndex = nextIndex;
		}, delay);

		return () => clearTimeout(timeout);
	});
</script>

<span class="whitespace-pre-wrap {className}">
	{displayedText}
	{#if cursor && !isComplete}
		<span class="inline-block w-2 h-4 ml-0.5 bg-accent-brand animate-pulse align-middle"></span>
	{/if}
</span>
