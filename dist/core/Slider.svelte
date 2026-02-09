<script lang="ts" module>
	export type SliderSize = 'xs' | 'sm' | 'md' | 'lg';

	export interface SliderProps {
		/** Current value(s) (bindable) */
		value?: number[];
		/** Minimum value */
		min?: number;
		/** Maximum value */
		max?: number;
		/** Step increment */
		step?: number;
		/** Disable interactions */
		disabled?: boolean;
		/** Size preset */
		size?: SliderSize;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** ID of element describing this slider */
		'aria-describedby'?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (value: number[]) => void;
	}
</script>

<script lang="ts">
	import { Slider } from 'bits-ui';
	import { cn } from '../utils/cn';

	let {
		value = $bindable([50]),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		size = 'md',
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		class: className = '',
		onchange
	}: SliderProps = $props();

	const rootClasses: Record<SliderSize, string> = {
		xs: 'h-3.5',
		sm: 'h-4',
		md: 'h-5',
		lg: 'h-6'
	};

	const trackClasses: Record<SliderSize, string> = {
		xs: 'h-0.5',
		sm: 'h-1',
		md: 'h-1.5',
		lg: 'h-2'
	};

	const thumbClasses: Record<SliderSize, string> = {
		xs: 'size-3',
		sm: 'size-3.5',
		md: 'size-4',
		lg: 'size-5'
	};

	function handleChange(newValue: number[] | number) {
		if (Array.isArray(newValue)) {
			value = newValue;
			onchange?.(newValue);
		} else {
			value = [newValue];
			onchange?.([newValue]);
		}
	}
</script>

<div class={cn('w-full', className)}>
	{#if value.length > 1}
		<Slider.Root
			type="multiple"
			{value}
			{min}
			{max}
			{step}
			{disabled}
			onValueChange={handleChange}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			class="relative flex w-full touch-none select-none items-center {rootClasses[size]}"
		>
			<span class="relative w-full cursor-pointer overflow-hidden rounded-full bg-border-default {trackClasses[size]}">
				<Slider.Range class="absolute h-full bg-accent-brand" />
			</span>
			{#each value as _, i}
				<Slider.Thumb
					index={i}
					class="block cursor-pointer rounded-full border-2 border-accent-brand bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:pointer-events-none disabled:opacity-50 {thumbClasses[size]}"
				/>
			{/each}
		</Slider.Root>
	{:else}
		<Slider.Root
			type="single"
			value={value[0]}
			{min}
			{max}
			{step}
			{disabled}
			onValueChange={handleChange}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			class="relative flex w-full touch-none select-none items-center {rootClasses[size]}"
		>
			<span class="relative w-full cursor-pointer overflow-hidden rounded-full bg-border-default {trackClasses[size]}">
				<Slider.Range class="absolute h-full bg-accent-brand" />
			</span>
			<Slider.Thumb
				index={0}
				class="block cursor-pointer rounded-full border-2 border-accent-brand bg-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:pointer-events-none disabled:opacity-50 {thumbClasses[size]}"
			/>
		</Slider.Root>
	{/if}
</div>
