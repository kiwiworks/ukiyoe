<script lang="ts" module>
	export type ToasterPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

	export interface ToasterProps {
		position?: ToasterPosition;
		class?: string;
	}
</script>

<script lang="ts">
	import Toast, { getToasts, removeToast } from './Toast.svelte';
	import { cn } from '../utils/cn';

	let { position = 'bottom-right', class: className = '' }: ToasterProps = $props();

	const toasts = $derived(getToasts());

	const positionClasses: Record<ToasterPosition, string> = {
		'top-left': 'top-4 left-4',
		'top-center': 'top-4 left-1/2 -translate-x-1/2',
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
		'bottom-right': 'bottom-4 right-4'
	};
</script>

<div
	class={cn('fixed z-toast flex flex-col gap-2 pointer-events-none', positionClasses[position], className)}
	style="width: 24rem;"
>
	{#each toasts as toast (toast.id)}
		<Toast {toast} onclose={removeToast} />
	{/each}
</div>
