import type { OpenAPIV3, OpenAPIV3_1 } from './types.js';
type SchemaObject = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;
type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;
export interface SchemaViewProps {
    /** The schema to display */
    schema: SchemaObject | ReferenceObject | boolean;
    /** Nesting depth (for indentation) */
    depth?: number;
    /** Property name (when rendering as part of an object) */
    propertyName?: string;
    /** Whether this property is required */
    isRequired?: boolean;
    /** Additional CSS classes */
    class?: string;
}
import SchemaView from './SchemaView.svelte';
declare const SchemaView: import("svelte").Component<SchemaViewProps, {}, "">;
type SchemaView = ReturnType<typeof SchemaView>;
export default SchemaView;
