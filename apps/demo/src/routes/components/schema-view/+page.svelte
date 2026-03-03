<script lang="ts">
	import { SchemaView } from 'ukiyoe/openapi';
	import { PageHeader, Heading, Text } from 'ukiyoe/core';
	import PropsTable, { type PropDef } from '$lib/PropsTable.svelte';

	const propDefs: PropDef[] = [
		{ name: 'schema', type: 'SchemaObject | ReferenceObject | boolean', description: 'The OpenAPI schema to display' },
		{ name: 'depth', type: 'number', default: '0', description: 'Nesting depth for indentation' },
		{ name: 'propertyName', type: 'string', description: 'Property name when rendering as part of an object' },
		{ name: 'isRequired', type: 'boolean', default: 'false', description: 'Whether this property is required' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	];

	// Sample schemas for demos
	const simpleSchema = {
		type: 'string',
		description: 'A user identifier'
	};

	const objectSchema = {
		type: 'object',
		required: ['id', 'name'],
		properties: {
			id: { type: 'integer', format: 'int64', description: 'Unique identifier' },
			name: { type: 'string', description: 'Display name' },
			email: { type: 'string', format: 'email', description: 'Email address' },
			status: {
				type: 'string',
				enum: ['active', 'inactive', 'pending'],
				description: 'Account status'
			}
		}
	};

	const arraySchema = {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				id: { type: 'integer' },
				tag: { type: 'string' }
			}
		}
	};

	const nestedSchema = {
		type: 'object',
		required: ['pet'],
		properties: {
			pet: {
				type: 'object',
				required: ['name'],
				properties: {
					name: { type: 'string' },
					category: {
						type: 'object',
						properties: {
							id: { type: 'integer' },
							name: { type: 'string' }
						}
					}
				}
			}
		}
	};

	const constrainedSchema = {
		type: 'object',
		properties: {
			age: {
				type: 'integer',
				minimum: 0,
				maximum: 150,
				description: 'Age in years'
			},
			username: {
				type: 'string',
				minLength: 3,
				maxLength: 20,
				pattern: '^[a-z0-9_]+$',
				description: 'Username (lowercase, numbers, underscores)'
			}
		}
	};
</script>

<svelte:head>
	<title>SchemaView - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="SchemaView" subtitle="Display OpenAPI schema definitions with expand/collapse support" />

<div class="space-y-xl mt-lg">
	<section class="space-y-md">
		<Heading level={2}>Basic Usage</Heading>
		<Text variant="secondary">Display simple schema types with descriptions.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<SchemaView schema={simpleSchema as never} propertyName="userId" />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Object Schema</Heading>
		<Text variant="secondary">Display object schemas with properties, showing required fields and types.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<SchemaView schema={objectSchema as never} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Array Schema</Heading>
		<Text variant="secondary">Display array schemas with item type information.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<SchemaView schema={arraySchema as never} propertyName="tags" />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Nested Objects</Heading>
		<Text variant="secondary">Deeply nested schemas with expand/collapse controls.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<SchemaView schema={nestedSchema as never} />
		</div>
	</section>

	<section class="space-y-md">
		<Heading level={2}>Constraints</Heading>
		<Text variant="secondary">Display validation constraints like min/max, patterns, and length limits.</Text>
		<div class="rounded-lg border border-border-subtle bg-bg-secondary p-lg">
			<SchemaView schema={constrainedSchema as never} />
		</div>
	</section>

	<PropsTable props={propDefs} />
</div>
