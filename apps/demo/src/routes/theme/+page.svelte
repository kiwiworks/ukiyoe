<script lang="ts">
	import {
		PageHeader,
		Widget,
		Button,
		Select,
		Text,
		themeStore,
		accentPalette,
		uiScalePresets,
		bgEffects
	} from 'ukiyoe';

	const accentOptions = accentPalette.map((c) => ({ value: c.id, label: c.name }));
	const scaleOptions = uiScalePresets.map((s) => ({ value: s.id, label: s.name }));
	const effectOptions = bgEffects.map((e) => ({ value: e.id, label: e.name }));

	let selectedAccent = $state(themeStore.accent.id);
	let selectedScale = $state(themeStore.uiScale.id);
	let selectedEffect = $state<string>(themeStore.bgEffect.id);

	function handleAccentChange(value: string) {
		selectedAccent = value;
		themeStore.setAccentById(value);
	}

	function handleScaleChange(value: string) {
		selectedScale = value;
		themeStore.setUiScaleById(value);
	}

	function handleEffectChange(value: string) {
		selectedEffect = value;
		themeStore.setBgEffectById(value as 'none' | 'grid-pulse' | 'delaunay' | 'isometric' | 'particle-flow' | 'supernova');
	}
</script>

<svelte:head>
	<title>Theme Lab - Ukiyoe UI</title>
</svelte:head>

<PageHeader title="Theme Lab" subtitle="Customize the look and feel of the UI" />

<div class="space-y-xl mt-lg">
	<Widget title="Accent Color">
		<Select
			value={selectedAccent}
			options={accentOptions}
			onchange={handleAccentChange}
			size="sm"
		/>
		<div class="flex gap-sm mt-md">
			{#each accentPalette as color}
				<Button
					size="xs"
					variant={themeStore.accent.id === color.id ? 'primary' : 'ghost'}
					class="!p-0 !w-6 !h-6 !rounded-full !min-w-0"
					style="background-color: {color.hex}; border: 2px solid {themeStore.accent.id === color.id ? 'var(--text-primary)' : 'transparent'}"
					onclick={() => {
						selectedAccent = color.id;
						themeStore.setAccent(color);
					}}
				>
					<Text as="span" class="sr-only">{color.name}</Text>
				</Button>
			{/each}
		</div>
	</Widget>

	<Widget title="UI Scale">
		<Select value={selectedScale} options={scaleOptions} onchange={handleScaleChange} size="sm" />
		<Text size="xs" variant="muted" class="mt-sm">
			Current scale: {themeStore.uiScale.name}
		</Text>
	</Widget>

	<Widget title="Background Effect">
		<Select
			value={selectedEffect}
			options={effectOptions}
			onchange={handleEffectChange}
			size="sm"
		/>
		<Text size="xs" variant="muted" class="mt-sm">
			Background effects are rendered behind content for visual flair.
		</Text>
	</Widget>

	<Widget title="Preview">
		<div class="p-lg bg-bg-secondary rounded-md border border-border-subtle">
			<div class="flex gap-sm mb-md">
				<Button size="sm" variant="primary">Primary</Button>
				<Button size="sm" variant="default">Default</Button>
				<Button size="sm" variant="ghost">Ghost</Button>
			</div>
			<Text variant="primary">
				This is primary text with the current theme settings.
			</Text>
			<Text size="xs" variant="secondary" class="mt-xs">
				This is secondary text that's slightly muted.
			</Text>
		</div>
	</Widget>
</div>
