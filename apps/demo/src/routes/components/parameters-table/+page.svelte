<script lang="ts">
	import { ParametersTable } from 'ukiyoe/openapi';
	import { PageHeader, Heading, Text } from 'ukiyoe/core';
	import PropsTable, { type PropDef } from '$lib/PropsTable.svelte';

	const propDefs: PropDef[] = [
		{ name: 'parameters', type: '(ParameterObject | ReferenceObject)[]', description: 'Array of OpenAPI parameter objects' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	];

	// Sample parameters for demos
	const pathParameters = [
		{
			name: 'petId',
			in: 'path',
			required: true,
			description: 'ID of pet to return',
			schema: { type: 'integer', format: 'int64' }
		}
	];

	const queryParameters = [
		{
			name: 'status',
			in: 'query',
			required: true,
			description: 'Status values to filter by',
			schema: { type: 'string', enum: ['available', 'pending', 'sold'] }
		},
		{
			name: 'limit',
			in: 'query',
			required: false,
			description: 'Maximum number of results to return',
			schema: { type: 'integer', default: 20 }
		}
	];

	const mixedParameters = [
		{
			name: 'orderId',
			in: 'path',
			required: true,
			description: 'ID of the order',
			schema: { type: 'integer', format: 'int64' }
		},
		{
			name: 'include',
			in: 'query',
			required: false,
			description: 'Related resources to include',
			schema: { type: 'array', items: { type: 'string' } }
		},
		{
			name: 'Authorization',
			in: 'header',
			required: true,
			description: 'Bearer token for authentication',
			schema: { type: 'string' }
		}
	];

	const deprecatedParameters = [
		{
			name: 'userId',
			in: 'path',
			required: true,
			description: 'User identifier',
			schema: { type: 'string' }
		},
		{
			name: 'format',
			in: 'query',
			required: false,
			deprecated: true,
			description: 'Response format (deprecated, use Accept header)',
			schema: { type: 'string' }
		}
	];
</script>

<svelte:head>
	<title>ParametersTable - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="ParametersTable" subtitle="Display OpenAPI endpoint parameters in a table format" />

<div class="space-y-xl mt-lg">
	<section class="space-y-md">
		<Heading level={2}>Path Parameters</Heading>
		<Text variant="secondary">Display required path parameters with location badges.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<ParametersTable parameters={pathParameters as never} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Query Parameters</Heading>
		<Text variant="secondary">Display optional and required query parameters.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<ParametersTable parameters={queryParameters as never} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Mixed Parameter Types</Heading>
		<Text variant="secondary">Display parameters from different locations (path, query, header).</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<ParametersTable parameters={mixedParameters as never} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Deprecated Parameters</Heading>
		<Text variant="secondary">Parameters marked as deprecated show with strikethrough styling.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<ParametersTable parameters={deprecatedParameters as never} />
		</div>
	</section>

	<PropsTable props={propDefs} />
</div>
