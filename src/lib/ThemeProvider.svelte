<script lang="ts" module>
	const providerStack: string[] = [];
	const providerAppliers = new Map<string, () => void>();

	function activateProvider(providerId: string, apply: () => void): void {
		const existingIndex = providerStack.lastIndexOf(providerId);
		if (existingIndex !== -1) {
			providerStack.splice(existingIndex, 1);
		}
		providerStack.push(providerId);
		providerAppliers.set(providerId, apply);
	}

	function updateProvider(providerId: string, apply: () => void): void {
		providerAppliers.set(providerId, apply);
	}

	function isActiveProvider(providerId: string): boolean {
		return providerStack[providerStack.length - 1] === providerId;
	}

	function unregisterProvider(providerId: string): { wasActive: boolean; nextActiveId: string | null } {
		const wasActive = isActiveProvider(providerId);
		const existingIndex = providerStack.lastIndexOf(providerId);
		if (existingIndex !== -1) {
			providerStack.splice(existingIndex, 1);
		}
		providerAppliers.delete(providerId);

		return {
			wasActive,
			nextActiveId: providerStack[providerStack.length - 1] ?? null
		};
	}

	function runActiveProvider(providerId: string): void {
		providerAppliers.get(providerId)?.();
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { themeStore } from './stores/theme.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let appliedCssVarNames = new Set<string>();
	const providerId = `theme-provider-${Math.random().toString(36).slice(2)}`;
	let registered = false;

	function applyThemeToRoot(): void {
		const root = document.documentElement;
		const declarations = themeStore.cssVars
			.split(';')
			.map((declaration) => declaration.trim())
			.filter((declaration) => declaration.length > 0);

		const nextVars = new Map<string, string>();
		for (const declaration of declarations) {
			const separatorIndex = declaration.indexOf(':');
			if (separatorIndex <= 0) continue;
			const name = declaration.slice(0, separatorIndex).trim();
			const value = declaration.slice(separatorIndex + 1).trim();
			if (!name.startsWith('--')) continue;
			nextVars.set(name, value);
		}

		for (const [name, value] of nextVars) {
			root.style.setProperty(name, value);
		}

		for (const previousName of appliedCssVarNames) {
			if (!nextVars.has(previousName)) {
				root.style.removeProperty(previousName);
			}
		}

		appliedCssVarNames = new Set(nextVars.keys());
		root.dataset.theme = themeStore.mode;
	}

	function clearThemeFromRoot(): void {
		const root = document.documentElement;
		for (const name of appliedCssVarNames) {
			root.style.removeProperty(name);
		}
		appliedCssVarNames.clear();
		delete root.dataset.theme;
	}

	onMount(() => {
		registered = true;
		activateProvider(providerId, applyThemeToRoot);
		applyThemeToRoot();

		return () => {
			registered = false;
			const { wasActive, nextActiveId } = unregisterProvider(providerId);
			if (!wasActive) return;

			if (nextActiveId) {
				runActiveProvider(nextActiveId);
				return;
			}

			clearThemeFromRoot();
		};
	});

	// Apply CSS variables and theme mode to :root so they're available for portals (modals, tooltips, etc.)
	$effect(() => {
		if (!registered) return;
		updateProvider(providerId, applyThemeToRoot);
		if (!isActiveProvider(providerId)) return;
		applyThemeToRoot();
	});
</script>

<div
	class="bg-bg-primary text-text-primary font-mono"
	style="min-height: calc(100dvh / var(--ui-scale, 1))"
>
	{@render children()}
</div>
