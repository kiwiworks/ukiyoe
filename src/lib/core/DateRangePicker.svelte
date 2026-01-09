<script lang="ts" module>
	import type { DateValue } from '@internationalized/date';
	import type { DateRange } from 'bits-ui';

	export type DateRangePickerSize = 'sm' | 'md' | 'lg';

	export interface DateModifier {
		/** Match function - return true if date should be modified */
		match: (date: Date) => boolean;
		/** Optional CSS class to apply to matching dates */
		class?: string;
		/** Disable matching dates */
		disabled?: boolean;
	}

	export interface DateRangePickerProps {
		/** Selected date range (bindable) */
		value?: DateRange | undefined;
		/** Date modifiers for customizing date appearance/behavior */
		modifiers?: DateModifier[];
		/** Size preset */
		size?: DateRangePickerSize;
		/** Placeholder text when no range selected */
		placeholder?: string;
		/** Disable interactions */
		disabled?: boolean;
		/** Number of months to display */
		numberOfMonths?: number;
		/** Minimum selectable date */
		minValue?: DateValue;
		/** Maximum selectable date */
		maxValue?: DateValue;
		/** Allow selecting dates marked as disabled by modifiers (still styled, but selectable) */
		allowUnavailable?: boolean;
		/** HTML id attribute */
		id?: string;
		/** Accessible label for screen readers */
		'aria-label'?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onchange?: (value: DateRange | undefined) => void;
	}
</script>

<script lang="ts">
	import { RangeCalendar, Popover } from 'bits-ui';
	import { Calendar, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		today
	} from '@internationalized/date';

	let {
		value = $bindable(undefined),
		modifiers = [],
		size = 'md',
		placeholder = 'Select date range',
		disabled = false,
		numberOfMonths = 2,
		minValue,
		maxValue,
		allowUnavailable = false,
		id,
		'aria-label': ariaLabel,
		class: className = '',
		onchange
	}: DateRangePickerProps = $props();

	let open = $state(false);

	const df = new DateFormatter('en-US', { dateStyle: 'medium' });

	const sizeClasses: Record<DateRangePickerSize, string> = {
		sm: 'py-1.5 px-2 text-sm',
		md: 'py-2 px-3 text-sm',
		lg: 'py-3 px-4 text-base'
	};

	const iconSizes: Record<DateRangePickerSize, number> = {
		sm: 14,
		md: 16,
		lg: 18
	};

	const displayValue = $derived.by(() => {
		if (!value?.start) return placeholder;
		const startStr = df.format(value.start.toDate(getLocalTimeZone()));
		if (!value.end) return startStr;
		const endStr = df.format(value.end.toDate(getLocalTimeZone()));
		return `${startStr} - ${endStr}`;
	});

	function handleValueChange(newValue: DateRange | undefined) {
		value = newValue;
		onchange?.(newValue);
		if (newValue?.start && newValue?.end) {
			open = false;
		}
	}

	function dateValueToDate(dv: DateValue): Date {
		return dv.toDate(getLocalTimeZone());
	}

	function isDateDisabled(date: DateValue): boolean {
		if (allowUnavailable) return false;
		const jsDate = dateValueToDate(date);
		return modifiers.some((m) => m.disabled && m.match(jsDate));
	}

	function getDateClasses(date: DateValue): string {
		const jsDate = dateValueToDate(date);
		return modifiers
			.filter((m) => m.class && m.match(jsDate))
			.map((m) => m.class)
			.join(' ');
	}
</script>

<div class="w-full {className}">
	<Popover.Root bind:open>
		<Popover.Trigger
			{id}
			{disabled}
			aria-label={ariaLabel}
			class="relative w-full appearance-none bg-bg-secondary border border-border-default rounded-md font-mono text-text-primary cursor-pointer transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:border-accent-brand focus-visible:ring-2 focus-visible:ring-accent-brand/20 disabled:opacity-50 disabled:cursor-not-allowed text-left flex items-center gap-2 {sizeClasses[size]}"
		>
			<Calendar size={iconSizes[size]} class="text-text-muted shrink-0" />
			<span class={value?.start ? '' : 'text-text-muted'}>{displayValue}</span>
		</Popover.Trigger>

		<Popover.Portal>
			<Popover.Content
				side="bottom"
				align="start"
				sideOffset={4}
				class="z-50 rounded-md shadow-lg border border-border-default bg-bg-elevated p-3"
			>
				<RangeCalendar.Root
					bind:value
					onValueChange={handleValueChange}
					{numberOfMonths}
					{minValue}
					{maxValue}
					isDateDisabled={isDateDisabled}
					weekdayFormat="short"
					class="font-mono"
				>
					{#snippet children({ months, weekdays })}
						<RangeCalendar.Header class="flex items-center justify-between pb-2">
							<RangeCalendar.PrevButton
								class="p-1 rounded hover:bg-bg-hover transition-colors text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
							>
								<ChevronLeft size={16} />
							</RangeCalendar.PrevButton>
							<RangeCalendar.Heading class="text-sm font-medium text-text-primary" />
							<RangeCalendar.NextButton
								class="p-1 rounded hover:bg-bg-hover transition-colors text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
							>
								<ChevronRight size={16} />
							</RangeCalendar.NextButton>
						</RangeCalendar.Header>

						<div class="flex gap-4">
							{#each months as month}
								<RangeCalendar.Grid class="border-collapse">
									<RangeCalendar.GridHead>
										<RangeCalendar.GridRow class="flex">
											{#each weekdays as day}
												<RangeCalendar.HeadCell
													class="w-8 h-8 flex items-center justify-center text-xs text-text-muted"
												>
													{day.slice(0, 2)}
												</RangeCalendar.HeadCell>
											{/each}
										</RangeCalendar.GridRow>
									</RangeCalendar.GridHead>
									<RangeCalendar.GridBody>
										{#each month.weeks as week}
											<RangeCalendar.GridRow class="flex">
												{#each week as day}
													<RangeCalendar.Cell date={day} month={month.value} class="p-0">
														<RangeCalendar.Day
															class="w-8 h-8 flex items-center justify-center text-xs rounded transition-colors
																text-text-primary
																hover:bg-bg-hover
																data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none
																data-[unavailable]:text-text-disabled data-[unavailable]:line-through
																data-[outside-month]:text-text-muted data-[outside-month]:pointer-events-none
																data-[selected]:bg-accent-brand data-[selected]:text-text-inverse
																data-[selection-start]:rounded-l data-[selection-end]:rounded-r
																data-[highlighted]:bg-accent-brand/20
																{getDateClasses(day)}"
														/>
													</RangeCalendar.Cell>
												{/each}
											</RangeCalendar.GridRow>
										{/each}
									</RangeCalendar.GridBody>
								</RangeCalendar.Grid>
							{/each}
						</div>
					{/snippet}
				</RangeCalendar.Root>
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
</div>
