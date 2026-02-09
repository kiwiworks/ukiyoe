import type { OpenAPIV3, OpenAPIV3_1 } from './types.js';
type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;
type ReferenceObject = OpenAPIV3.ReferenceObject | OpenAPIV3_1.ReferenceObject;
export interface ParametersTableProps {
    /** Array of parameter objects */
    parameters: (ParameterObject | ReferenceObject)[];
    /** Additional CSS classes */
    class?: string;
}
declare const ParametersTable: import("svelte").Component<ParametersTableProps, {}, "">;
type ParametersTable = ReturnType<typeof ParametersTable>;
export default ParametersTable;
