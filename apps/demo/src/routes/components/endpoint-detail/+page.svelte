<script lang="ts">
	import { EndpointDetail, type Endpoint, type OpenAPI } from 'ukiyoe/openapi';
	import { PageHeader, Heading, Text } from 'ukiyoe/core';
	import PropsTable, { type PropDef } from '$lib/PropsTable.svelte';

	const propDefs: PropDef[] = [
		{ name: 'endpoint', type: 'Endpoint', description: 'The endpoint object to display' },
		{ name: 'spec', type: 'OpenAPI.Document', description: 'The full OpenAPI spec (for schema lookups)' },
		{ name: 'baseUrl', type: 'string', default: '-', description: 'Base URL for resolving relative server URLs' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	];

	// Minimal spec for demos
	const minimalSpec: OpenAPI.Document = {
		openapi: '3.2.0',
		info: { title: 'Demo API', version: '1.0.0' },
		paths: {}
	};

	// Sample endpoints
	const getEndpoint: Endpoint = {
		id: 'get-pet-by-id',
		path: '/pets/{petId}',
		method: 'get',
		tags: ['pets'],
		summary: 'Get a pet by ID',
		description: 'Returns a single pet by its unique identifier.',
		operationId: 'getPetById',
		operation: {
			parameters: [
				{
					name: 'petId',
					in: 'path',
					required: true,
					description: 'ID of pet to return',
					schema: { type: 'integer', format: 'int64' }
				}
			],
			responses: {
				'200': {
					description: 'Successful operation',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: { type: 'integer' },
									name: { type: 'string' },
									status: { type: 'string', enum: ['available', 'sold'] }
								}
							}
						}
					}
				},
				'404': { description: 'Pet not found' }
			}
		}
	};

	const postEndpoint: Endpoint = {
		id: 'create-pet',
		path: '/pets',
		method: 'post',
		tags: ['pets'],
		summary: 'Create a new pet',
		description: 'Add a new pet to the store inventory.',
		operationId: 'createPet',
		operation: {
			requestBody: {
				description: 'Pet object to add',
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							required: ['name'],
							properties: {
								name: { type: 'string', description: 'Pet name' },
								tag: { type: 'string', description: 'Optional tag' }
							}
						}
					}
				}
			},
			responses: {
				'201': {
					description: 'Pet created',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									id: { type: 'integer' },
									name: { type: 'string' }
								}
							}
						}
					}
				},
				'400': { description: 'Invalid input' }
			}
		}
	};

	const deprecatedEndpoint: Endpoint = {
		id: 'find-pets-by-status',
		path: '/pets/findByStatus',
		method: 'get',
		tags: ['pets'],
		summary: 'Find pets by status',
		description: 'Returns pets filtered by status. Use /pets with query params instead.',
		operationId: 'findPetsByStatus',
		deprecated: true,
		operation: {
			parameters: [
				{
					name: 'status',
					in: 'query',
					required: true,
					description: 'Status to filter by',
					schema: { type: 'string' }
				}
			],
			responses: {
				'200': { description: 'Successful operation' }
			}
		}
	};
</script>

<svelte:head>
	<title>EndpointDetail - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="EndpointDetail" subtitle="Display full details for an OpenAPI endpoint" />

<div class="space-y-xl mt-lg">
	<section class="space-y-md">
		<Heading level={2}>GET Endpoint</Heading>
		<Text variant="secondary">Display a GET endpoint with path parameters and responses.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<EndpointDetail endpoint={getEndpoint} spec={minimalSpec} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>POST Endpoint</Heading>
		<Text variant="secondary">Display a POST endpoint with request body schema.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<EndpointDetail endpoint={postEndpoint} spec={minimalSpec} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Deprecated Endpoint</Heading>
		<Text variant="secondary">Deprecated endpoints show a warning badge and alert.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<EndpointDetail endpoint={deprecatedEndpoint} spec={minimalSpec} />
		</div>
	</section>

	<PropsTable props={propDefs} />
</div>
