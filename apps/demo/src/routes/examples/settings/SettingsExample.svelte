<script lang="ts">
	import {
		SectionCard,
		Input,
		Textarea,
		Select,
		Switch,
		RadioGroup,
		Slider,
		Checkbox,
		Button,
		Alert,
		Divider,
		Tabs,
		addToast,
		type RadioOption,
		type SelectOption
	} from 'ukiyoe/core';

	// Tab state
	let activeTab = $state('general');
	const tabs = [
		{ value: 'general', label: 'General' },
		{ value: 'appearance', label: 'Appearance' },
		{ value: 'notifications', label: 'Notifications' },
		{ value: 'api', label: 'API Keys' }
	];

	// General settings
	let username = $state('kiwidev');
	let email = $state('dev@kiwiworks.io');
	let bio = $state('Full-stack developer building modern web applications.');
	let language = $state('en');
	let timezone = $state('utc');

	const languages: SelectOption[] = [
		{ value: 'en', label: 'English' },
		{ value: 'fr', label: 'French' },
		{ value: 'de', label: 'German' },
		{ value: 'ja', label: 'Japanese' },
		{ value: 'ko', label: 'Korean' }
	];

	const timezones: SelectOption[] = [
		{ value: 'utc', label: 'UTC' },
		{ value: 'est', label: 'US Eastern (EST)' },
		{ value: 'pst', label: 'US Pacific (PST)' },
		{ value: 'cet', label: 'Central European (CET)' },
		{ value: 'jst', label: 'Japan (JST)' }
	];

	// Appearance
	let themeMode = $state('system');
	const themeOptions: RadioOption[] = [
		{ value: 'system', label: 'System' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	];
	let fontSize = $state([14]);
	let reduceMotion = $state(false);
	let compactMode = $state(false);

	// Notifications
	let emailNotifs = $state(true);
	let pushNotifs = $state(false);
	let notifTrades = $state(true);
	let notifAlerts = $state(true);
	let notifNews = $state(false);
	let notifSystem = $state(true);

	// API Keys
	let apiEndpoint = $state('https://api.kiwiworks.io/v1');
	let apiKey = $state('sk-kw-xxxxxxxxxxxxxxxxxxxx');
	let webhookUrl = $state('');

	// Saved state tracking
	const initialState = {
		username: 'kiwidev',
		email: 'dev@kiwiworks.io',
		bio: 'Full-stack developer building modern web applications.',
		language: 'en',
		timezone: 'utc',
		themeMode: 'system',
		fontSize: 14,
		reduceMotion: false,
		compactMode: false,
		emailNotifs: true,
		pushNotifs: false,
		notifTrades: true,
		notifAlerts: true,
		notifNews: false,
		notifSystem: true,
		apiEndpoint: 'https://api.kiwiworks.io/v1',
		apiKey: 'sk-kw-xxxxxxxxxxxxxxxxxxxx',
		webhookUrl: ''
	};

	let interacted = $state(false);
	let isDirty = $derived(
		interacted && (
			username !== initialState.username ||
			email !== initialState.email ||
			bio !== initialState.bio ||
			language !== initialState.language ||
			timezone !== initialState.timezone ||
			themeMode !== initialState.themeMode ||
			fontSize[0] !== initialState.fontSize ||
			reduceMotion !== initialState.reduceMotion ||
			compactMode !== initialState.compactMode ||
			emailNotifs !== initialState.emailNotifs ||
			pushNotifs !== initialState.pushNotifs ||
			notifTrades !== initialState.notifTrades ||
			notifAlerts !== initialState.notifAlerts ||
			notifNews !== initialState.notifNews ||
			notifSystem !== initialState.notifSystem ||
			apiEndpoint !== initialState.apiEndpoint ||
			apiKey !== initialState.apiKey ||
			webhookUrl !== initialState.webhookUrl
		)
	);

	function markDirty() {
		interacted = true;
	}

	function handleSave() {
		addToast({ title: 'Settings saved', description: 'Your preferences have been updated.', variant: 'success' });
	}

	function handleReset() {
		interacted = false;
		username = initialState.username;
		email = initialState.email;
		bio = initialState.bio;
		language = initialState.language;
		timezone = initialState.timezone;
		themeMode = initialState.themeMode;
		fontSize = [initialState.fontSize];
		reduceMotion = initialState.reduceMotion;
		compactMode = initialState.compactMode;
		emailNotifs = initialState.emailNotifs;
		pushNotifs = initialState.pushNotifs;
		notifTrades = initialState.notifTrades;
		notifAlerts = initialState.notifAlerts;
		notifNews = initialState.notifNews;
		notifSystem = initialState.notifSystem;
		apiEndpoint = initialState.apiEndpoint;
		apiKey = initialState.apiKey;
		webhookUrl = initialState.webhookUrl;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="space-y-md" oninput={markDirty} onchange={markDirty}>
	{#if isDirty}
		<Alert variant="warning" title="Unsaved changes" dismissible>
			You have unsaved changes. Save or discard before navigating away.
		</Alert>
	{/if}

	<Tabs {tabs} bind:value={activeTab}>
		{#snippet children(tab)}
			<div class="mt-md space-y-md">
				{#if tab === 'general'}
					<SectionCard title="Profile">
						<div class="space-y-md">
							<Input bind:value={username} size="sm" id="username" aria-label="Username" />
							<Input bind:value={email} type="email" size="sm" id="email" aria-label="Email" />
							<Textarea bind:value={bio} size="sm" id="bio" aria-label="Bio" />
						</div>
					</SectionCard>

					<SectionCard title="Locale">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-md">
							<div>
								<label for="language" class="block text-sm text-text-secondary mb-xs">Language</label>
								<Select options={languages} bind:value={language} size="sm" id="language" />
							</div>
							<div>
								<label for="timezone" class="block text-sm text-text-secondary mb-xs">Timezone</label>
								<Select options={timezones} bind:value={timezone} size="sm" id="timezone" />
							</div>
						</div>
					</SectionCard>

				{:else if tab === 'appearance'}
					<SectionCard title="Theme">
						<div class="space-y-lg">
							<div>
								<p class="block text-sm text-text-secondary mb-sm">Color Scheme</p>
								<RadioGroup options={themeOptions} bind:value={themeMode} size="sm" />
							</div>
							<Divider />
							<div>
								<p class="block text-sm text-text-secondary mb-sm">Font Size: {fontSize[0]}px</p>
								<Slider bind:value={fontSize} min={10} max={20} step={1} size="sm" />
							</div>
						</div>
					</SectionCard>

					<SectionCard title="Accessibility">
						<div class="space-y-md">
							<Switch bind:checked={reduceMotion} size="sm">Reduce motion</Switch>
							<Switch bind:checked={compactMode} size="sm">Compact mode</Switch>
						</div>
					</SectionCard>

				{:else if tab === 'notifications'}
					<SectionCard title="Channels">
						<div class="space-y-md">
							<Switch bind:checked={emailNotifs} size="sm">Email notifications</Switch>
							<Switch bind:checked={pushNotifs} size="sm">Push notifications</Switch>
						</div>
					</SectionCard>

					<SectionCard title="Categories">
						<div class="space-y-md">
							<Checkbox bind:checked={notifTrades} size="sm">Trade executions</Checkbox>
							<Checkbox bind:checked={notifAlerts} size="sm">Price alerts</Checkbox>
							<Checkbox bind:checked={notifNews} size="sm">Market news</Checkbox>
							<Checkbox bind:checked={notifSystem} size="sm">System updates</Checkbox>
						</div>
					</SectionCard>

				{:else if tab === 'api'}
					<SectionCard title="API Configuration">
						<div class="space-y-md">
							<div>
								<label for="api-endpoint" class="block text-sm text-text-secondary mb-xs">API Endpoint</label>
								<Input bind:value={apiEndpoint} size="sm" id="api-endpoint" aria-label="API Endpoint" />
							</div>
							<div>
								<label for="api-key" class="block text-sm text-text-secondary mb-xs">API Key</label>
								<Input bind:value={apiKey} type="password" size="sm" id="api-key" aria-label="API Key" />
							</div>
						</div>
					</SectionCard>

					<SectionCard title="Webhooks">
						<div class="space-y-md">
							<div>
								<label for="webhook" class="block text-sm text-text-secondary mb-xs">Webhook URL</label>
								<Input bind:value={webhookUrl} placeholder="https://..." size="sm" id="webhook" aria-label="Webhook URL" />
							</div>
							<Alert variant="info">
								Webhooks will receive POST requests for trade events and system notifications.
							</Alert>
						</div>
					</SectionCard>
				{/if}
			</div>
		{/snippet}
	</Tabs>

	<Divider spacing="md" />

	<div class="flex gap-sm justify-end">
		<Button variant="ghost" size="sm" onClick={handleReset} disabled={!isDirty}>Discard</Button>
		<Button variant="primary" size="sm" onClick={handleSave} disabled={!isDirty}>Save Changes</Button>
	</div>
</div>
