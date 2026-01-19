<script lang="ts" module>
	export type { FormRootProps } from './types';
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '../../utils/cn';
	import { setFormContext } from './context.svelte';
	import type { FormRootProps, FieldValue, FormContext } from './types';

	let {
		initialValues = {} as Record<string, FieldValue>,
		validate: validateFn,
		schema,
		onsubmit,
		validateOnBlur = true,
		validateOnChange = false,
		showErrorsOnTouched = true,
		class: className = '',
		children
	}: FormRootProps = $props();

	// Capture initial values at mount time (intentionally non-reactive)
	const _initialValues = untrack(() => ({ ...initialValues }));
	const _validateOnBlur = untrack(() => validateOnBlur);
	const _validateOnChange = untrack(() => validateOnChange);
	const _showErrorsOnTouched = untrack(() => showErrorsOnTouched);

	// Form state
	let values = $state<Record<string, FieldValue>>({ ..._initialValues });
	let errors = $state<Record<string, string>>({});
	let touched = $state<Record<string, boolean>>({});
	let isSubmitting = $state(false);

	// Computed state
	const isDirty = $derived(() => {
		return Object.keys(values).some((key) => values[key] !== _initialValues[key]);
	});

	const isValid = $derived(() => {
		return Object.keys(errors).length === 0;
	});

	// Validation logic
	function validateAll(): boolean {
		const newErrors: Record<string, string> = {};

		// Zod schema validation
		if (schema) {
			const result = schema.safeParse(values);
			if (!result.success) {
				for (const issue of result.error.issues) {
					const fieldName = issue.path[0]?.toString();
					if (fieldName && !newErrors[fieldName]) {
						newErrors[fieldName] = issue.message;
					}
				}
			}
		}

		// Custom validation function
		if (validateFn) {
			const customErrors = validateFn(values);
			Object.assign(newErrors, customErrors);
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function validateSingleField(name: string): void {
		const newErrors = { ...errors };

		// Clear existing error for this field
		delete newErrors[name];

		// Zod schema validation for single field
		if (schema) {
			const fieldSchema = schema.shape[name];
			if (fieldSchema) {
				const result = fieldSchema.safeParse(values[name]);
				if (!result.success) {
					newErrors[name] = result.error.issues[0]?.message ?? 'Invalid value';
				}
			}
		}

		// Custom validation function (validates all, but we only keep the one we want)
		if (validateFn) {
			const customErrors = validateFn(values);
			if (customErrors[name]) {
				newErrors[name] = customErrors[name];
			}
		}

		errors = newErrors;
	}

	// Context value with getters for reactivity
	const ctx: FormContext = {
		get values() {
			return values;
		},
		getValue(name: string) {
			return values[name] ?? null;
		},
		setValue(name: string, value: FieldValue) {
			values = { ...values, [name]: value };
			if (_validateOnChange) {
				validateSingleField(name);
			}
		},

		get errors() {
			return errors;
		},
		getError(name: string) {
			return errors[name];
		},
		setError(name: string, error: string) {
			errors = { ...errors, [name]: error };
		},
		clearErrors() {
			errors = {};
		},

		get touched() {
			return touched;
		},
		isTouched(name: string) {
			return touched[name] ?? false;
		},
		setTouched(name: string) {
			if (!touched[name]) {
				touched = { ...touched, [name]: true };
				if (_validateOnBlur) {
					validateSingleField(name);
				}
			}
		},

		get isDirty() {
			return isDirty();
		},
		get isSubmitting() {
			return isSubmitting;
		},
		get isValid() {
			return isValid();
		},

		validate: validateAll,
		validateField: validateSingleField,
		reset() {
			values = { ..._initialValues };
			errors = {};
			touched = {};
		},

		validateOnBlur: _validateOnBlur,
		validateOnChange: _validateOnChange,
		showErrorsOnTouched: _showErrorsOnTouched
	};

	setFormContext(ctx);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		// Mark all fields as touched
		const allTouched: Record<string, boolean> = {};
		for (const key of Object.keys(values)) {
			allTouched[key] = true;
		}
		touched = allTouched;

		// Validate
		const valid = validateAll();
		if (!valid) {
			return;
		}

		// Submit
		if (onsubmit) {
			isSubmitting = true;
			try {
				await onsubmit(values);
			} finally {
				isSubmitting = false;
			}
		}
	}
</script>

<form onsubmit={handleSubmit} class={cn('w-full', className)}>
	{@render children()}
</form>
