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

<div class="random-name size-{size}" class:disabled>
	{#if isEditing}
		<input
			type="text"
			class="name-input"
			bind:value={editValue}
			bind:this={editInputRef}
			onkeydown={handleKeydown}
			{placeholder}
		/>
		<div class="actions">
			<button type="button" class="action-btn confirm" onclick={confirmEdit} title="Confirm">
				<Check size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
			</button>
			<button type="button" class="action-btn cancel" onclick={cancelEdit} title="Cancel">
				<X size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
			</button>
		</div>
	{:else}
		<span class="name-display" class:empty={!value}>
			{value || placeholder}
		</span>
		<div class="actions">
			<button
				type="button"
				class="action-btn generate"
				onclick={handleGenerate}
				{disabled}
				title="Generate random name"
			>
				<Dices size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
			</button>
			<button
				type="button"
				class="action-btn edit"
				onclick={startEdit}
				{disabled}
				title="Edit name"
			>
				<Pencil size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
			</button>
		</div>
	{/if}
</div>

<style>
	.random-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		transition: border-color 0.15s ease;
	}

	.random-name:focus-within {
		border-color: var(--accent-brand);
	}

	.random-name.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.size-sm {
		padding: 0.375rem 0.5rem;
		font-size: 12px;
	}

	.size-md {
		padding: 0.5rem 0.75rem;
		font-size: 14px;
	}

	.size-lg {
		padding: 0.625rem 1rem;
		font-size: 16px;
	}

	.name-display {
		flex: 1;
		font-weight: 500;
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name-display.empty {
		color: var(--text-muted);
		font-weight: 400;
	}

	.name-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-family: var(--font-mono);
		font-size: inherit;
		color: var(--text-primary);
	}

	.name-input::placeholder {
		color: var(--text-muted);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.action-btn {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		border-radius: var(--radius-sm);
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.action-btn:hover:not(:disabled) {
		color: var(--text-primary);
		background: var(--bg-tertiary);
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action-btn.generate:hover:not(:disabled) {
		color: var(--accent-brand);
	}

	.action-btn.confirm:hover {
		color: var(--color-positive);
	}

	.action-btn.cancel:hover {
		color: var(--color-negative);
	}
</style>
