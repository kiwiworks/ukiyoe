/**
 * OpenAPI Viewer Utilities
 */

import type { OpenAPI, OpenAPIV3, OpenAPIV3_1, HttpMethod, Endpoint, EndpointGroup } from './types.js';

const HTTP_METHODS: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'];

/**
 * Extract all endpoints from an OpenAPI spec
 */
export function extractEndpoints(spec: OpenAPI.Document): Endpoint[] {
	const endpoints: Endpoint[] = [];
	const paths = spec.paths ?? {};

	for (const [path, pathItem] of Object.entries(paths)) {
		if (!pathItem) continue;

		for (const method of HTTP_METHODS) {
			const operation = pathItem[method] as OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject | undefined;
			if (!operation) continue;

			endpoints.push({
				id: `${method}-${path}`,
				method,
				path,
				summary: operation.summary,
				description: operation.description,
				tags: operation.tags ?? ['default'],
				deprecated: operation.deprecated,
				operationId: operation.operationId,
				operation
			});
		}
	}

	return endpoints;
}

/**
 * Group endpoints by tag
 */
export function groupEndpointsByTag(endpoints: Endpoint[], spec: OpenAPI.Document): EndpointGroup[] {
	const tagMap = new Map<string, Endpoint[]>();
	const tagDescriptions = new Map<string, string>();

	// Get tag descriptions from spec
	const tags = (spec as OpenAPIV3.Document | OpenAPIV3_1.Document).tags ?? [];
	for (const tag of tags) {
		if (tag.name) {
			tagDescriptions.set(tag.name, tag.description ?? '');
		}
	}

	// Group endpoints
	for (const endpoint of endpoints) {
		for (const tag of endpoint.tags) {
			const existing = tagMap.get(tag) ?? [];
			existing.push(endpoint);
			tagMap.set(tag, existing);
		}
	}

	// Convert to array and sort
	const groups: EndpointGroup[] = [];
	for (const [tag, tagEndpoints] of tagMap.entries()) {
		groups.push({
			tag,
			description: tagDescriptions.get(tag),
			endpoints: tagEndpoints
		});
	}

	// Sort groups alphabetically, but put 'default' last
	groups.sort((a, b) => {
		if (a.tag === 'default') return 1;
		if (b.tag === 'default') return -1;
		return a.tag.localeCompare(b.tag);
	});

	return groups;
}

/**
 * Get color class for HTTP method
 */
export function getMethodColor(method: HttpMethod): string {
	switch (method) {
		case 'get':
			return 'text-positive';
		case 'post':
			return 'text-info';
		case 'put':
			return 'text-warning';
		case 'delete':
			return 'text-negative';
		case 'patch':
			return 'text-accent-brand';
		default:
			return 'text-text-muted';
	}
}

/**
 * Get background color class for HTTP method badge
 */
export function getMethodBgColor(method: HttpMethod): string {
	switch (method) {
		case 'get':
			return 'bg-positive-muted';
		case 'post':
			return 'bg-info-muted';
		case 'put':
			return 'bg-warning-muted';
		case 'delete':
			return 'bg-negative-muted';
		case 'patch':
			return 'bg-accent-brand-muted';
		default:
			return 'bg-bg-tertiary';
	}
}

/**
 * Get API info from spec
 */
export function getApiInfo(spec: OpenAPI.Document): {
	title: string;
	version: string;
	description?: string;
} {
	const info = spec.info;
	return {
		title: info?.title ?? 'API Documentation',
		version: info?.version ?? '1.0.0',
		description: info?.description
	};
}
