<script lang="ts">
	import { browser } from '$app/environment';
	import type { OpenAPI } from '@scalar/openapi-types';
	import {
		OpenApiViewer,
		PageHeader,
		Badge,
		Button,
		CodeEditor,
		Alert,
		Text,
		Tabs,
		Input
	} from 'ukiyoe';

	// Petstore sample spec URL
	const PETSTORE_URL = 'https://petstore3.swagger.io/api/v3/openapi.json';

	// Track the base URL for the current spec
	let specBaseUrl = $state<string | undefined>(undefined);

	let specInput = $state('');
	let specUrl = $state('');
	let parsedSpec = $state<OpenAPI.Document | null>(null);
	let parseError = $state<string | null>(null);
	let isLoading = $state(false);
	let activeTab = $state('viewer');

	const tabs = [
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'editor', label: 'Editor' }
	];

	// Load Petstore on mount (client-side only)
	$effect(() => {
		if (browser) {
			loadFromUrl(PETSTORE_URL);
		}
	});

	// Extract base URL from a full URL
	function getBaseUrl(url: string): string {
		try {
			const parsed = new URL(url);
			return `${parsed.protocol}//${parsed.host}`;
		} catch {
			return '';
		}
	}

	// Pretty print JSON
	function formatJson(text: string): string {
		try {
			const parsed = JSON.parse(text);
			return JSON.stringify(parsed, null, 2);
		} catch {
			// If it's not valid JSON (might be YAML), return as-is
			return text;
		}
	}

	async function loadFromUrl(url: string) {
		if (!browser || !url.trim()) return;

		isLoading = true;
		parseError = null;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			const text = await response.text();
			specInput = formatJson(text);
			specUrl = url;
			specBaseUrl = getBaseUrl(url);
			await parseSpec(text);
		} catch (err) {
			parseError = `Failed to load from URL: ${err instanceof Error ? err.message : 'Unknown error'}`;
		} finally {
			isLoading = false;
		}
	}

	async function loadPetstore() {
		specUrl = PETSTORE_URL;
		await loadFromUrl(PETSTORE_URL);
	}

	async function parseSpec(input: string) {
		if (!browser) return;

		if (!input.trim()) {
			parsedSpec = null;
			parseError = null;
			return;
		}

		isLoading = true;
		parseError = null;

		try {
			// Dynamically import to avoid SSR issues with ajv
			const { dereference, validate } = await import('@scalar/openapi-parser');

			// Validate first
			const validation = await validate(input);
			if (!validation.valid) {
				const errorMessages =
					validation.errors?.map((e) => e.message).join(', ') ?? 'Unknown validation error';
				parseError = `Validation failed: ${errorMessages}`;
				parsedSpec = null;
				return;
			}

			// Dereference to resolve all $refs
			const result = await dereference(input);
			if (result.errors?.length) {
				const errorMessages = result.errors.map((e) => e.message).join(', ');
				parseError = `Parsing warnings: ${errorMessages}`;
			}

			parsedSpec = result.schema ?? null;
		} catch (err) {
			parseError = `Parse error: ${err instanceof Error ? err.message : 'Unknown error'}`;
			parsedSpec = null;
		} finally {
			isLoading = false;
		}
	}

	function handleParseClick() {
		parseSpec(specInput);
	}
</script>

<svelte:head>
	<title>OpenAPI Viewer - Ukiyoe UI</title>
</svelte:head>

<div class="flex flex-col h-full">
	<PageHeader title="OpenAPI Viewer" subtitle="Visualize and explore OpenAPI specifications">
		{#snippet badges()}
			<Badge size="sm" variant="brand" text="Beta" />
		{/snippet}
	</PageHeader>

	<Tabs bind:value={activeTab} {tabs} class="flex-1 flex flex-col mt-lg overflow-hidden">
		{#snippet children(tabValue)}
			{#if tabValue === 'viewer'}
				<div class="flex-1 overflow-hidden">
					{#if isLoading}
						<div class="flex items-center justify-center h-full">
							<Text variant="muted">Loading specification...</Text>
						</div>
					{:else if parseError && !parsedSpec}
						<div class="p-lg">
							<Alert variant="danger">{parseError}</Alert>
						</div>
					{:else if parsedSpec}
						<OpenApiViewer spec={parsedSpec} baseUrl={specBaseUrl} class="h-full" />
					{:else}
						<div class="flex flex-col items-center justify-center h-full gap-md">
							<Text variant="muted">No specification loaded</Text>
							<Button variant="primary" size="sm" onclick={loadPetstore}>
								Load Petstore Example
							</Button>
						</div>
					{/if}
				</div>
			{:else if tabValue === 'editor'}
				<div class="flex-1 flex flex-col p-lg overflow-hidden">
					<div class="flex flex-col flex-1 gap-md overflow-hidden">
						<!-- URL Loading -->
						<div class="shrink-0 space-y-xs">
							<Text size="sm" class="font-medium">Load from URL</Text>
							<div class="flex gap-sm">
								<Input
									bind:value={specUrl}
									placeholder="https://api.example.com/openapi.json"
									size="sm"
									class="flex-1 font-mono"
								/>
								<Button
									variant="primary"
									size="sm"
									onclick={() => loadFromUrl(specUrl)}
									disabled={isLoading || !specUrl.trim()}
								>
									{isLoading ? 'Loading...' : 'Load'}
								</Button>
								<Button variant="ghost" size="sm" onclick={loadPetstore} disabled={isLoading}>
									Petstore
								</Button>
							</div>
						</div>

						{#if parseError}
							<Alert variant="warning" class="shrink-0">{parseError}</Alert>
						{/if}

						<!-- Spec Editor -->
						<div class="flex-1 flex flex-col min-h-0 gap-xs">
							<div class="shrink-0 flex items-center justify-between">
								<Text size="sm" class="font-medium">Specification (JSON or YAML)</Text>
								<Button
									variant="primary"
									size="sm"
									onclick={handleParseClick}
									disabled={isLoading || !specInput.trim()}
								>
									{isLoading ? 'Parsing...' : 'Parse & View'}
								</Button>
							</div>
							<div class="flex-1 min-h-0">
								<CodeEditor
									value={specInput}
									onchange={(v) => (specInput = v)}
									language="json"
									placeholder="Paste your OpenAPI JSON or YAML here..."
									class="h-full"
								/>
							</div>
						</div>

						<Text variant="muted" size="xs" class="shrink-0">
							Supports OpenAPI 3.0 and 3.1 specifications. All $ref pointers will be automatically
							resolved.
						</Text>
					</div>
				</div>
			{/if}
		{/snippet}
	</Tabs>
</div>
