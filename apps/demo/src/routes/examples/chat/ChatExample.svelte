<script lang="ts">
	import { Text } from 'ukiyoe/core';
	import {
		Message,
		MessageList,
		AgentInput,
		ToolCallDisplay,
		ToolCallGroup,
		ThinkingIndicator,
		Markdown,
		UsageDisplay,
		type MessageRole,
		type MessageStatus,
		type ToolCallStatus,
		type StatItem
	} from 'ukiyoe/agentic';

	interface ChatMessage {
		id: string;
		role: MessageRole;
		content: string;
		status: MessageStatus;
		timestamp: Date;
		thinkContent?: string;
		toolCalls?: {
			name: string;
			status: ToolCallStatus;
			summary?: string;
			duration?: number;
			result?: unknown;
		}[];
	}

	let messages: ChatMessage[] = $state([
		{
			id: '1',
			role: 'system',
			content: 'You are a helpful coding assistant. You have access to file system tools and web search.',
			status: 'complete',
			timestamp: new Date(2025, 2, 3, 10, 0, 0)
		},
		{
			id: '2',
			role: 'user',
			content: 'Can you read my package.json and tell me what framework I\'m using?',
			status: 'complete',
			timestamp: new Date(2025, 2, 3, 10, 0, 30)
		},
		{
			id: '3',
			role: 'assistant',
			content: 'Based on the `package.json`, your project uses **Svelte 5** with **SvelteKit** as the meta-framework. Here are the key dependencies:\n\n- `svelte`: ^5.0.0\n- `@sveltejs/kit`: ^2.0.0\n- `tailwindcss`: ^4.0.0\n- `bits-ui`: for headless UI primitives\n\nThe project appears to be a **component library** with a demo site.',
			status: 'complete',
			timestamp: new Date(2025, 2, 3, 10, 0, 45),
			thinkContent: 'The user wants to know about their framework. Let me read the package.json first to give an accurate answer.',
			toolCalls: [
				{
					name: 'read_file',
					status: 'success',
					summary: 'Read package.json (1.2KB)',
					duration: 120,
					result: '{ "name": "ukiyoe", "dependencies": { "svelte": "^5.0.0" } }'
				}
			]
		},
		{
			id: '4',
			role: 'user',
			content: 'What are the latest best practices for Svelte 5 runes?',
			status: 'complete',
			timestamp: new Date(2025, 2, 3, 10, 2, 0)
		},
		{
			id: '5',
			role: 'assistant',
			content: 'Here are the key **Svelte 5 runes** best practices:\n\n### State Management\n```typescript\n// Use $state for reactive variables\nlet count = $state(0);\nlet items = $state<string[]>([]);\n```\n\n### Derived Values\n```typescript\n// Use $derived for computed values\nlet doubled = $derived(count * 2);\nlet filtered = $derived(items.filter(i => i.length > 3));\n```\n\n### Effects\n```typescript\n// Use $effect for side effects\n$effect(() => {\n  console.log(`Count changed to ${count}`);\n});\n```\n\n### Props\n```typescript\n// Use $props() for component props\nlet { name, age = 25 }: Props = $props();\n```\n\n### Key Recommendations\n1. Prefer `$derived` over `$effect` for computed values\n2. Use `$state.raw()` for large arrays/objects that don\'t need deep reactivity\n3. Avoid `$effect` for synchronizing state — use `$derived` instead\n4. Use `$bindable()` only when two-way binding is truly needed',
			status: 'complete',
			timestamp: new Date(2025, 2, 3, 10, 2, 20),
			toolCalls: [
				{
					name: 'web_search',
					status: 'success',
					summary: 'Searched: "Svelte 5 runes best practices 2025"',
					duration: 1800
				},
				{
					name: 'read_url',
					status: 'success',
					summary: 'Read svelte.dev/docs/runes',
					duration: 950
				}
			]
		}
	]);

	let isStreaming = $state(false);
	let inputValue = $state('');

	const usageStats: StatItem[] = [
		{ label: 'Input', value: '2,847' },
		{ label: 'Output', value: '1,203' },
		{ label: 'Total', value: '4,050' }
	];

	function handleSubmit(value: string) {
		if (!value.trim() || isStreaming) return;

		const userMsg: ChatMessage = {
			id: String(messages.length + 1),
			role: 'user',
			content: value,
			status: 'complete',
			timestamp: new Date()
		};
		messages = [...messages, userMsg];
		inputValue = '';
		isStreaming = true;

		const assistantMsg: ChatMessage = {
			id: String(messages.length + 1),
			role: 'assistant',
			content: '',
			status: 'streaming',
			timestamp: new Date()
		};
		messages = [...messages, assistantMsg];

		const response = "I understand your question. Let me think about this...\n\nBased on my analysis, here's what I found. The approach you're describing is a common pattern in modern web development. I'd recommend starting with a simple implementation and iterating from there.";
		const words = response.split(' ');
		let wordIndex = 0;

		const interval = setInterval(() => {
			if (wordIndex < words.length) {
				const lastMsg = messages[messages.length - 1];
				messages = [
					...messages.slice(0, -1),
					{ ...lastMsg, content: lastMsg.content + (wordIndex > 0 ? ' ' : '') + words[wordIndex] }
				];
				wordIndex++;
			} else {
				clearInterval(interval);
				const lastMsg = messages[messages.length - 1];
				messages = [
					...messages.slice(0, -1),
					{ ...lastMsg, status: 'complete' }
				];
				isStreaming = false;
			}
		}, 60);
	}

	function handleCancel() {
		isStreaming = false;
		const lastMsg = messages[messages.length - 1];
		if (lastMsg.role === 'assistant' && lastMsg.status === 'streaming') {
			messages = [
				...messages.slice(0, -1),
				{ ...lastMsg, status: 'complete' }
			];
		}
	}
</script>

<div class="flex flex-col border border-border-default rounded-lg overflow-hidden h-[calc(100dvh-13rem)] min-h-[400px]">
	<div class="flex-1 min-h-0 flex flex-col">
		<MessageList autoscroll class="flex-1 min-h-0">
			{#each messages as msg (msg.id)}
				<Message
					role={msg.role}
					status={msg.status}
					timestamp={msg.timestamp}
					thinkContent={msg.thinkContent}
				>
					{#if msg.toolCalls?.length}
						<ToolCallGroup
							label="Tool Calls"
							status={msg.toolCalls.every(t => t.status === 'success') ? 'success' : 'running'}
							count={msg.toolCalls.length}
							completed={msg.toolCalls.filter(t => t.status === 'success').length}
						>
							{#each msg.toolCalls as tool}
								<ToolCallDisplay
									name={tool.name}
									status={tool.status}
									summary={tool.summary}
									duration={tool.duration}
									result={tool.result}
								/>
							{/each}
						</ToolCallGroup>
					{/if}
					{#if msg.content}
						{#if msg.role === 'assistant'}
							<Markdown content={msg.content} />
						{:else}
							<Text size="sm">{msg.content}</Text>
						{/if}
					{/if}
				</Message>
			{/each}
			{#if isStreaming && messages[messages.length - 1]?.content === ''}
				<ThinkingIndicator status="thinking" label="Generating response..." />
			{/if}
		</MessageList>
	</div>

	<div class="border-t border-border-default bg-bg-secondary">
		<div class="p-sm">
			<UsageDisplay items={usageStats} size="xs" />
		</div>
		<AgentInput
			bind:value={inputValue}
			placeholder="Ask a question..."
			loading={isStreaming}
			onSubmit={handleSubmit}
			onCancel={handleCancel}
		/>
	</div>
</div>
