<script lang="ts" module>
	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface SelectProps {
		/** Selected value (bindable) */
		value?: string;
		/** Available options */
		options: SelectOption[] | string[];
		/** Size preset */
		size?: SelectSize;
		/** Disable interactions */
		disabled?: boolean;
		/** Show loading spinner and disable interactions */
		loading?: boolean;
		/** Required field */
		required?: boolean;
		/** Placeholder text when no value selected */
		placeholder?: string;
		/** HTML id attribute for label association */
		id?: string;
		/** HTML name attribute for form submission */
		name?: string;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** ID of element describing this select */
		'aria-describedby'?: string;
		/** Indicates select has invalid value */
		'aria-invalid'?: boolean;
		/** Show clear button when value is selected */
		clearable?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (value: string) => void;
	}
</script>

<script lang="ts">
	import { Select } from 'bits-ui';
	import { ChevronDown, Check, X, Loader2 } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		value = $bindable(''),
		options,
		size = 'md',
		disabled = false,
		loading = false,
		required = false,
		placeholder = 'Select...',
		id,
		name,
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		clearable = false,
		class: className = '',
		onchange
	}: SelectProps = $props();

	const isDisabled = $derived(disabled || loading);

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		value = '';
		onchange?.('');
	}

	const items = $derived(
		options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt))
	);

	const selectedLabel = $derived(items.find((item) => item.value === value)?.label ?? placeholder);

	const sizeClasses: Record<SelectSize, string> = {
		xs: 'py-1 pl-1.5 text-xs',
		sm: 'py-1.5 pl-2 text-sm',
		md: 'py-2 pl-3 text-sm',
		lg: 'py-3 pl-4 text-base'
	};

	const rightPadding = $derived(clearable && value ? 'pr-14' : size === 'xs' ? 'pr-6' : size === 'sm' ? 'pr-8' : size === 'md' ? 'pr-10' : 'pr-12');

	const iconSizes: Record<SelectSize, number> = {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18
	};

	function handleValueChange(newValue: string) {
		value = newValue;
		onchange?.(newValue);
	}

	let viewportEl: HTMLElement | null = $state(null);
	let canScrollUp = $state(false);
	let canScrollDown = $state(false);

	function updateScrollState() {
		if (!viewportEl) return;
		canScrollUp = viewportEl.scrollTop > 0;
		canScrollDown = viewportEl.scrollTop < viewportEl.scrollHeight - viewportEl.clientHeight - 1;
	}
</script>

<div class={cn('w-full', className)}>
	<Select.Root
		type="single"
		disabled={isDisabled}
		{required}
		{value}
		onValueChange={handleValueChange}
		{items}
		{name}
	>
		<Select.Trigger
			{id}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			aria-invalid={ariaInvalid}
			aria-busy={loading}
			class="relative w-full appearance-none bg-bg-secondary border border-border-default rounded-md font-mono text-text-primary cursor-pointer transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:border-accent-brand focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:opacity-50 disabled:cursor-not-allowed text-left {sizeClasses[size]} {rightPadding}"
		>
		<span class={value ? '' : 'text-text-muted'}>{selectedLabel}</span>
		<span class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
			{#if loading}
				<span class="pointer-events-none text-text-muted">
					<Loader2 size={iconSizes[size]} class="animate-spin" />
				</span>
			{:else}
				{#if clearable && value && !disabled}
					<button
						type="button"
						onclick={handleClear}
						class="p-0.5 rounded-sm text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
						aria-label="Clear selection"
					>
						<X size={iconSizes[size] - 2} />
					</button>
				{/if}
				<span class="pointer-events-none text-text-muted">
					<ChevronDown size={iconSizes[size]} />
				</span>
			{/if}
		</span>
	</Select.Trigger>

	<Select.Portal>
		<Select.Content
			class="z-50 overflow-hidden rounded-md shadow-lg border border-border-default bg-bg-elevated w-[var(--bits-select-anchor-width)]"
			sideOffset={4}
		>
			<div class="relative">
				<div
					class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-bg-elevated to-transparent pointer-events-none z-10 transition-opacity duration-150"
					class:opacity-0={!canScrollUp}
				></div>
				<Select.Viewport
					bind:ref={viewportEl}
					onscroll={updateScrollState}
					class="p-1 max-h-60 overflow-y-auto"
				>
					{#each items as item}
						<Select.Item
							value={item.value}
							label={item.label}
							class="relative flex items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm font-mono cursor-pointer select-none outline-none text-text-primary data-[highlighted]:bg-bg-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						>
							{#snippet children({ selected })}
								<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
									{#if selected}
										<Check size={12} />
									{/if}
								</span>
								{item.label}
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
				<div
					class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-bg-elevated to-transparent pointer-events-none z-10 transition-opacity duration-150"
					class:opacity-0={!canScrollDown}
				></div>
			</div>
		</Select.Content>
	</Select.Portal>
	</Select.Root>
</div>
