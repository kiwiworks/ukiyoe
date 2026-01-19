import type { Snippet } from 'svelte';
import type { z } from 'zod';

/** Supported field value types */
export type FieldValue = string | number | boolean | string[] | number[] | null;

/** Supported field types for Form.Auto */
export type FieldType =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'textarea'
	| 'select'
	| 'checkbox'
	| 'switch'
	| 'radio'
	| 'slider';

/** Options for select, radio, and similar fields */
export interface FieldOption {
	value: string;
	label: string;
	disabled?: boolean;
}

/** Schema definition for Form.Auto field generation */
export interface FieldSchema {
	/** Field key in form values */
	name: string;
	/** Field type determines which component is rendered */
	type: FieldType;
	/** Label displayed above the field */
	label: string;
	/** Hint text shown below the field */
	hint?: string;
	/** Whether the field is required */
	required?: boolean;
	/** Placeholder text for text-based fields */
	placeholder?: string;
	/** Options for select, radio fields */
	options?: FieldOption[] | string[];
	/** Default value */
	defaultValue?: FieldValue;
	/** Minimum value for number/slider */
	min?: number;
	/** Maximum value for number/slider */
	max?: number;
	/** Step increment for number/slider */
	step?: number;
	/** Number of rows for textarea */
	rows?: number;
	/** Disable the field */
	disabled?: boolean;
}

/** Props passed to Form.Field children snippet */
export interface FieldRenderProps {
	/** Unique ID for the input */
	id: string;
	/** Field name */
	name: string;
	/** Current field value */
	value: FieldValue;
	/** Whether the field has an error */
	error: boolean;
	/** Error message if any */
	errorMessage: string | null;
	/** ID of the description element for aria-describedby */
	'aria-describedby': string | undefined;
	/** Whether the field value is invalid */
	'aria-invalid': boolean;
	/** Handler to update the field value */
	onchange: (value: FieldValue) => void;
	/** Handler for blur events */
	onblur: () => void;
}

/** Form validation function signature */
export type FormValidateFn<T> = (values: T) => Record<string, string>;

/** Form context interface with reactive getters */
export interface FormContext<T = Record<string, FieldValue>> {
	/** Current form values */
	readonly values: T;
	/** Get value for a specific field */
	getValue: (name: string) => FieldValue;
	/** Set value for a specific field */
	setValue: (name: string, value: FieldValue) => void;

	/** Current form errors */
	readonly errors: Record<string, string>;
	/** Get error for a specific field */
	getError: (name: string) => string | undefined;
	/** Set error for a specific field */
	setError: (name: string, error: string) => void;
	/** Clear all errors */
	clearErrors: () => void;

	/** Touched state for each field */
	readonly touched: Record<string, boolean>;
	/** Check if a specific field has been touched */
	isTouched: (name: string) => boolean;
	/** Mark a field as touched */
	setTouched: (name: string) => void;

	/** Whether the form has any changes from initial values */
	readonly isDirty: boolean;
	/** Whether the form is currently submitting */
	readonly isSubmitting: boolean;
	/** Whether the form is valid (no errors) */
	readonly isValid: boolean;

	/** Validate the entire form */
	validate: () => boolean;
	/** Validate a single field */
	validateField: (name: string) => void;
	/** Reset form to initial values */
	reset: () => void;

	/** Options */
	readonly validateOnBlur: boolean;
	readonly validateOnChange: boolean;
	readonly showErrorsOnTouched: boolean;
}

/** Form.Root component props */
export interface FormRootProps<T = Record<string, FieldValue>> {
	/** Initial form values */
	initialValues?: Partial<T>;
	/** Custom validation function */
	validate?: FormValidateFn<T>;
	/** Zod schema for validation */
	schema?: z.ZodObject<z.ZodRawShape>;
	/** Submit handler */
	onsubmit?: (values: T) => void | Promise<void>;
	/** Validate on blur (default: true) */
	validateOnBlur?: boolean;
	/** Validate on change (default: false) */
	validateOnChange?: boolean;
	/** Only show errors after field is touched (default: true) */
	showErrorsOnTouched?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Children snippet */
	children: Snippet;
}

/** Form.Field component props */
export interface FormFieldProps {
	/** Field name (key in form values) */
	name: string;
	/** Field label */
	label: string;
	/** Hint text shown below the field */
	hint?: string;
	/** Mark field as required (visual only) */
	required?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Children snippet that receives FieldRenderProps */
	children: Snippet<[FieldRenderProps]>;
}

/** Form.Auto component props */
export interface FormAutoProps {
	/** Field definitions */
	fields: FieldSchema[];
	/** Layout mode */
	layout?: 'stack' | 'grid';
	/** Number of columns for grid layout */
	columns?: 1 | 2 | 3 | 4;
	/** Gap between fields */
	gap?: 'sm' | 'md' | 'lg';
}
