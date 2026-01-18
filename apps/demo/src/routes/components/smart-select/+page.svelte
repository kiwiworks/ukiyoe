<script lang="ts">
	import { SmartSelect, PageHeader, Text, addToast } from 'ukiyoe';
	import { Settings, User, LogOut, FileText, Folder, Terminal } from '@lucide/svelte';
	import PropsTable, { type PropDef } from '$lib/PropsTable.svelte';

	const propDefs: PropDef[] = [
		{ name: 'value', type: 'string', default: "''", description: 'Selected value (bindable)' },
		{ name: 'options', type: 'SmartSelectOption[]', default: '[]', description: 'Available options' },
		{ name: 'actions', type: 'SmartSelectAction[]', default: '[]', description: 'Actions that can be triggered' },
		{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interactions' },
		{ name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
		{ name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text' },
		{ name: 'emptyMessage', type: 'string', default: "'No results found'", description: 'Empty state message' },
		{ name: 'id', type: 'string', default: '-', description: 'HTML id attribute' },
		{ name: 'aria-label', type: 'string', default: '-', description: 'Accessible label' },
		{ name: 'class', type: 'string', default: "''", description: 'Additional CSS classes' },
		{ name: 'onchange', type: '(value: string) => void', default: '-', description: 'Change event handler for option selection' },
		{ name: 'filter', type: '(option: SmartSelectOption, query: string) => boolean', default: '-', description: 'Custom filter function' },
		{ name: 'highlightMatch', type: 'boolean', default: 'false', description: 'Highlight matching text in results' },
		{ name: 'highlightClass', type: 'string', default: "'bg-accent-brand/20 text-accent-brand'", description: 'Custom class for highlighted text' }
	];

	let basicValue = $state('');
	let descValue = $state('');
	let iconValue = $state('');
	let actionValue = $state('');
	let groupValue = $state('');
	let manyValue = $state('');

	const basicOptions = [
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'solid', label: 'SolidJS' }
	];

	const descOptions = [
		{ value: 'ts', label: 'TypeScript', description: 'Typed superset of JavaScript' },
		{ value: 'rs', label: 'Rust', description: 'Systems programming language' },
		{ value: 'go', label: 'Go', description: 'Fast and simple' },
		{ value: 'py', label: 'Python', description: 'Easy to learn' }
	];

	const iconOptions = [
		{ value: 'file', label: 'New File', icon: FileText, description: 'Create a new file' },
		{ value: 'folder', label: 'New Folder', icon: Folder, description: 'Create a new folder' },
		{ value: 'terminal', label: 'Open Terminal', icon: Terminal, description: 'Open terminal here' }
	];

	const commandOptions = [
		{ value: 'dashboard', label: 'Dashboard', description: 'Go to dashboard' },
		{ value: 'projects', label: 'Projects', description: 'View all projects' },
		{ value: 'analytics', label: 'Analytics', description: 'View analytics' }
	];

	const commandActions = [
		{ id: 'settings', label: 'Settings', icon: Settings, shortcut: '⌘,', onSelect: () => addToast({ description: 'Opening Settings...' }) },
		{ id: 'profile', label: 'Profile', icon: User, shortcut: '⌘P', onSelect: () => addToast({ description: 'Opening Profile...' }) },
		{ id: 'logout', label: 'Sign Out', icon: LogOut, onSelect: () => addToast({ description: 'Signing out...', variant: 'warning' }) }
	];

	const groupedOptions = [
		{ value: 'apple', label: 'Apple', group: 'Fruits' },
		{ value: 'banana', label: 'Banana', group: 'Fruits' },
		{ value: 'cherry', label: 'Cherry', group: 'Fruits' },
		{ value: 'carrot', label: 'Carrot', group: 'Vegetables' },
		{ value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
		{ value: 'spinach', label: 'Spinach', group: 'Vegetables' }
	];

	const manyOptions = Array.from({ length: 50 }, (_, i) => ({
		value: `option-${i + 1}`,
		label: `Option ${i + 1}`,
		description: `Description for option ${i + 1}`
	}));
</script>

<svelte:head>
	<title>SmartSelect - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="SmartSelect" subtitle="Searchable select with autocomplete and actions" />

<div class="space-y-xl mt-lg">
	<section>
		<Text size="lg" weight="semibold" class="mb-md">Basic Usage</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {basicValue || 'none'}</Text>
		<SmartSelect
			bind:value={basicValue}
			options={basicOptions}
			placeholder="Search frameworks..."
			highlightMatch
			class="w-72"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">With Descriptions</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {descValue || 'none'}</Text>
		<SmartSelect
			bind:value={descValue}
			options={descOptions}
			placeholder="Search languages..."
			highlightMatch
			class="w-80"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">With Icons</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {iconValue || 'none'}</Text>
		<SmartSelect
			bind:value={iconValue}
			options={iconOptions}
			placeholder="Quick actions..."
			class="w-80"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">With Actions (Command Palette Style)</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {actionValue || 'none'}</Text>
		<SmartSelect
			bind:value={actionValue}
			options={commandOptions}
			actions={commandActions}
			placeholder="Search or run command..."
			class="w-80"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">Grouped Options</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {groupValue || 'none'}</Text>
		<SmartSelect
			bind:value={groupValue}
			options={groupedOptions}
			placeholder="Search food..."
			class="w-72"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">Many Options (Scrollable)</Text>
		<Text size="sm" variant="muted" class="mb-sm">Selected: {manyValue || 'none'}</Text>
		<SmartSelect
			bind:value={manyValue}
			options={manyOptions}
			placeholder="Search 50 options..."
			class="w-72"
		/>
	</section>

	<section>
		<Text size="lg" weight="semibold" class="mb-md">Sizes</Text>
		<div class="flex gap-md items-start">
			<SmartSelect size="sm" options={basicOptions} placeholder="Small..." class="w-56" />
			<SmartSelect size="md" options={basicOptions} placeholder="Medium..." class="w-56" />
			<SmartSelect size="lg" options={basicOptions} placeholder="Large..." class="w-56" />
		</div>
	</section>

	<PropsTable props={propDefs} />
</div>

<style>
	.space-y-xl > :not(:first-child) {
		margin-top: var(--spacing-xl);
	}
</style>
