<script lang="ts" module>
	// Word lists for random name generation
	const ADJECTIVES = [
		'swift', 'steady', 'bold', 'calm', 'bright', 'silent', 'golden', 'silver',
		'iron', 'crystal', 'shadow', 'lunar', 'solar', 'stellar', 'cosmic', 'quantum',
		'dynamic', 'serene', 'vivid', 'prime', 'apex', 'zen', 'nova', 'alpha',
		'omega', 'delta', 'sigma', 'theta', 'nebula', 'astral', 'ethereal', 'primal'
	];

	const NOUNS = [
		'phoenix', 'falcon', 'wolf', 'tiger', 'dragon', 'eagle', 'hawk', 'raven',
		'lion', 'bear', 'fox', 'owl', 'panther', 'serpent', 'griffin', 'hydra',
		'atlas', 'titan', 'sentinel', 'guardian', 'pioneer', 'voyager', 'horizon',
		'summit', 'pinnacle', 'vertex', 'zenith', 'core', 'nexus', 'pulse', 'spark', 'forge'
	];

	export interface RandomNameConfig {
		/** Custom adjective list */
		adjectives?: string[];
		/** Custom noun list */
		nouns?: string[];
		/** Include number suffix */
		includeNumber?: boolean;
		/** Separator between words */
		separator?: string;
		/** Capitalize each word */
		capitalize?: boolean;
	}

	/** Generate a random name from word lists. */
	export function generateName(config: RandomNameConfig = {}): string {
		const adjectives = config.adjectives ?? ADJECTIVES;
		const nouns = config.nouns ?? NOUNS;
		const separator = config.separator ?? ' ';
		const capitalize = config.capitalize ?? true;

		const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
		const noun = nouns[Math.floor(Math.random() * nouns.length)];

		let name = capitalize
			? `${adj.charAt(0).toUpperCase()}${adj.slice(1)}${separator}${noun.charAt(0).toUpperCase()}${noun.slice(1)}`
			: `${adj}${separator}${noun}`;

		if (config.includeNumber) {
			name += `${separator}${Math.floor(Math.random() * 100)}`;
		}

		return name;
	}
</script>

<script lang="ts">
	import { Dices, Pencil, Check, X } from '@lucide/svelte';
	import { tick } from 'svelte';

	interface Props {
		/** Current name value */
		value: string;
		/** Callback when name changes */
		onchange?: (name: string) => void;
		/** Placeholder for manual input */
		placeholder?: string;
		/** Configuration for name generation */
		config?: RandomNameConfig;
		/** Disable interaction */
		disabled?: boolean;
		/** Size variant */
		size?: 'sm' | 'md' | 'lg';
	}

	let {
		value = $bindable(),
		onchange,
		placeholder = 'Enter name...',
		config = {},
		disabled = false,
		size = 'md'
	}: Props = $props();

	let isEditing = $state(false);
	let editValue = $state('');
	let editInputRef = $state<HTMLInputElement | null>(null);

	const sizeClasses = {
		sm: 'py-1.5 px-2 text-xs',
		md: 'py-2 px-3 text-sm',
		lg: 'py-2.5 px-4 text-base'
	} as const;

	const iconSizes = {
		sm: 12,
		md: 14,
		lg: 18
	} as const;

	function handleGenerate() {
		if (disabled) return;
		const newName = generateName(config);
		value = newName;
		onchange?.(newName);
	}

	async function startEdit() {
		if (disabled) return;
		editValue = value;
		isEditing = true;
		await tick();
		editInputRef?.focus();
	}

	function confirmEdit() {
		if (editValue.trim()) {
			value = editValue.trim();
			onchange?.(value);
		}
		isEditing = false;
	}

	function cancelEdit() {
		isEditing = false;
		editValue = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			confirmEdit();
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
	}
</script>

<div
	class="w-full min-w-0 flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] transition-colors duration-150 focus-within:border-[var(--accent-brand)] {sizeClasses[size]}"
	class:opacity-60={disabled}
	class:pointer-events-none={disabled}
>
	{#if isEditing}
		<input
			type="text"
			class="flex-1 min-w-0 bg-transparent border-none outline-none font-[var(--font-mono)] text-[length:inherit] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
			bind:value={editValue}
			bind:this={editInputRef}
			onkeydown={handleKeydown}
			{placeholder}
		/>
		<div class="flex items-center gap-1">
			<button
				type="button"
				class="flex items-center justify-center p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] cursor-pointer transition-all duration-150 hover:text-[var(--color-positive)] hover:bg-[var(--bg-tertiary)]"
				onclick={confirmEdit}
				title="Confirm"
			>
				<Check size={iconSizes[size]} />
			</button>
			<button
				type="button"
				class="flex items-center justify-center p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] cursor-pointer transition-all duration-150 hover:text-[var(--color-negative)] hover:bg-[var(--bg-tertiary)]"
				onclick={cancelEdit}
				title="Cancel"
			>
				<X size={iconSizes[size]} />
			</button>
		</div>
	{:else}
		<span
			class="flex-1 min-w-0 font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis"
			class:text-[var(--text-muted)]={!value}
			class:font-normal={!value}
		>
			{value || placeholder}
		</span>
		<div class="flex items-center gap-1">
			<button
				type="button"
				class="flex items-center justify-center p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] cursor-pointer transition-all duration-150 hover:text-[var(--accent-brand)] hover:bg-[var(--bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--text-muted)] disabled:hover:bg-transparent"
				onclick={handleGenerate}
				{disabled}
				title="Generate random name"
			>
				<Dices size={iconSizes[size]} />
			</button>
			<button
				type="button"
				class="flex items-center justify-center p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] cursor-pointer transition-all duration-150 hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--text-muted)] disabled:hover:bg-transparent"
				onclick={startEdit}
				{disabled}
				title="Edit name"
			>
				<Pencil size={iconSizes[size]} />
			</button>
		</div>
	{/if}
</div>
