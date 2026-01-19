<script lang="ts" module>
	export type { FormAutoProps } from './types';
</script>

<script lang="ts">
	import { cn } from '../../utils/cn';
	import Input from '../Input.svelte';
	import Textarea from '../Textarea.svelte';
	import Select from '../Select.svelte';
	import Checkbox from '../Checkbox.svelte';
	import Switch from '../Switch.svelte';
	import RadioGroup from '../RadioGroup.svelte';
	import Slider from '../Slider.svelte';
	import Field from './Field.svelte';
	import type { FormAutoProps, FieldSchema, FieldRenderProps, FieldOption } from './types';

	let { fields, layout = 'stack', columns = 1, gap = 'md' }: FormAutoProps = $props();

	const gapClasses: Record<string, string> = {
		sm: 'gap-2',
		md: 'gap-4',
		lg: 'gap-6'
	};

	const layoutClasses: Record<string, Record<number, string>> = {
		stack: {
			1: 'flex flex-col',
			2: 'flex flex-col',
			3: 'flex flex-col',
			4: 'flex flex-col'
		},
		grid: {
			1: 'grid grid-cols-1',
			2: 'grid grid-cols-1 sm:grid-cols-2',
			3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
			4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
		}
	};

	// Normalize options to FieldOption[]
	function normalizeOptions(options: FieldOption[] | string[] | undefined): FieldOption[] {
		if (!options) return [];
		return options.map((opt) =>
			typeof opt === 'string' ? { value: opt, label: opt } : opt
		);
	}

	// Get input type for text-based fields
	function getInputType(fieldType: FieldSchema['type']): 'text' | 'email' | 'password' | 'number' {
		switch (fieldType) {
			case 'email':
				return 'email';
			case 'password':
				return 'password';
			case 'number':
				return 'number';
			default:
				return 'text';
		}
	}
</script>

<div class={cn(layoutClasses[layout][columns], gapClasses[gap])}>
	{#each fields as field (field.name)}
		<Field name={field.name} label={field.label} hint={field.hint} required={field.required}>
			{#snippet children(props: FieldRenderProps)}
				{#if field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number'}
					<Input
						id={props.id}
						name={props.name}
						type={getInputType(field.type)}
						value={typeof props.value === 'string' || typeof props.value === 'number' ? String(props.value ?? '') : ''}
						placeholder={field.placeholder}
						disabled={field.disabled}
						error={props.error}
						aria-describedby={props['aria-describedby']}
						onchange={(e) => {
							const val = field.type === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value;
							props.onchange(val);
						}}
						onblur={props.onblur}
					/>
				{:else if field.type === 'textarea'}
					<Textarea
						id={props.id}
						name={props.name}
						value={typeof props.value === 'string' ? props.value : ''}
						placeholder={field.placeholder}
						rows={field.rows}
						disabled={field.disabled}
						error={props.error}
						aria-describedby={props['aria-describedby']}
						onchange={(e) => props.onchange(e.currentTarget.value)}
						onblur={props.onblur}
					/>
				{:else if field.type === 'select'}
					<Select
						id={props.id}
						name={props.name}
						value={typeof props.value === 'string' ? props.value : ''}
						options={normalizeOptions(field.options)}
						placeholder={field.placeholder}
						disabled={field.disabled}
						aria-describedby={props['aria-describedby']}
						aria-invalid={props['aria-invalid']}
						onchange={(val) => props.onchange(val)}
					/>
				{:else if field.type === 'checkbox'}
					<Checkbox
						id={props.id}
						name={props.name}
						checked={typeof props.value === 'boolean' ? props.value : false}
						disabled={field.disabled}
						aria-describedby={props['aria-describedby']}
						aria-invalid={props['aria-invalid']}
						onchange={(checked) => props.onchange(checked)}
					/>
				{:else if field.type === 'switch'}
					<Switch
						id={props.id}
						name={props.name}
						checked={typeof props.value === 'boolean' ? props.value : false}
						disabled={field.disabled}
						aria-describedby={props['aria-describedby']}
						onchange={(checked) => props.onchange(checked)}
					/>
				{:else if field.type === 'radio'}
					<RadioGroup
						name={props.name}
						value={typeof props.value === 'string' ? props.value : ''}
						options={normalizeOptions(field.options)}
						disabled={field.disabled}
						aria-describedby={props['aria-describedby']}
						aria-invalid={props['aria-invalid']}
						onchange={(val) => props.onchange(val)}
					/>
				{:else if field.type === 'slider'}
					<Slider
						value={Array.isArray(props.value) ? props.value.map(Number) : [Number(props.value ?? field.min ?? 0)]}
						min={field.min}
						max={field.max}
						step={field.step}
						disabled={field.disabled}
						aria-describedby={props['aria-describedby']}
						onchange={(val) => props.onchange(val)}
					/>
				{/if}
			{/snippet}
		</Field>
	{/each}
</div>
