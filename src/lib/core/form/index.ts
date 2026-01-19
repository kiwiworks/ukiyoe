// Types
export type {
	FieldValue,
	FieldType,
	FieldOption,
	FieldSchema,
	FieldRenderProps,
	FormValidateFn,
	FormContext,
	FormRootProps,
	FormFieldProps,
	FormAutoProps
} from './types';

// Context helpers
export { getFormContext, setFormContext } from './context.svelte';

// Import components
import Root from './Root.svelte';
import Field from './Field.svelte';
import Auto from './Auto.svelte';

// Individual component exports (for direct imports)
export { Root, Field, Auto };

// Compound component export
export const Form = Object.assign(Root, {
	Root,
	Field,
	Auto
});
