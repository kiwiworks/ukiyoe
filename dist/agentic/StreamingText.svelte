<script lang="ts" module>
	export type StreamingSpeed = 'instant' | 'fast' | 'natural';
	export type StreamingMode = 'append' | 'replace';

	export interface StreamingTextProps {
		/** Text to display */
		text: string;
		/** Content arrival mode. 'append' animates new chars (autoregressive). 'replace' shows full content immediately on change (diffusion). */
		mode?: StreamingMode;
		/** Animation speed (only used in 'append' mode) */
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
	import { cn } from '../utils/cn';

	let {
		text,
		mode = 'append',
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
	let previousText = $state('');

	// Reset / sync when text changes
	$effect(() => {
		if (mode === 'replace') {
			// Immediate full display — no animation
			displayedText = text;
			currentIndex = text.length;
			isComplete = true;
			onComplete?.();
		} else {
			// Append mode: if text starts with previous, only animate the new portion
			if (text.startsWith(previousText) && previousText.length > 0) {
				// Text grew — continue from where we were
				currentIndex = previousText.length;
				displayedText = previousText;
			} else {
				// Text changed entirely — reset
				displayedText = '';
				currentIndex = 0;
			}
			isComplete = false;
		}
		previousText = text;
	});

	// Streaming animation (append mode only)
	$effect(() => {
		if (mode === 'replace') return;
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

<span class={cn('whitespace-pre-wrap', className)}>
	{displayedText}
	{#if cursor && !isComplete}
		<span class="inline-block w-2 h-4 ml-0.5 bg-accent-brand animate-pulse align-middle"></span>
	{/if}
</span>
