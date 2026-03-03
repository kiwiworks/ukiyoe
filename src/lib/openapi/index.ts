/**
 * OpenAPI Viewer Components
 *
 * A set of components for displaying OpenAPI specifications.
 */

// Main component
export { default as OpenApiViewer } from './OpenApiViewer.svelte';

// Sub-components (for custom layouts)
export { default as EndpointList } from './EndpointList.svelte';
export { default as EndpointDetail } from './EndpointDetail.svelte';
export { default as ParametersTable } from './ParametersTable.svelte';
export { default as SchemaView } from './SchemaView.svelte';

// Testing components
export { default as EndpointTester } from './EndpointTester.svelte';
export { default as SchemaForm } from './SchemaForm.svelte';
export { default as ResponseViewer } from './ResponseViewer.svelte';
export type { EndpointListProps } from './EndpointList.svelte';
export type { EndpointDetailProps } from './EndpointDetail.svelte';
export type { ParametersTableProps } from './ParametersTable.svelte';
export type { SchemaViewProps } from './SchemaView.svelte';
export type { EndpointTesterProps } from './EndpointTester.svelte';
export type { SchemaFormProps } from './SchemaForm.svelte';
export type { ResponseViewerProps } from './ResponseViewer.svelte';

// Types
export type {
	OpenAPI,
	OpenAPIV3,
	OpenAPIV3_1,
	HttpMethod,
	Endpoint,
	EndpointGroup,
	OpenApiViewerProps
} from './types.js';

// Utilities
export {
	extractEndpoints,
	groupEndpointsByTag,
	getMethodColor,
	getMethodBgColor,
	getApiInfo
} from './utils.js';
