<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type BottomSheetSnapPoint = number;

	export interface BottomSheetProps {
		/** Whether the sheet is open */
		open: boolean;
		/** Sheet title (renders as Dialog.Title for accessibility) */
		title?: string;
		/** Sheet description */
		description?: string;
		/** Snap points as fractions of viewport height (0-1). Default: [0.5] */
		snapPoints?: BottomSheetSnapPoint[];
		/** Whether the sheet can be dismissed by swiping down or tapping the overlay */
		dismissible?: boolean;
		/** Whether to show the drag handle */
		showDragHandle?: boolean;
		/** Called when the sheet closes */
		onClose?: () => void;
		/** Called when the sheet snaps to a point (receives the snap point index) */
		onSnap?: (snapIndex: number) => void;
		/** Custom header snippet (replaces default title/description) */
		header?: Snippet;
		/** Actions rendered in a sticky footer */
		actions?: Snippet;
		/** Sheet body content */
		children?: Snippet;
		/** Additional CSS classes for the sheet content */
		class?: string;
	}
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		open = $bindable(false),
		title,
		description,
		snapPoints = [0.5],
		dismissible = true,
		showDragHandle = true,
		onClose,
		onSnap,
		header,
		actions,
		children,
		class: className
	}: BottomSheetProps = $props();

	let sheetEl: HTMLDivElement | undefined = $state();
	let dragging = $state(false);
	let dragStartY = $state(0);
	let dragOffsetY = $state(0);
	let currentSnapIndex = $state(snapPoints.length - 1);

	const sortedSnaps = $derived([...snapPoints].sort((a, b) => a - b));
	const currentSnapHeight = $derived(sortedSnaps[currentSnapIndex] ?? sortedSnaps[sortedSnaps.length - 1]);
	const dismissThreshold = 100;

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		if (!newOpen) {
			currentSnapIndex = sortedSnaps.length - 1;
			dragOffsetY = 0;
			onClose?.();
		}
	}

	function handlePointerDown(event: PointerEvent) {
		if (!dismissible && sortedSnaps.length <= 1) return;
		dragging = true;
		dragStartY = event.clientY;
		dragOffsetY = 0;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (!dragging) return;
		const delta = event.clientY - dragStartY;
		dragOffsetY = Math.max(0, delta);
	}

	function handlePointerUp() {
		if (!dragging) return;
		dragging = false;

		if (dismissible && dragOffsetY > dismissThreshold) {
			const sheetHeight = (currentSnapHeight * window.innerHeight);
			const remainingRatio = (sheetHeight - dragOffsetY) / window.innerHeight;

			const smallerSnap = sortedSnaps.findIndex((s) => s < currentSnapHeight && remainingRatio <= s);
			if (smallerSnap !== -1 && smallerSnap < currentSnapIndex) {
				currentSnapIndex = smallerSnap;
				dragOffsetY = 0;
				onSnap?.(currentSnapIndex);
				return;
			}

			open = false;
			dragOffsetY = 0;
			onClose?.();
			return;
		}

		if (sortedSnaps.length > 1 && dragOffsetY > 20) {
			const sheetHeight = currentSnapHeight * window.innerHeight;
			const newHeight = sheetHeight - dragOffsetY;
			const newRatio = newHeight / window.innerHeight;

			let closestIndex = currentSnapIndex;
			let closestDist = Infinity;
			for (let i = 0; i < sortedSnaps.length; i++) {
				const dist = Math.abs(sortedSnaps[i] - newRatio);
				if (dist < closestDist) {
					closestDist = dist;
					closestIndex = i;
				}
			}
			if (closestIndex !== currentSnapIndex) {
				currentSnapIndex = closestIndex;
				onSnap?.(currentSnapIndex);
			}
		}

		dragOffsetY = 0;
	}
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-modal bg-bg-overlay backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
		/>
		<Dialog.Content
			class={cn(
				'fixed inset-x-0 bottom-0 z-modal bg-bg-secondary border-t border-border-default rounded-t-2xl shadow-2xl',
				'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=open]:fade-in-0',
				'data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:fade-out-0',
				'flex flex-col',
				className
			)}
			style="height: {currentSnapHeight * 100}vh; max-height: 95vh; transform: translateY({dragOffsetY}px); transition: {dragging ? 'none' : 'height 0.3s ease, transform 0.3s ease'};"
			style:padding-bottom="var(--safe-area-bottom, 0px)"
			interactOutsideBehavior={dismissible ? 'close' : 'ignore'}
			escapeKeydownBehavior={dismissible ? 'close' : 'ignore'}
		>
			<!-- Drag handle zone -->
			{#if showDragHandle}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="flex items-center justify-center py-3 cursor-grab active:cursor-grabbing shrink-0 touch-none"
					onpointerdown={handlePointerDown}
					onpointermove={handlePointerMove}
					onpointerup={handlePointerUp}
					onpointercancel={handlePointerUp}
				>
					<div class="w-10 h-1 rounded-full bg-border-default"></div>
				</div>
			{/if}

			<!-- Header -->
			{#if header}
				<div class="px-4 pb-2 shrink-0">
					{@render header()}
				</div>
			{:else if title}
				<div class="px-4 pb-2 shrink-0">
					<Dialog.Title class="text-base font-semibold text-text-primary m-0">
						{title}
					</Dialog.Title>
					{#if description}
						<Dialog.Description class="mt-1 text-sm text-text-secondary m-0">
							{description}
						</Dialog.Description>
					{/if}
				</div>
			{/if}

			<!-- Body -->
			{#if children}
				<div class="flex-1 overflow-y-auto px-4 py-2 min-h-0" bind:this={sheetEl}>
					{@render children()}
				</div>
			{/if}

			<!-- Actions footer -->
			{#if actions}
				<div class="px-4 py-3 border-t border-border-subtle shrink-0">
					{@render actions()}
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
