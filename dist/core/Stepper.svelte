<script lang="ts" module>
	import type { Component } from 'svelte';

	export type StepState = 'pending' | 'active' | 'completed' | 'error';
	export type StepperSize = 'xs' | 'sm' | 'md' | 'lg';
	export type StepperOrientation = 'horizontal' | 'vertical';

	export interface Step {
		id: string;
		label: string;
		description?: string;
		icon?: Component;
		optional?: boolean;
	}

	export interface StepperProps {
		/** Array of step definitions */
		steps: Step[];
		/** Current active step ID */
		currentStep: string;
		/** Size variant */
		size?: StepperSize;
		/** Layout orientation */
		orientation?: StepperOrientation;
		/** Compact mode - hides labels/descriptions */
		compact?: boolean;
		/** Allow clicking on completed steps */
		clickable?: boolean;
		/** Step click handler */
		onStepClick?: (stepId: string) => void;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { Check, X } from '@lucide/svelte';
	import { cn } from '../utils/cn';

	let {
		steps,
		currentStep,
		size = 'md',
		orientation = 'horizontal',
		compact = false,
		clickable = false,
		onStepClick,
		class: className = ''
	}: StepperProps = $props();

	const currentIndex = $derived(steps.findIndex((s) => s.id === currentStep));

	function getStepState(index: number): StepState {
		if (index < currentIndex) return 'completed';
		if (index === currentIndex) return 'active';
		return 'pending';
	}

	function handleClick(step: Step, index: number) {
		if (!clickable || !onStepClick) return;
		const state = getStepState(index);
		if (state === 'completed' || state === 'active') {
			onStepClick(step.id);
		}
	}

	const sizeConfig: Record<StepperSize, {
		icon: number;
		indicator: string;
		text: string;
		descText: string;
		gap: string;
		hConnector: string;
		connectorMargin: string;
	}> = {
		xs: { icon: 12, indicator: 'w-5 h-5', text: 'text-[10px]', descText: 'text-[9px]', gap: 'gap-1', hConnector: 'h-px w-4', connectorMargin: 'mt-2.5' },
		sm: { icon: 14, indicator: 'w-6 h-6', text: 'text-xs', descText: 'text-[10px]', gap: 'gap-1.5', hConnector: 'h-px w-6', connectorMargin: 'mt-3' },
		md: { icon: 16, indicator: 'w-8 h-8', text: 'text-sm', descText: 'text-[10px]', gap: 'gap-2', hConnector: 'h-px w-8', connectorMargin: 'mt-4' },
		lg: { icon: 20, indicator: 'w-10 h-10', text: 'text-md', descText: 'text-xs', gap: 'gap-3', hConnector: 'h-0.5 w-12', connectorMargin: 'mt-5' }
	};

	const stateClasses: Record<StepState, { indicator: string; text: string; connector: string }> = {
		pending: {
			indicator: 'bg-bg-tertiary border-border-subtle text-text-muted',
			text: 'text-text-muted',
			connector: 'bg-border-subtle'
		},
		active: {
			indicator: 'bg-accent-brand border-accent-brand text-text-inverse',
			text: 'text-text-primary',
			connector: 'bg-border-subtle'
		},
		completed: {
			indicator: 'bg-positive border-positive text-text-inverse',
			text: 'text-text-secondary',
			connector: 'bg-positive'
		},
		error: {
			indicator: 'bg-negative border-negative text-text-inverse',
			text: 'text-negative',
			connector: 'bg-negative'
		}
	};

	const config = $derived(sizeConfig[size]);

	const containerClasses = $derived(
		orientation === 'horizontal'
			? `flex items-start ${config.gap}`
			: `flex flex-col ${config.gap}`
	);
</script>

<div class={cn(containerClasses, className)} role="navigation" aria-label="Progress">
	{#each steps as step, index}
		{@const state = getStepState(index)}
		{@const isClickable = clickable && (state === 'completed' || state === 'active')}
		{@const isLast = index === steps.length - 1}
		{@const connectorState = state === 'completed' ? 'completed' : 'pending'}

		{#if orientation === 'horizontal'}
			<div class="flex items-center">
				<button
					type="button"
					class="flex flex-col items-center {config.gap} {isClickable ? 'cursor-pointer' : 'cursor-default'}"
					onclick={() => handleClick(step, index)}
					disabled={!isClickable}
					aria-current={state === 'active' ? 'step' : undefined}
				>
					<!-- Step indicator -->
					<div
						class="flex items-center justify-center rounded-full border-2 transition-all duration-200 {config.indicator} {stateClasses[state].indicator}"
						class:animate-pulse={state === 'active'}
					>
						{#if state === 'completed'}
							<Check size={config.icon} />
						{:else if state === 'error'}
							<X size={config.icon} />
						{:else if step.icon}
							{@const Icon = step.icon}<Icon size={config.icon} />
						{:else}
							<span class="font-mono font-bold {config.text}">{index + 1}</span>
						{/if}
					</div>

					<!-- Label & description -->
					{#if !compact}
						<div class="flex flex-col items-center text-center max-w-24">
							<span class="font-medium {config.text} {stateClasses[state].text} whitespace-nowrap">
								{step.label}
								{#if step.optional}
									<span class="text-text-muted font-normal">(opt)</span>
								{/if}
							</span>
							{#if step.description}
								<span class="text-text-muted {config.descText} leading-tight mt-0.5">
									{step.description}
								</span>
							{/if}
						</div>
					{/if}
				</button>

				<!-- Connector -->
				{#if !isLast}
					<div
						class="{config.hConnector} {stateClasses[connectorState].connector} transition-colors duration-200 mx-2 {config.connectorMargin} {!compact ? '-translate-y-1/2' : ''}"
					></div>
				{/if}
			</div>
		{:else}
			<!-- Vertical orientation -->
			<div class="flex {config.gap}">
				<div class="flex flex-col items-center">
					<!-- Step indicator -->
					<button
						type="button"
						class="flex items-center justify-center rounded-full border-2 transition-all duration-200 {config.indicator} {stateClasses[state].indicator} {isClickable ? 'cursor-pointer' : 'cursor-default'}"
						class:animate-pulse={state === 'active'}
						onclick={() => handleClick(step, index)}
						disabled={!isClickable}
						aria-current={state === 'active' ? 'step' : undefined}
					>
						{#if state === 'completed'}
							<Check size={config.icon} />
						{:else if state === 'error'}
							<X size={config.icon} />
						{:else if step.icon}
							{@const Icon = step.icon}<Icon size={config.icon} />
						{:else}
							<span class="font-mono font-bold {config.text}">{index + 1}</span>
						{/if}
					</button>

					<!-- Vertical connector -->
					{#if !isLast}
						<div
							class="w-px flex-1 min-h-6 {stateClasses[connectorState].connector} transition-colors duration-200"
						></div>
					{/if}
				</div>

				<!-- Label & description -->
				{#if !compact}
					<div class="flex flex-col pt-1 pb-4">
						<span class="font-medium {config.text} {stateClasses[state].text}">
							{step.label}
							{#if step.optional}
								<span class="text-text-muted font-normal">(opt)</span>
							{/if}
						</span>
						{#if step.description}
							<span class="text-text-muted {config.descText} leading-tight mt-0.5">
								{step.description}
							</span>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>
