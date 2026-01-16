# Agentic UI Components Design

Design specification for agent/LLM interface components in ukiyoe.

## Overview

Components for building conversational AI interfaces with tool execution visualization, streaming responses, and artifact management.

---

## 1. Conversation Primitives

### Message

Base message bubble component with role-based styling.

```typescript
interface MessageProps {
  role: 'user' | 'assistant' | 'system'
  status?: 'idle' | 'streaming' | 'complete' | 'error'
  timestamp?: Date
  children: Snippet
  actions?: Snippet // copy, regenerate, etc.
}
```

**Variants:**
- `user` - Right-aligned, accent background
- `assistant` - Left-aligned, subtle background
- `system` - Centered, muted, smaller text

**States:**
- `streaming` - Shows typing cursor, disables actions
- `error` - Error styling with retry option

### MessageList

Virtualized conversation container with auto-scroll behavior.

```typescript
interface MessageListProps {
  messages: Message[]
  autoscroll?: boolean // default: true, pause on user scroll
  onLoadMore?: () => void // infinite scroll for history
}
```

### StreamingText

Animated text reveal for LLM responses.

```typescript
interface StreamingTextProps {
  text: string
  speed?: 'instant' | 'fast' | 'natural' // chars per frame
  cursor?: boolean
  onComplete?: () => void
}
```

**Behavior:**
- Renders markdown incrementally
- Handles code blocks mid-stream
- Cursor blinks at insertion point

### ThinkingIndicator

Reasoning/processing state visualization.

```typescript
interface ThinkingIndicatorProps {
  status: 'thinking' | 'searching' | 'executing' | 'writing'
  label?: string // "Analyzing codebase...", "Running tests..."
  elapsed?: number // seconds
  collapsible?: boolean
  children?: Snippet // expanded thinking content
}
```

**Visual:** Animated dots/pulse with contextual icon based on status.

---

## 2. Tool Execution Display

### ToolCall

Shows tool invocation with parameters and status.

```typescript
interface ToolCallProps {
  name: string // "Read", "Bash", "Edit"
  parameters: Record<string, unknown>
  status: 'pending' | 'running' | 'success' | 'error' | 'cancelled'
  duration?: number // ms
  children?: Snippet // result content
}
```

**Visual States:**
- `pending` - Muted, queued indicator
- `running` - Spinner, elapsed time
- `success` - Green check, collapsible result
- `error` - Red X, error message
- `cancelled` - Strikethrough, muted

**Parameter Display:**
- Truncate long values with expand
- Syntax highlight JSON/code
- File paths as clickable links

### ToolResult

Collapsible result display.

```typescript
interface ToolResultProps {
  type: 'text' | 'code' | 'json' | 'image' | 'diff'
  content: string
  language?: string // for code/diff
  truncated?: boolean
  maxHeight?: number
}
```

### ToolChain

Vertical timeline of sequential tool executions.

```typescript
interface ToolChainProps {
  tools: ToolCall[]
  collapsed?: boolean // show only current + count
}
```

**Visual:** Vertical line connecting tool calls, current highlighted.

### ApprovalPrompt

User confirmation for sensitive operations.

```typescript
interface ApprovalPromptProps {
  title: string // "Run bash command?"
  description?: string
  command?: string // highlighted command/code
  risk?: 'low' | 'medium' | 'high'
  options: ApprovalOption[]
  onRespond: (option: ApprovalOption) => void
}

interface ApprovalOption {
  label: string // "Allow", "Deny", "Allow for session"
  value: string
  variant?: 'default' | 'destructive' | 'outline'
}
```

**Visual:** Card with warning styling based on risk level.

---

## 3. Artifact Components

### CodeArtifact

Code block with enhanced actions.

```typescript
interface CodeArtifactProps {
  filename?: string
  language: string
  content: string
  diff?: { original: string; modified: string }
  lineNumbers?: boolean
  highlightLines?: number[]
  actions?: ('copy' | 'apply' | 'download' | 'expand')[]
  onApply?: () => void
}
```

**Features:**
- Syntax highlighting (use shiki, already in demo)
- Diff view toggle (split or unified)
- Copy with feedback
- Apply button for edits
- Line highlighting for references

### FileArtifact

File creation/modification preview.

```typescript
interface FileArtifactProps {
  path: string
  operation: 'create' | 'modify' | 'delete'
  language?: string
  preview?: string // first N lines
  size?: number // bytes
  onOpen?: () => void
}
```

**Visual:** File icon, path, operation badge, expandable preview.

### ArtifactCarousel

Horizontal navigation for multiple artifacts.

```typescript
interface ArtifactCarouselProps {
  artifacts: Artifact[]
  activeIndex?: number
  onChange?: (index: number) => void
}
```

**Visual:** Tab-like navigation or horizontal scroll with indicators.

---

## 4. Input & Controls

### AgentInput

Enhanced textarea for agent interaction.

```typescript
interface AgentInputProps {
  value: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean // submitting state
  attachments?: Attachment[]
  maxAttachments?: number
  onSubmit: (value: string, attachments: Attachment[]) => void
  onAttach?: (files: File[]) => void
  onCancel?: () => void // stop generation
}

interface Attachment {
  id: string
  type: 'file' | 'image' | 'url'
  name: string
  size?: number
  preview?: string
}
```

**Features:**
- Auto-resize textarea
- File drop zone
- Paste image support
- Submit on Cmd/Ctrl+Enter
- Cancel button when loading

### ContextChip

Shows attached context item.

```typescript
interface ContextChipProps {
  type: 'file' | 'image' | 'url' | 'selection'
  label: string
  preview?: string
  onRemove?: () => void
}
```

### StopButton

Interrupt streaming/execution.

```typescript
interface StopButtonProps {
  onClick: () => void
  label?: string // default: "Stop"
}
```

**Visual:** Red/warning styling, prominent placement.

---

## 5. Status & Feedback

### AgentStatus

Connection and model information.

```typescript
interface AgentStatusProps {
  status: 'connected' | 'disconnected' | 'connecting' | 'error'
  model?: string // "claude-opus-4-5-20251101"
  latency?: number // ms
}
```

**Visual:** Dot indicator + label, fits in status bar.

### TokenUsage

Real-time token/cost tracking.

```typescript
interface TokenUsageProps {
  input: number
  output: number
  total?: number
  limit?: number // context window
  cost?: number // USD
  showCost?: boolean
}
```

**Visual:** Compact display, progress bar if limit provided.

### ConfidenceGauge

Visual confidence score (extends existing Gauge).

```typescript
interface ConfidenceGaugeProps {
  value: number // 0-1
  label?: string
  thresholds?: { low: number; medium: number } // color breakpoints
}
```

---

## 6. Compound Components

### ConversationView

Full conversation interface combining primitives.

```typescript
interface ConversationViewProps {
  messages: Message[]
  status: 'idle' | 'streaming' | 'executing'
  tools?: ToolCall[]
  onSubmit: (message: string, attachments?: Attachment[]) => void
  onStop?: () => void
  onRegenerate?: () => void
}
```

**Composition:**
```svelte
<ConversationView>
  <MessageList />
  <ToolChain />
  <AgentInput />
</ConversationView>
```

### AgentPanel

Side panel for agent interaction (extends existing SidePanel).

```typescript
interface AgentPanelProps {
  open: boolean
  position?: 'left' | 'right'
  width?: string
  children: Snippet
}
```

---

## Design Tokens

### Colors (extend theme)

```css
--agent-user-bg: var(--accent-600);
--agent-assistant-bg: var(--neutral-800);
--agent-system-bg: var(--neutral-900);

--tool-pending: var(--neutral-500);
--tool-running: var(--blue-500);
--tool-success: var(--emerald-500);
--tool-error: var(--red-500);

--streaming-cursor: var(--accent-400);
```

### Animation

```css
--streaming-speed-instant: 0ms;
--streaming-speed-fast: 10ms;
--streaming-speed-natural: 30ms;

--thinking-pulse: 1.5s ease-in-out infinite;
```

---

## Implementation Priority

### Phase 1 - Core Messaging
1. Message
2. MessageList
3. StreamingText
4. AgentInput

### Phase 2 - Tool Visualization
5. ToolCall
6. ToolResult
7. ToolChain
8. ThinkingIndicator

### Phase 3 - Artifacts
9. CodeArtifact
10. FileArtifact
11. ApprovalPrompt

### Phase 4 - Status & Polish
12. AgentStatus
13. TokenUsage
14. ConversationView (compound)

---

## Open Questions

- [ ] Should streaming handle markdown parsing incrementally or buffer?
- [ ] Virtual scrolling library choice for MessageList?
- [ ] Keyboard navigation patterns for tool chain?
- [ ] Accessibility considerations for streaming text?
- [ ] Mobile/responsive behavior for conversation view?
