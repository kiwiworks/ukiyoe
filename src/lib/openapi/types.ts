/**
 * OpenAPI Viewer Types
 *
 * Re-exports from @scalar/openapi-types and internal types
 */

// Re-export OpenAPI types from scalar
export type {
	OpenAPI,
	OpenAPIV3,
	OpenAPIV3_1
} from '@scalar/openapi-types';

import type { OpenAPI, OpenAPIV3, OpenAPIV3_1 } from '@scalar/openapi-types';

/**
 * HTTP methods supported by OpenAPI
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';

/**
 * Normalized endpoint for display
 */
export interface Endpoint {
	/** Unique ID for this endpoint */
	id: string;
	/** HTTP method */
	method: HttpMethod;
	/** Path template (e.g., /users/{id}) */
	path: string;
	/** Operation summary */
	summary?: string;
	/** Operation description */
	description?: string;
	/** Tags for grouping */
	tags: string[];
	/** Whether the endpoint is deprecated */
	deprecated?: boolean;
	/** Operation ID */
	operationId?: string;
	/** Original operation object */
	operation: OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject;
}

/**
 * Endpoints grouped by tag
 */
export interface EndpointGroup {
	/** Tag name */
	tag: string;
	/** Tag description */
	description?: string;
	/** Endpoints in this group */
	endpoints: Endpoint[];
}

/**
 * Props for the OpenApiViewer component
 */
export interface OpenApiViewerProps {
	/** Parsed and dereferenced OpenAPI document */
	spec: OpenAPI.Document;
	/** Base URL for resolving relative server URLs (e.g., the URL where the spec was fetched from) */
	baseUrl?: string;
	/** Additional CSS classes */
	class?: string;
}
