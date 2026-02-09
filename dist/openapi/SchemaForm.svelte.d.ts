import type { OpenAPIV3 } from './types.js';
type SchemaObject = OpenAPIV3.SchemaObject;
export interface SchemaFormProps {
    /** The schema to generate form for */
    schema: SchemaObject;
    /** Current value */
    value: unknown;
    /** Callback when value changes */
    onchange: (value: unknown) => void;
    /** Property name (for nested rendering) */
    propertyName?: string;
    /** Whether this field is required */
    required?: boolean;
    /** Nesting depth */
    depth?: number;
    /** Additional CSS classes */
    class?: string;
}
import SchemaForm from './SchemaForm.svelte';
declare const SchemaForm: import("svelte").Component<SchemaFormProps, {}, "value">;
type SchemaForm = ReturnType<typeof SchemaForm>;
export default SchemaForm;
