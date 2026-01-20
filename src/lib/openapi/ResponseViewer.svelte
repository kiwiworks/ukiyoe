<script lang="ts" module>
	export interface ApiResponse {
		status: number;
		statusText: string;
		headers: Record<string, string>;
		body: unknown;
		duration: number;
		error?: string;
		contentType?: string;
	}

	export interface ResponseViewerProps {
		/** The response to display */
		response: ApiResponse | null;
		/** Whether a request is in progress */
		loading?: boolean;
		/** Additional CSS classes */
		class?: string;
	}
</script>

<script lang="ts">
	import { cn } from '../utils/cn.js';
	import { Badge, Text, Tabs, CodeBlock, Skeleton } from '../index.js';

	let { response, loading = false, class: className = '' }: ResponseViewerProps = $props();

	// Status color based on code
	function getStatusVariant(
		status: number
	): 'success' | 'warning' | 'danger' | 'default' | 'brand' {
		if (status >= 200 && status < 300) return 'success';
		if (status >= 300 && status < 400) return 'brand';
		if (status >= 400 && status < 500) return 'warning';
		if (status >= 500) return 'danger';
		return 'default';
	}

	// Detect language from content type
	function getLanguageFromContentType(contentType: string | undefined): string {
		if (!contentType) return 'text';
		const ct = contentType.toLowerCase();
		if (ct.includes('application/json') || ct.includes('+json')) return 'json';
		if (ct.includes('text/html') || ct.includes('application/xhtml')) return 'html';
		if (ct.includes('text/xml') || ct.includes('application/xml') || ct.includes('+xml')) return 'xml';
		if (ct.includes('text/css')) return 'css';
		if (ct.includes('text/javascript') || ct.includes('application/javascript')) return 'javascript';
		if (ct.includes('text/yaml') || ct.includes('application/yaml')) return 'yaml';
		return 'text';
	}

	// Format body for display
	function formatBody(body: unknown, contentType: string | undefined): string {
		if (body === null || body === undefined) return '';
		if (typeof body === 'string') {
			// Try to format JSON if it looks like JSON
			if (contentType?.includes('json') || body.trim().startsWith('{') || body.trim().startsWith('[')) {
				try {
					const parsed = JSON.parse(body);
					return JSON.stringify(parsed, null, 2);
				} catch {
					return body;
				}
			}
			return body;
		}
		return JSON.stringify(body, null, 2);
	}

	const contentType = $derived(response?.contentType ?? response?.headers['content-type']);
	const bodyLanguage = $derived(getLanguageFromContentType(contentType));
	const formattedBody = $derived(response ? formatBody(response.body, contentType) : '');
	const headerEntries = $derived(response ? Object.entries(response.headers) : []);
	const headerCount = $derived(headerEntries.length);

	let activeTab = $state('body');
</script>

<div class={cn('', className)}>
	{#if loading}
		<div class="space-y-md p-md">
			<Skeleton class="h-6 w-32" />
			<Skeleton class="h-40 w-full" />
		</div>
	{:else if response}
		<div class="space-y-md">
			<!-- Status line -->
			<div class="flex items-center gap-md flex-wrap">
				<Badge variant={getStatusVariant(response.status)} size="sm" text={String(response.status)} />
				<Text size="sm" variant="secondary">{response.statusText}</Text>
				<Text size="xs" variant="muted">{response.duration}ms</Text>
				{#if response.error}
					<Badge variant="danger" size="xs" text="Error" />
				{/if}
			</div>

			{#if response.error}
				<div class="p-md bg-negative/10 border border-negative rounded-md">
					<Text variant="negative" size="sm">{response.error}</Text>
				</div>
			{/if}

			<!-- Response tabs -->
			<Tabs
				tabs={[
					{ value: 'body', label: 'Body' },
					{ value: 'headers', label: `Headers (${headerCount})` }
				]}
				bind:value={activeTab}
			>
				{#snippet children(tabValue)}
					{#if tabValue === 'body'}
						{#if formattedBody}
							<CodeBlock code={formattedBody} language={bodyLanguage} class="max-h-80 overflow-auto" />
						{:else}
							<Text variant="muted" size="sm">No response body</Text>
						{/if}
					{:else if tabValue === 'headers'}
						{#if headerEntries.length > 0}
							<div class="bg-bg-tertiary rounded-md p-md font-mono text-sm space-y-xs max-h-60 overflow-auto">
								{#each headerEntries as [key, value] (key)}
									<div class="flex gap-sm">
										<span class="text-accent-brand font-medium">{key}:</span>
										<span class="text-text-secondary break-all">{value}</span>
									</div>
								{/each}
							</div>
						{:else}
							<Text variant="muted" size="sm">No headers</Text>
						{/if}
					{/if}
				{/snippet}
			</Tabs>
		</div>
	{:else}
		<div class="p-lg text-center">
			<Text variant="muted" size="sm">Send a request to see the response</Text>
		</div>
	{/if}
</div>
