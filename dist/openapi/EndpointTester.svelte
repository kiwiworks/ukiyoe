<script lang="ts" module>
	import type { Endpoint, OpenAPI, OpenAPIV3, OpenAPIV3_1 } from './types.js';

	export interface EndpointTesterProps {
		/** The endpoint to test */
		endpoint: Endpoint;
		/** The full OpenAPI spec (for servers and schema lookups) */
		spec: OpenAPI.Document;
		/** Base URL to use when spec servers are relative (e.g., the URL where the spec was loaded from) */
		baseUrl?: string;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { Button, Input, Select, Text, Badge, Tabs, Alert, Textarea, Switch } from '../index.js';
	import SchemaForm from './SchemaForm.svelte';
	import ResponseViewer, { type ApiResponse } from './ResponseViewer.svelte';

	let { endpoint, spec, baseUrl, class: className = '' }: EndpointTesterProps = $props();

	type ParameterObject = OpenAPIV3.ParameterObject | OpenAPIV3_1.ParameterObject;
	type RequestBodyObject = OpenAPIV3.RequestBodyObject | OpenAPIV3_1.RequestBodyObject;
	type SchemaObject = OpenAPIV3.SchemaObject | OpenAPIV3_1.SchemaObject;

	const operation = $derived(
		endpoint.operation as OpenAPIV3.OperationObject | OpenAPIV3_1.OperationObject
	);

	// Extract servers from spec
	const servers = $derived((spec as OpenAPIV3.Document).servers ?? [{ url: '' }]);
	const serverOptions = $derived(
		servers.map((s, i) => ({
			value: String(i),
			label: s.url || 'Default'
		}))
	);

	// State
	let selectedServerIndex = $state('0');
	let parameterValues = $state<Record<string, string>>({});
	let headerValues = $state<Record<string, string>>({});
	let bodyValue = $state<unknown>({});
	let bodyRaw = $state('');
	let useRawBody = $state(false);
	let response = $state<ApiResponse | null>(null);
	let loading = $state(false);

	// Auth state (persists across endpoint switches)
	let authType = $state<'none' | 'bearer' | 'basic' | 'apiKey'>('none');
	let authToken = $state('');
	let apiKeyName = $state('');
	let apiKeyLocation = $state<'header' | 'query'>('header');

	// Extract security schemes from spec
	const securitySchemes = $derived.by(() => {
		const components = (spec as OpenAPIV3.Document).components;
		if (!components?.securitySchemes) return [];
		return Object.entries(components.securitySchemes)
			.filter((entry): entry is [string, OpenAPIV3.SecuritySchemeObject] => !('$ref' in entry[1]))
			.map(([name, scheme]) => ({ name, scheme }));
	});

	const authOptions = $derived.by(() => {
		const options: { value: string; label: string }[] = [{ value: 'none', label: 'No Auth' }];
		for (const { name, scheme } of securitySchemes) {
			if (scheme.type === 'http' && scheme.scheme === 'bearer') {
				options.push({ value: 'bearer', label: `${name} (Bearer)` });
			} else if (scheme.type === 'http' && scheme.scheme === 'basic') {
				options.push({ value: 'basic', label: `${name} (Basic)` });
			} else if (scheme.type === 'apiKey') {
				options.push({ value: 'apiKey', label: `${name} (API Key: ${scheme.in})` });
			}
		}
		// Always offer a manual bearer option if not already present
		if (!options.some((o) => o.value === 'bearer')) {
			options.push({ value: 'bearer', label: 'Bearer Token' });
		}
		return options;
	});

	// Auto-set apiKey name/location when selecting an apiKey scheme
	function handleAuthTypeChange(value: string) {
		authType = value as typeof authType;
		if (value === 'apiKey') {
			const apiKeyScheme = securitySchemes.find(
				({ scheme }) => scheme.type === 'apiKey'
			);
			if (apiKeyScheme && apiKeyScheme.scheme.type === 'apiKey') {
				apiKeyName = apiKeyScheme.scheme.name ?? '';
				apiKeyLocation = (apiKeyScheme.scheme.in as 'header' | 'query') ?? 'header';
			}
		}
	}

	// Track the last endpoint id to detect switches
	let lastEndpointId = $state('');

	// Reset form state when switching endpoints (auth state intentionally excluded)
	$effect(() => {
		if (endpoint.id !== lastEndpointId) {
			lastEndpointId = endpoint.id;
			parameterValues = {};
			headerValues = {};
			bodyValue = {};
			bodyRaw = '';
			useRawBody = false;
			response = null;
			loading = false;
			selectedServerIndex = '0';
			selectedContentType = 'application/json';
			activeTab = 'headers';
		}
	});

	// Extract parameters by location (filter out params without names)
	const parameters = $derived(
		((operation.parameters ?? []) as ParameterObject[]).filter((p): p is ParameterObject & { name: string } => !!p.name)
	);
	const pathParams = $derived(parameters.filter((p) => p.in === 'path'));
	const queryParams = $derived(parameters.filter((p) => p.in === 'query'));
	const headerParams = $derived(parameters.filter((p) => p.in === 'header'));

	// Request body
	const requestBody = $derived(operation.requestBody as RequestBodyObject | undefined);
	const hasRequestBody = $derived(!!requestBody);
	const contentTypes = $derived(
		requestBody?.content ? Object.keys(requestBody.content) : []
	);
	let selectedContentType = $state('application/json');

	// Get schema for selected content type
	const bodySchema = $derived.by(() => {
		if (!requestBody?.content) return null;
		const mediaType = requestBody.content[selectedContentType];
		return mediaType?.schema as SchemaObject | undefined;
	});

	// Initialize content type
	$effect(() => {
		if (contentTypes.length > 0 && !contentTypes.includes(selectedContentType)) {
			selectedContentType = contentTypes[0];
		}
	});

	// Build the URL with path and query parameters
	function buildUrl(): string {
		const server = servers[Number(selectedServerIndex)];
		let serverUrl = server?.url ?? '';

		// Handle relative URLs - use provided baseUrl or current origin
		if (serverUrl.startsWith('/')) {
			const origin = baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : '');
			serverUrl = origin + serverUrl;
		} else if (!serverUrl.startsWith('http://') && !serverUrl.startsWith('https://')) {
			// Relative URL without leading slash
			const origin = baseUrl ?? (typeof window !== 'undefined' ? window.location.origin : '');
			serverUrl = origin + '/' + serverUrl;
		}

		// Strip trailing slashes to prevent double-slash when path starts with /
		const normalizedServer = serverUrl.replace(/\/+$/, '');

		// Replace path parameters — keep placeholder visible when value is empty
		let path = endpoint.path;
		for (const param of pathParams) {
			const value = parameterValues[param.name];
			if (value) {
				path = path.replace(`{${param.name}}`, encodeURIComponent(value));
			}
		}

		// Build query string
		const queryParts: string[] = [];
		for (const param of queryParams) {
			const value = parameterValues[param.name];
			if (value !== undefined && value !== '') {
				queryParts.push(`${encodeURIComponent(param.name)}=${encodeURIComponent(value)}`);
			}
		}

		// Inject API key as query param when configured
		if (authType === 'apiKey' && apiKeyLocation === 'query' && authToken) {
			queryParts.push(`${encodeURIComponent(apiKeyName)}=${encodeURIComponent(authToken)}`);
		}

		const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
		return normalizedServer + path + queryString;
	}

	// Build headers
	function buildHeaders(): Record<string, string> {
		const headers: Record<string, string> = {};

		// Add content type for requests with body
		if (hasRequestBody && (endpoint.method === 'post' || endpoint.method === 'put' || endpoint.method === 'patch')) {
			headers['Content-Type'] = selectedContentType;
		}

		// Inject auth header
		if (authType === 'bearer' && authToken) {
			headers['Authorization'] = `Bearer ${authToken}`;
		} else if (authType === 'basic' && authToken) {
			headers['Authorization'] = `Basic ${authToken}`;
		} else if (authType === 'apiKey' && apiKeyLocation === 'header' && authToken) {
			headers[apiKeyName] = authToken;
		}

		// Add custom header parameters
		for (const param of headerParams) {
			const value = headerValues[param.name];
			if (value !== undefined && value !== '') {
				headers[param.name] = value;
			}
		}

		return headers;
	}

	// Strip empty optional string values from request objects
	function stripEmptyOptionals(obj: unknown, schema: SchemaObject | null | undefined): unknown {
		if (!schema || typeof obj !== 'object' || obj === null || Array.isArray(obj)) return obj;
		const requiredSet = new Set(schema.required ?? []);
		const properties = schema.properties ?? {};
		const result: Record<string, unknown> = {};
		for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
			if (val === '' && !requiredSet.has(key)) continue;
			const propSchema = properties[key] as SchemaObject | undefined;
			result[key] = typeof val === 'object' && val !== null
				? stripEmptyOptionals(val, propSchema)
				: val;
		}
		return result;
	}

	// Build request body
	function buildBody(): string | undefined {
		if (!hasRequestBody) return undefined;
		if (endpoint.method === 'get' || endpoint.method === 'delete') return undefined;

		if (useRawBody) {
			return bodyRaw;
		}

		if (selectedContentType === 'application/json') {
			const cleaned = stripEmptyOptionals(bodyValue, bodySchema);
			return JSON.stringify(cleaned);
		}

		if (selectedContentType === 'application/x-www-form-urlencoded') {
			const params = new URLSearchParams();
			if (typeof bodyValue === 'object' && bodyValue !== null) {
				for (const [key, val] of Object.entries(bodyValue)) {
					if (val !== undefined && val !== '') {
						params.append(key, String(val));
					}
				}
			}
			return params.toString();
		}

		return JSON.stringify(bodyValue);
	}

	// Execute the request
	async function executeRequest() {
		loading = true;
		response = null;

		const url = buildUrl();
		const headers = buildHeaders();
		const body = buildBody();
		const startTime = performance.now();

		try {
			const res = await fetch(url, {
				method: endpoint.method.toUpperCase(),
				headers,
				body
			});

			const duration = Math.round(performance.now() - startTime);

			// Parse response headers
			const responseHeaders: Record<string, string> = {};
			res.headers.forEach((value, key) => {
				responseHeaders[key] = value;
			});

			// Parse response body
			let responseBody: unknown;
			const contentType = res.headers.get('content-type') ?? '';
			if (contentType.includes('application/json')) {
				try {
					responseBody = await res.json();
				} catch {
					responseBody = await res.text();
				}
			} else {
				responseBody = await res.text();
			}

			response = {
				status: res.status,
				statusText: res.statusText,
				headers: responseHeaders,
				body: responseBody,
				duration,
				contentType
			};
		} catch (err) {
			const duration = Math.round(performance.now() - startTime);
			response = {
				status: 0,
				statusText: 'Network Error',
				headers: {},
				body: null,
				duration,
				error: err instanceof Error ? err.message : 'Request failed. This may be due to CORS restrictions.'
			};
		} finally {
			loading = false;
		}
	}

	// Helper to get parameter schema
	function getParamSchema(param: ParameterObject): SchemaObject | undefined {
		return param.schema as SchemaObject | undefined;
	}

	const showBodyEditor = $derived(
		hasRequestBody && ['post', 'put', 'patch'].includes(endpoint.method)
	);

	let activeTab = $state('parameters');
</script>

<div class={cn('space-y-lg', className)}>
	<!-- Server Selection -->
	{#if servers.length > 1}
		<div class="space-y-xs">
			<Text size="sm" class="font-medium">Server</Text>
			<Select
				options={serverOptions}
				value={selectedServerIndex}
				onValueChange={(v) => (selectedServerIndex = v)}
				size="sm"
			/>
		</div>
	{/if}

	<!-- URL Preview -->
	<div class="space-y-xs">
		<Text size="sm" class="font-medium">Request URL</Text>
		<div class="flex items-center gap-sm p-sm bg-bg-tertiary rounded-md font-mono text-sm">
			<Badge
				variant={endpoint.method === 'get' ? 'success' : endpoint.method === 'post' ? 'brand' : endpoint.method === 'delete' ? 'danger' : 'warning'}
				size="xs"
				text={endpoint.method.toUpperCase()}
			/>
			<code class="text-text-secondary break-all">{buildUrl()}</code>
		</div>
	</div>

	<!-- Path Parameters (inline, always visible) -->
	{#if pathParams.length > 0}
		<div class="p-sm bg-bg-secondary rounded-md border border-border-subtle space-y-sm">
			<Text size="xs" variant="muted" class="uppercase tracking-wider">Path Parameters</Text>
			<div class="grid gap-sm" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
				{#each pathParams as param (param.name)}
					{@const schema = getParamSchema(param)}
					<div class="space-y-xs">
						<div class="flex items-center gap-xs">
							<Text size="sm" class="font-medium">{param.name}</Text>
							{#if param.required}
								<Badge variant="danger" size="xs" text="required" />
							{/if}
						</div>
						{#if param.description}
							<Text variant="muted" size="xs">{param.description}</Text>
						{/if}
						<Input
							size="sm"
							placeholder={schema?.example !== undefined ? `e.g. ${schema.example}` : param.name}
							value={parameterValues[param.name] ?? ''}
							onValueChange={(v) => (parameterValues[param.name] = v)}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Auth Section -->
	{#if authOptions.length > 1}
		<div class="flex items-center gap-sm">
			<Text size="sm" class="font-medium shrink-0">Auth</Text>
			<Select
				options={authOptions}
				value={authType}
				onValueChange={handleAuthTypeChange}
				size="sm"
				class="max-w-48"
			/>
			{#if authType !== 'none'}
				<Input
					size="sm"
					type="password"
					placeholder={authType === 'basic' ? 'base64 encoded credentials' : authType === 'apiKey' ? `${apiKeyName} value` : 'Token'}
					value={authToken}
					onValueChange={(v) => (authToken = v)}
					class="flex-1"
				/>
			{/if}
		</div>
	{/if}

	<!-- Parameters & Body Tabs -->
	<Tabs
		tabs={[
			...(queryParams.length > 0 ? [{ value: 'parameters', label: `Query (${queryParams.length})` }] : []),
			...(showBodyEditor ? [{ value: 'body', label: 'Body' }] : []),
			{ value: 'headers', label: `Headers (${headerParams.length})` }
		]}
		bind:value={activeTab}
	>
		{#snippet children(tabValue)}
			{#if tabValue === 'parameters'}
				<div class="space-y-sm">
					{#each queryParams as param (param.name)}
						{@const schema = getParamSchema(param)}
						<div class="space-y-xs">
							<div class="flex items-center gap-sm">
								<Text size="sm" class="font-medium">{param.name}</Text>
								{#if param.required}
									<Badge variant="danger" size="xs" text="required" />
								{/if}
							</div>
							{#if param.description}
								<Text variant="muted" size="xs">{param.description}</Text>
							{/if}
							{#if schema?.enum}
								<Select
									size="sm"
									options={schema.enum.map((v: unknown) => ({ value: String(v), label: String(v) }))}
									value={parameterValues[param.name] ?? ''}
									onValueChange={(v) => (parameterValues[param.name] = v)}
									placeholder="Select..."
								/>
							{:else}
								<Input
									size="sm"
									placeholder={schema?.example !== undefined ? `e.g. ${schema.example}` : param.name}
									value={parameterValues[param.name] ?? ''}
									onValueChange={(v) => (parameterValues[param.name] = v)}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{:else if tabValue === 'body' && showBodyEditor}
				<div class="space-y-md">
					{#if contentTypes.length > 1}
						<div class="space-y-xs">
							<Text size="sm" class="font-medium">Content-Type</Text>
							<Select
								size="sm"
								options={contentTypes.map((ct) => ({ value: ct, label: ct }))}
								value={selectedContentType}
								onValueChange={(v) => (selectedContentType = v)}
							/>
						</div>
					{/if}

					<label class="flex items-center gap-sm cursor-pointer">
						<Switch
							checked={useRawBody}
							onValueChange={(checked) => (useRawBody = checked)}
							size="sm"
						/>
						<Text size="sm">Raw JSON</Text>
					</label>

					{#if useRawBody}
						<Textarea
							value={bodyRaw}
							onValueChange={(v) => (bodyRaw = v)}
							placeholder={'{"key": "value"}'}
							rows={10}
							size="sm"
							class="font-mono"
						/>
					{:else if bodySchema}
						<SchemaForm
							schema={bodySchema as OpenAPIV3.SchemaObject}
							value={bodyValue}
							onValueChange={(v) => (bodyValue = v)}
						/>
					{:else}
						<Textarea
							value={bodyRaw}
							onValueChange={(v) => (bodyRaw = v)}
							placeholder="Request body..."
							rows={6}
							size="sm"
						/>
					{/if}
				</div>
			{:else if tabValue === 'headers'}
				<div class="space-y-md">
					{#if headerParams.length > 0}
						{#each headerParams as param (param.name)}
							<div class="space-y-xs">
								<div class="flex items-center gap-sm">
									<Text size="sm" class="font-medium">{param.name}</Text>
									{#if param.required}
										<Badge variant="danger" size="xs" text="required" />
									{/if}
								</div>
								{#if param.description}
									<Text variant="muted" size="xs">{param.description}</Text>
								{/if}
								<Input
									size="sm"
									placeholder={param.name}
									value={headerValues[param.name] ?? ''}
									onValueChange={(v) => (headerValues[param.name] = v)}
								/>
							</div>
						{/each}
					{:else}
						<Text variant="muted" size="sm">No custom headers for this endpoint</Text>
					{/if}

					<!-- Show computed headers -->
					<div class="space-y-xs pt-md border-t border-border-subtle">
						<Text size="sm" variant="muted" class="uppercase tracking-wider">Request Headers</Text>
						<div class="font-mono text-xs text-text-secondary bg-bg-tertiary p-sm rounded">
							{#each Object.entries(buildHeaders()) as [key, value] (key)}
								<div>{key}: {value}</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/snippet}
	</Tabs>

	<!-- Execute Button -->
	<div class="flex items-center gap-md">
		<Button onClick={executeRequest} disabled={loading} variant="primary" size="sm">
			{loading ? 'Sending...' : 'Send Request'}
		</Button>
		{#if response}
			<Button onClick={() => (response = null)} variant="ghost" size="sm">
				Clear Response
			</Button>
		{/if}
	</div>

	<!-- CORS Warning -->
	<Alert variant="warning" dismissible class="text-xs">
		Requests are made from your browser. CORS restrictions may block requests to APIs that don't allow cross-origin requests.
	</Alert>

	<!-- Response -->
	{#if response || loading}
		<div class="space-y-sm">
			<Text size="sm" class="font-medium">Response</Text>
			<ResponseViewer {response} {loading} />
		</div>
	{/if}
</div>
