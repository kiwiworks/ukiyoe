<script lang="ts" module>
	import type { OpenAPIV3 } from './types.js';

	type SchemaObject = OpenAPIV3.SchemaObject;

	export interface SchemaFormProps {
		/** The schema to generate form for */
		schema: SchemaObject;
		/** Current value */
		value: unknown;
		/** Callback when value changes */
		onValueChange: (value: unknown) => void;
		/** Property name (for nested rendering) */
		propertyName?: string;
		/** Whether this field is required */
		required?: boolean;
		/** Nesting depth */
		depth?: number;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { Input, Select, Switch, Textarea, Text, Badge, Button } from '../index.js';
	import type { InputType } from '../core/Input.svelte';
	import SchemaForm from './SchemaForm.svelte';

	let {
		schema,
		value = $bindable(),
		onValueChange,
		propertyName,
		required = false,
		depth = 0,
		class: className = ''
	}: SchemaFormProps = $props();

	// Determine the schema type
	const schemaType = $derived(Array.isArray(schema.type) ? schema.type[0] : schema.type);
	const isObject = $derived(schemaType === 'object' || !!schema.properties);
	const isArray = $derived(schemaType === 'array');
	const isEnum = $derived(!!schema.enum);
	const isBoolean = $derived(schemaType === 'boolean');
	const isNumber = $derived(schemaType === 'number' || schemaType === 'integer');
	const isString = $derived(schemaType === 'string' && !isEnum);

	// Format hints for better input types
	const format = $derived(schema.format);
	const isTextarea = $derived(format === 'text' || (schema.maxLength && schema.maxLength > 200));
	const isPassword = $derived(format === 'password');
	const isEmail = $derived(format === 'email');
	const isUri = $derived(format === 'uri' || format === 'url');
	const isDate = $derived(format === 'date');
	const isDateTime = $derived(format === 'date-time');

	// Object properties
	const properties = $derived(schema.properties ?? {});
	const propertyNames = $derived(
		Object.keys(properties).filter((name) => {
			const prop = properties[name] as SchemaObject | undefined;
			return !prop?.readOnly;
		})
	);
	const requiredProps = $derived(new Set(schema.required ?? []));

	// Array items schema
	const itemsSchema = $derived(schema.items as SchemaObject | undefined);

	// Enum options for select
	const enumOptions = $derived(
		schema.enum?.map((val) => ({
			value: String(val),
			label: String(val)
		})) ?? []
	);

	// Initialize value based on type
	$effect(() => {
		if (value === undefined || value === null) {
			if (isObject) {
				value = {};
				onValueChange({});
			} else if (isArray) {
				value = [];
				onValueChange([]);
			} else if (isBoolean) {
				value = schema.default ?? false;
				onValueChange(value);
			} else if (isNumber) {
				value = schema.default ?? '';
				onValueChange(value);
			} else if (isEnum) {
				value = schema.default ?? '';
				onValueChange(value);
			} else {
				value = schema.default ?? '';
				onValueChange(value);
			}
		}
	});

	// Handlers
	function handleStringChange(newValue: string) {
		value = newValue;
		onValueChange(newValue);
	}

	function handleNumberChange(newValue: string) {
		const normalizedValue = newValue === '' ? '' : Number(newValue);
		value = normalizedValue;
		onValueChange(normalizedValue);
	}

	function handleBooleanChange(checked: boolean) {
		value = checked;
		onValueChange(checked);
	}

	function handleEnumChange(selected: string) {
		value = selected;
		onValueChange(selected);
	}

	function handlePropertyChange(propName: string, propValue: unknown) {
		const obj = (value as Record<string, unknown>) ?? {};
		const newObj = { ...obj, [propName]: propValue };
		value = newObj;
		onValueChange(newObj);
	}

	function handleArrayItemChange(index: number, itemValue: unknown) {
		const arr = (value as unknown[]) ?? [];
		const newArr = [...arr];
		newArr[index] = itemValue;
		value = newArr;
		onValueChange(newArr);
	}

	function addArrayItem() {
		const arr = (value as unknown[]) ?? [];
		const newArr = [...arr, undefined];
		value = newArr;
		onValueChange(newArr);
	}

	function removeArrayItem(index: number) {
		const arr = (value as unknown[]) ?? [];
		const newArr = arr.filter((_, i) => i !== index);
		value = newArr;
		onValueChange(newArr);
	}

	// Get input type for HTML input
	function getInputType(): InputType {
		if (isPassword) return 'password';
		if (isEmail) return 'email';
		if (isUri) return 'url';
		if (isNumber) return 'number';
		if (isDate) return 'date';
		if (isDateTime) return 'datetime-local';
		return 'text';
	}

	// Get placeholder
	const placeholder = $derived(
		schema.example !== undefined
			? `e.g. ${JSON.stringify(schema.example)}`
			: schema.description ?? ''
	);
</script>

<div class={cn('space-y-sm', className)}>
	{#if propertyName}
		<div class="flex items-center gap-sm">
			<Text size="sm" class="font-medium">{propertyName}</Text>
			{#if required}
				<Badge variant="danger" size="xs" text="required" />
			{/if}
			{#if schema.description}
				<Text variant="muted" size="xs">{schema.description}</Text>
			{/if}
		</div>
	{/if}

	{#if isObject}
		<!-- Object: render each property -->
		<div class={cn('space-y-md', depth > 0 && 'pl-md border-l border-border-subtle')}>
			{#each propertyNames as propName (propName)}
				{@const propSchema = properties[propName] as SchemaObject}
				{@const propValue = (value as Record<string, unknown>)?.[propName]}
				<SchemaForm
					schema={propSchema}
					value={propValue}
					onValueChange={(v: unknown) => handlePropertyChange(propName, v)}
					propertyName={propName}
					required={requiredProps.has(propName)}
					depth={depth + 1}
				/>
			{/each}
		</div>
	{:else if isArray && itemsSchema}
		<!-- Array: render items with add/remove -->
		<div class="space-y-sm">
			{#each ((value as unknown[]) ?? []) as item, index (index)}
				<div class="flex items-start gap-sm">
					<div class="flex-1">
						<SchemaForm
							schema={itemsSchema}
							value={item}
							onValueChange={(v: unknown) => handleArrayItemChange(index, v)}
							propertyName={`[${index}]`}
							depth={depth + 1}
						/>
					</div>
					<Button
						variant="ghost"
						size="xs"
						onClick={() => removeArrayItem(index)}
						class="text-negative hover:bg-negative/10"
					>
						Remove
					</Button>
				</div>
			{/each}
			<Button
				variant="outline"
				size="xs"
				onClick={addArrayItem}
			>
				+ Add item
			</Button>
		</div>
	{:else if isEnum}
		<!-- Enum: select dropdown -->
		<Select
			options={enumOptions}
			value={String(value ?? '')}
			onValueChange={handleEnumChange}
			placeholder="Select a value..."
			size="sm"
		/>
	{:else if isBoolean}
		<!-- Boolean: switch -->
		<Switch checked={Boolean(value)} onValueChange={handleBooleanChange} size="sm" />
	{:else if isTextarea}
		<!-- Long string: textarea -->
		<Textarea
			value={String(value ?? '')}
			onValueChange={handleStringChange}
			placeholder={placeholder}
			rows={4}
			size="sm"
		/>
	{:else}
		<!-- String/Number: input -->
		<Input
			type={getInputType()}
			value={typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? '')}
			onValueChange={isNumber ? handleNumberChange : handleStringChange}
			placeholder={placeholder}
			size="sm"
		/>
	{/if}
</div>
