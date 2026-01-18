<script lang="ts" module>
	export interface ThemeLabModalProps {
		/** Whether the modal is open (bindable) */
		open?: boolean;
		/** Callback when modal is closed */
		onclose?: () => void;
	}
</script>

<script lang="ts">
	import { X, Sun, Moon, Check, Sparkles, Settings2 } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import {
		themeStore,
		accentPalette,
		uiScalePresets,
		bgEffects
	} from '../stores/theme.svelte';
	import type { AccentColor, BgEffect, UiScalePreset } from '../stores/theme.svelte';
	import Switch from './Switch.svelte';
	import Slider from './Slider.svelte';
	import Button from './Button.svelte';
	import Badge from './Badge.svelte';

	let {
		open = $bindable(false),
		onclose
	}: ThemeLabModalProps = $props();

	let dialogRef: HTMLDivElement | undefined = $state();
	let previouslyFocused: HTMLElement | null = null;

	const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(): HTMLElement[] {
		if (!dialogRef) return [];
		return Array.from(dialogRef.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
			.filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
	}

	function trapFocus(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;

		const focusable = getFocusableElements();
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
		trapFocus(e);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	function handleAccentSelect(color: AccentColor) {
		themeStore.setAccent(color);
	}

	function handleModeToggle() {
		themeStore.toggleMode();
	}

	function handleNebulaToggle(checked: boolean) {
		themeStore.setNebula(checked);
	}

	function handleSolidTextToggle(checked: boolean) {
		themeStore.setSolidText(checked);
	}

	function handleScaleChange(value: number[]) {
		themeStore.setUiScaleByIndex(value[0]);
	}

	function handleBgEffectSelect(effect: BgEffect) {
		themeStore.setBgEffect(effect);
	}

	$effect(() => {
		if (open) {
			previouslyFocused = document.activeElement as HTMLElement;
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(() => {
				const focusable = getFocusableElements();
				if (focusable.length > 0) {
					focusable[0].focus();
				} else {
					dialogRef?.focus();
				}
			});
		} else {
			document.body.style.overflow = '';
			if (previouslyFocused) {
				previouslyFocused.focus();
				previouslyFocused = null;
			}
		}
	});
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={dialogRef}
		class="fixed inset-0 z-modal flex items-center justify-center bg-bg-overlay backdrop-blur-sm"
		transition:fade={{ duration: 150 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="theme-lab-title"
		tabindex="-1"
	>
		<div
			class="flex flex-col w-full max-w-lg max-h-[calc(100vh-2rem)] bg-bg-secondary border border-border-default rounded-lg shadow-2xl overflow-hidden mx-4"
			transition:scale={{ duration: 150, start: 0.95 }}
		>
			<!-- Header -->
			<header class="flex items-center justify-between px-4 py-3 border-b border-border-subtle shrink-0">
				<div class="flex items-center gap-2">
					<Settings2 size={18} class="text-accent-brand" />
					<h2 id="theme-lab-title" class="m-0 text-sm font-semibold text-text-primary">Theme Lab</h2>
				</div>
				<button
					class="flex items-center justify-center p-1 text-text-muted bg-transparent border-none rounded-sm cursor-pointer transition-all hover:text-text-primary hover:bg-bg-hover"
					onclick={handleClose}
					aria-label="Close modal"
				>
					<X size={16} />
				</button>
			</header>

			<!-- Content -->
			<div class="flex-1 overflow-auto p-4 space-y-6">
				<!-- Mode Toggle -->
				<section class="space-y-3">
					<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">Appearance</h3>
					<div class="flex gap-2">
						<button
							class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all {themeStore.mode === 'dark' ? 'bg-bg-hover border-accent-brand text-text-primary' : 'bg-bg-tertiary border-border-default text-text-secondary hover:border-border-strong'}"
							onclick={() => themeStore.setMode('dark')}
						>
							<Moon size={16} />
							<span class="text-sm">Dark</span>
						</button>
						<button
							class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border transition-all {themeStore.mode === 'light' ? 'bg-bg-hover border-accent-brand text-text-primary' : 'bg-bg-tertiary border-border-default text-text-secondary hover:border-border-strong'}"
							onclick={() => themeStore.setMode('light')}
						>
							<Sun size={16} />
							<span class="text-sm">Light</span>
						</button>
					</div>
				</section>

				<!-- Accent Color -->
				<section class="space-y-3">
					<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">Accent Color</h3>
					<div class="grid grid-cols-8 gap-2">
						{#each accentPalette as color}
							<button
								class="relative w-8 h-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary {themeStore.accent.id === color.id ? 'border-white ring-2 ring-offset-1 ring-offset-bg-secondary ring-white/30' : 'border-transparent'}"
								style="background-color: {color.hex}"
								onclick={() => handleAccentSelect(color)}
								title={color.name}
								aria-label="Select {color.name} accent color"
								aria-pressed={themeStore.accent.id === color.id}
							>
								{#if themeStore.accent.id === color.id}
									<Check size={14} class="absolute inset-0 m-auto text-white drop-shadow-sm" />
								{/if}
							</button>
						{/each}
					</div>
					<p class="text-xs text-text-muted">Selected: {themeStore.accent.name}</p>
				</section>

				<!-- UI Scale -->
				<section class="space-y-3">
					<div class="flex items-center justify-between">
						<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">UI Scale</h3>
						<span class="text-xs text-text-muted">{themeStore.uiScale.name}</span>
					</div>
					<Slider
						value={[themeStore.scaleIndex]}
						min={0}
						max={uiScalePresets.length - 1}
						step={1}
						size="sm"
						onchange={handleScaleChange}
					/>
					<div class="flex justify-between text-xs text-text-muted">
						{#each uiScalePresets as preset}
							<span class={themeStore.uiScale.id === preset.id ? 'text-accent-brand font-medium' : ''}>{preset.name}</span>
						{/each}
					</div>
				</section>

				<!-- Background Effect -->
				<section class="space-y-3">
					<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">Background Effect</h3>
					<div class="grid grid-cols-2 gap-2">
						{#each bgEffects as effect}
							<button
								class="flex items-center gap-2 px-3 py-2 rounded-md border text-left transition-all {themeStore.bgEffect.id === effect.id ? 'bg-bg-hover border-accent-brand' : 'bg-bg-tertiary border-border-default hover:border-border-strong'}"
								onclick={() => handleBgEffectSelect(effect)}
							>
								<Sparkles size={14} class={themeStore.bgEffect.id === effect.id ? 'text-accent-brand' : 'text-text-muted'} />
								<div class="flex-1 min-w-0">
									<span class="text-sm text-text-primary block truncate">{effect.name}</span>
								</div>
								{#if themeStore.bgEffect.id === effect.id}
									<Check size={14} class="text-accent-brand shrink-0" />
								{/if}
							</button>
						{/each}
					</div>
				</section>

				<!-- Extra Options -->
				<section class="space-y-3">
					<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">Effects</h3>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<div>
								<span class="text-sm text-text-primary">Nebula Overlay</span>
								<p class="text-xs text-text-muted">Adds cosmic glow effects</p>
							</div>
							<Switch
								checked={themeStore.nebula}
								size="sm"
								onchange={handleNebulaToggle}
							/>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-sm text-text-primary">Text Shadow</span>
								<p class="text-xs text-text-muted">Improves readability over effects</p>
							</div>
							<Switch
								checked={themeStore.solidText}
								size="sm"
								onchange={handleSolidTextToggle}
							/>
						</div>
					</div>
				</section>

				<!-- Preview -->
				<section class="space-y-3">
					<h3 class="text-xs font-medium text-text-secondary uppercase tracking-wide">Preview</h3>
					<div class="p-4 rounded-lg border border-border-default bg-bg-tertiary space-y-3">
						<div class="flex items-center gap-2">
							<Badge variant="brand" text="Brand" size="sm" />
							<Badge variant="success" text="Success" size="sm" />
							<Badge variant="danger" text="Danger" size="sm" />
							<Badge variant="warning" text="Warning" size="sm" />
						</div>
						<div class="flex gap-2">
							<Button size="sm" variant="primary">Primary</Button>
							<Button size="sm" variant="default">Default</Button>
							<Button size="sm" variant="ghost">Ghost</Button>
						</div>
						<p class="text-sm text-text-primary">
							This is primary text with <span class="text-accent-brand font-medium">accent color</span> highlighting.
						</p>
						<p class="text-xs text-text-secondary">
							Secondary text for descriptions and metadata.
						</p>
					</div>
				</section>
			</div>

			<!-- Footer -->
			<footer class="flex items-center justify-end gap-2 px-4 py-3 border-t border-border-subtle shrink-0">
				<Button size="sm" variant="ghost" onclick={handleClose}>Close</Button>
			</footer>
		</div>
	</div>
{/if}
