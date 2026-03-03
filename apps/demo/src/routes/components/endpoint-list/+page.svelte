<script lang="ts">
	import { EndpointList, type Endpoint, type EndpointGroup } from 'ukiyoe/openapi';
	import { PageHeader, Heading, Text } from 'ukiyoe/core';
	import PropsTable, { type PropDef } from '$lib/PropsTable.svelte';

	const propDefs: PropDef[] = [
		{ name: 'groups', type: 'EndpointGroup[]', description: 'Array of endpoint groups (by tag)' },
		{ name: 'selectedEndpoint', type: 'Endpoint | null', description: 'Currently selected endpoint' },
		{ name: 'onSelect', type: '(endpoint: Endpoint) => void', description: 'Callback when an endpoint is selected' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	];

	const emptyOperation = {} as Endpoint['operation'];

	// Sample endpoint groups
	const groups: EndpointGroup[] = [
		{
			tag: 'pets',
			description: 'Pet operations',
			endpoints: [
				{ id: 'get-pets', tags: ['pets'], path: '/pets', method: 'get', summary: 'List all pets', operation: emptyOperation },
				{ id: 'post-pets', tags: ['pets'], path: '/pets', method: 'post', summary: 'Create a pet', operation: emptyOperation },
				{ id: 'get-pet', tags: ['pets'], path: '/pets/{petId}', method: 'get', summary: 'Get pet by ID', operation: emptyOperation },
				{ id: 'put-pet', tags: ['pets'], path: '/pets/{petId}', method: 'put', summary: 'Update a pet', operation: emptyOperation },
				{ id: 'delete-pet', tags: ['pets'], path: '/pets/{petId}', method: 'delete', summary: 'Delete a pet', operation: emptyOperation }
			]
		},
		{
			tag: 'store',
			description: 'Store operations',
			endpoints: [
				{ id: 'get-inventory', tags: ['store'], path: '/store/inventory', method: 'get', summary: 'Get inventory', operation: emptyOperation },
				{ id: 'post-order', tags: ['store'], path: '/store/order', method: 'post', summary: 'Place an order', operation: emptyOperation },
				{ id: 'get-order', tags: ['store'], path: '/store/order/{orderId}', method: 'get', summary: 'Get order by ID', operation: emptyOperation }
			]
		}
	];

	const deprecatedGroups: EndpointGroup[] = [
		{
			tag: 'legacy',
			description: 'Legacy endpoints',
			endpoints: [
				{ id: 'old-search', tags: ['legacy'], path: '/search', method: 'get', summary: 'Search', deprecated: true, operation: emptyOperation },
				{ id: 'old-upload', tags: ['legacy'], path: '/upload', method: 'post', summary: 'Upload file', deprecated: true, operation: emptyOperation }
			]
		}
	];

	let selectedEndpoint = $state<Endpoint | null>(null);
	let selectedDeprecated = $state<Endpoint | null>(null);

	function handleSelect(endpoint: Endpoint) {
		selectedEndpoint = endpoint;
	}

	function handleSelectDeprecated(endpoint: Endpoint) {
		selectedDeprecated = endpoint;
	}
</script>

<svelte:head>
	<title>EndpointList - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="EndpointList" subtitle="Sidebar navigation for OpenAPI endpoints grouped by tags" />

<div class="space-y-xl mt-lg">
	<section class="space-y-md">
		<Heading level={2}>Basic Usage</Heading>
		<Text variant="secondary">Display endpoints grouped by tags with HTTP method badges.</Text>
		<div class="w-64 bg-bg-secondary rounded-lg p-md">
			<EndpointList {groups} {selectedEndpoint} onSelect={handleSelect} />
		</div>
		{#if selectedEndpoint}
			<Text class="mt-md">Selected: <code>{selectedEndpoint.method.toUpperCase()} {selectedEndpoint.path}</code></Text>
		{/if}
	</section>

	<section class="space-y-md">
		<Heading level={2}>Deprecated Endpoints</Heading>
		<Text variant="secondary">Deprecated endpoints show with strikethrough styling.</Text>
		<div class="w-64 bg-bg-secondary rounded-lg p-md">
			<EndpointList groups={deprecatedGroups} selectedEndpoint={selectedDeprecated} onSelect={handleSelectDeprecated} />
		</div>
	</section>

	<section class="space-y-sm">
		<Heading level={2}>HTTP Method Colors</Heading>
		<Text variant="secondary">Each HTTP method has a distinct color for quick identification:</Text>
		<ul class="list-disc ml-5 text-sm text-text-secondary space-y-1">
			<li><strong class="text-text-primary">GET</strong> - Green</li>
			<li><strong class="text-text-primary">POST</strong> - Blue</li>
			<li><strong class="text-text-primary">PUT/PATCH</strong> - Amber</li>
			<li><strong class="text-text-primary">DELETE</strong> - Red</li>
		</ul>
	</section>

	<PropsTable props={propDefs} />
</div>
