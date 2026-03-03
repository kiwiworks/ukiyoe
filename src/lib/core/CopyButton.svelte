<script lang="ts" module>
	export type CopyButtonSize = 'xs' | 'sm' | 'md' | 'lg';
	export type CopyButtonVariant = 'default' | 'ghost';

	export interface CopyButtonProps {
		/** Text to copy to clipboard */
		text: string;
		/** Button size */
		size?: CopyButtonSize;
		/** Visual variant */
		variant?: CopyButtonVariant;
		/** Duration of success feedback in ms */
		feedbackDuration?: number;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Copy, Check } from '@lucide/svelte';
	import Button from './Button.svelte';
	import { cn } from '../utils/cn';

	let {
		text,
		size = 'sm',
		variant = 'default',
		feedbackDuration = 2000,
		class: className = ''
	}: CopyButtonProps = $props();

	let copied = $state(false);

	const iconSizes: Record<CopyButtonSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	const buttonVariant: Record<CopyButtonVariant, 'ghost' | 'outline'> = {
		default: 'outline',
		ghost: 'ghost'
	};

	async function handleCopy() {
		await navigator.clipboard.writeText(text);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, feedbackDuration);
	}
</script>

<Button
	variant={buttonVariant[variant]}
	{size}
	onclick={handleCopy}
	aria-label={copied ? 'Copied' : 'Copy to clipboard'}
	class={cn(copied && 'text-positive', className)}
>
	{#if copied}
		<Check size={iconSizes[size]} />
	{:else}
		<Copy size={iconSizes[size]} />
	{/if}
</Button>
