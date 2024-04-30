<script lang="ts">
	import { generateDate, googleCalendar, outlookCalendar, parseDate } from '$utils/calendarEvent';
	import { clickOutside } from '$utils/onClickOutside';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(
		googleCalendar({
			title: 'Test',
			description: 'Test',
			start: generateDate(data.events[0].date, data.events[0]['time.from']),
			end: generateDate(data.events[0].date, data.events[0]['time.to']),
			location: data.events[0].venueName
		})
	);

	$: isCalendarOpen = {} as Record<string, boolean>;

	function downloadICS() {
		const cal = "data:text/calendar;charset=utf-8,BEGIN%3AVCALENDAR%0D%0AVERSION%3A2.0%0D%0APRODID%3A-%2F%2F%20github.com%2Fadd2cal%2Fadd-to-calendar-button%20%2F%2F%20atcb%20v1.15.5%20%2F%2FEN%0D%0ACALSCALE%3AGREGORIAN%0D%0ABEGIN%3AVEVENT%0D%0AUID%3A2024-04-30T22%3A23%3A01.852Z%40add-to-calendar-button%0D%0ADTSTAMP%3A20240430T222301Z%0D%0ADTSTART%3BVALUE%3DDATE%3A20240509%0D%0ADTEND%3BVALUE%3DDATE%3A20240510%0D%0ASUMMARY%3ACHS%20Webinar%20%7C%20Amdo%20Lullaby%3A%20An%20Ethnography%20of%20Childhood%20and%20Langu%0D%0A%20age%20Shift%20on%20the%20Tibetan%20Plateau%20%7C%209%20May%202024%7C%20MS%20Teams%0D%0ADESCRIPTION%3AThe%20Centre%20of%20Excellence%20for%20Himalayan%20Studies%20is%20organising%0D%0A%20%20an%20online%26nbsp%3B%20talk%20by%20Dr%20Shannon%20Ward%2C%20on%20the%20topic%26nbsp%3B%0D%0A%20Amdo%20Lullaby%3A%20An%20Ethnography%20of%20Childhood%20and%20Language%20Shift%0D%0A%20%20on%20the%20Tibetan...%0D%0AX-ALT-DESC%3BFMTTYPE%3Dtext%2Fhtml%3A%0D%0A%20%3C!DOCTYPE%20HTML%20PUBLIC%20%22%22-%2F%2FW3C%2F%2FDTD%20HTML%203.2%2F%2FEN%22%22%3E%0D%0A%20%3CHTML%3E%3CBODY%3E%0D%0A%20The%20Centre%20of%20Excellence%20for%20Himalayan%20Studies%20is%20organising%0D%0A%20%20an%20online%26nbsp%3B%20talk%20by%20Dr%20Shannon%20Ward%2C%20on%20the%20topic%26nbsp%3B%0D%0A%20Amdo%20Lullaby%3A%20An%20Ethnography%20of%20Childhood%20and%20Language%20Shift%0D%0A%20%20on%20the%20Tibetan...%0D%0A%20%3C%2FBODY%3E%3C%2FHTML%3E%0D%0ALOCATION%3AMS%20Teams%0D%0ASTATUS%3ACONFIRMED%0D%0ALAST-MODIFIED%3A20240430T222301Z%0D%0ASEQUENCE%3A0%0D%0AEND%3AVEVENT%0D%0AEND%3AVCALENDAR";
		const link = document.createElement('a');
		link.href = `webcal://${cal}`;
		link.download = 'event.ics';
		link.click();
	}
</script>

<svelte:head>
	<title>Events</title>
	<meta name="description" content="All the events that are happening at SNU." />
	<meta
		name="keywords"
		content={`
    documents,
    pdf,
    sheet,
    doc,
    newsletter`}
	/>
</svelte:head>

<div class="Events__header">
	<h2>What're the Events?</h2>
	<p>Find all the events happening at SNU here.</p>
</div>

<button
	on:click={downloadICS}
>
	Download Event
</button>

<ul class="Events__content">
	{#each data.events as item, index}
		{@const parsedDate = parseDate(item.date)}
		{@const date = new Date(parsedDate.year, parsedDate.month, parsedDate.date)}
		<li class="Event">
			<div class="Event__left">
				<span>{item.category}</span>
				<h2>{parseDate(item.date).date}</h2>
				<span>
					{date.toLocaleString('default', { month: 'short' })}
					{"'"}
					{date.toLocaleString('default', { year: '2-digit' })}
				</span>
			</div>
			<div class="Event__middle">
				<div class="Event__header">
					<h3>{item.name}</h3>
					{#if item.club}
						<p class="Event__header--club">{item.club}</p>
					{/if}
					{#if item.description}
						<p class="Event__header--desc">{item.description}</p>
					{/if}
				</div>
				<div class="Event__right">
					<div class="Event__separator">
						<span class="Event__separator--icon" data-icon={String.fromCharCode(59573)}>
							Time
						</span>
						<hr />
						<span class="Event__separator--content">
							{item['time.from']} - {item['time.to']}
						</span>
					</div>
					<div class="Event__separator">
						<span class="Event__separator--icon" data-icon={String.fromCharCode(57544)}>
							Venue
						</span>
						<hr />
						<span class="Event__separator--content">
							{item.venueName}
						</span>
					</div>
					<div class="Event__right--actions Row--j-end w-100 gap-10">
						<a
							target="_blank"
							class="CrispButton"
							data-type="black-outline"
							rel="noopener noreferrer"
							data-icon={String.fromCharCode(58715)}
							href={item.venueLink}
						>
							Map
						</a>

						<details
							data-no-marker
							use:clickOutside
							bind:open={isCalendarOpen[index]}
							class="CrispMenu Event__calendarTab"
							on:outclick={() => (isCalendarOpen[index] = false)}
						>
							<summary>
								<span data-icon={String.fromCharCode(61317)}> Add to calender </span>
							</summary>
							<ul class="CrispMenu__content">
								<a
									href={googleCalendar({
										title: item.name,
										description: item.description,
										start: generateDate(item.date, item['time.from']),
										end: generateDate(item.date, item['time.to']),
										location: item.venueName
									})}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src="/images/google-calendar.png" alt="Google Calendar" />
									Google Calendar
								</a>
								<a
									href={outlookCalendar({
										title: item.name,
										description: item.description,
										start: generateDate(item.date, item['time.from']),
										end: generateDate(item.date, item['time.to']),
										location: item.venueName
									})}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src="/images/outlook-calendar.png" alt="Outlook Calendar" />
									Outlook Calendar
								</a>
							</ul>
						</details>
					</div>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	.Events {
		&__header {
			@include box();
			padding-top: 80px;
			@include make-flex($just: flex-start);

			@include respondAt(680px) {
				padding: 0;
				margin: 40px 0 30px 0;
				@include make-flex($just: flex-start, $align: flex-start);
			}

			& > h2 {
				font-size: 45px;
				font-weight: 900;

				@include respondAt(500px) {
					font-size: 32px;
				}
			}

			& > p {
				font-size: 20px;
				font-weight: 400;
				color: var(--subFg-1);

				@include respondAt(500px) {
					font-size: 18px;
				}
			}
		}

		&__content {
			gap: 15px;
			width: 100%;
			margin-top: 30px;
			list-style: none;
			@include make-flex($just: flex-start);

			&--separator {
				border: 1px solid var(--lab-item-separator);
				border-top: none;
				border-left: none;
				border-right: none;
				width: 80%;
				flex-grow: 1;
				user-select: none;
			}
		}
	}

	.Event {
		gap: 25px;
		width: 100%;
		display: grid;
		grid-template-columns: 70px 1fr;
		box-shadow: var(--t-crp-box-shadow);

		padding: 15px;
		border-radius: 15px;
		border: 1px solid var(--t-crp-border);
		background: var(--prof-card-background-color);

		@include respondAt(500px) {
			gap: 10px;
			grid-template-rows: 40px 1fr;
			grid-template-columns: 1fr;
		}

		&__left {
			gap: 15px;
			@include make-flex($just: flex-start, $align: center);

			@include respondAt(500px) {
				gap: 10px;
				height: 30px;
				flex-direction: row;
				border-bottom: 3px solid var(--events-accent);
				border-top: 3px solid var(--events-accent);
			}

			& > span,
			& > h2 {
				color: var(--events-accent);
			}

			& > span {
				width: 100%;
				font-size: 14px;
				font-weight: 500;
				text-align: center;
				text-transform: uppercase;
				border-bottom: 3px solid var(--events-accent);
				@include respondAt(500px) {
					width: auto;
					font-size: 12px;
					border-bottom: 0px solid transparent;
				}
			}

			& > h2 {
				line-height: 1;
				font-size: 32px;
				font-weight: 600;
				@include respondAt(500px) {
					font-size: 24px;
					margin-bottom: 2px;
				}
			}
		}

		&__middle {
			gap: 24px;
			display: grid;
			@include box();
			padding: 0 0 0 24px;
			grid-template-columns: 1fr 260px;
			border-left: 1px solid var(--t-crp-border);

			@include respondAt(820px) {
				grid-template-columns: 1fr;
			}

			@include respondAt(500px) {
				padding: 0;
				border-left: none;
			}
		}

		&__header {
			gap: 8px;
			@include make-flex($dir: column, $just: flex-start, $align: flex-start);

			& > h3 {
				font-size: 28px;
				font-weight: 600;
				line-height: 1;
				color: var(--foreground);
			}

			&--club,
			&--desc {
				line-height: 1.25;
				font-weight: 400;
				color: var(--subFg-1);
			}

			&--club {
				font-size: 20px;
			}

			&--desc {
				font-size: 18px;
			}
		}

		&__separator {
			gap: 12px;
			@include box($height: auto);
			@include make-flex($dir: row);

			&--icon {
				gap: 5px;
				font-size: 14px;
				@include box(auto);
				color: var(--subFg-1);
				@include make-flex($dir: row);

				&::before {
					margin-top: 2px;
					font-size: 16px;
					color: var(--subFg-1);
				}
			}

			& > hr {
				border-bottom: 1px solid var(--lab-item-separator);
				border-top: none;
				border-left: none;
				border-right: none;
				flex-grow: 1;
				user-select: none;
			}

			&--content {
				font-size: 14px;
				font-weight: 600;

				overflow: hidden;
				white-space: nowrap;
				display: inline-block;
				text-overflow: ellipsis;
			}
		}

		&__right {
			@include box();
			@include make-flex($just: flex-start);

			&--actions {
				margin-top: 40px;
				& > a,
				& > button {
					width: 100%;
					border: 1px solid var(--lab-item-separator);
					@include respondAt(500px) {
						margin-left: auto;
					}
				}
			}
		}

		&__calendarTab {
			& > summary {
				--crp-menu-summary-padding: 0 14px 0 14px;
				& > span {
					gap: 5px;
					@include box();
					white-space: nowrap;
					@include make-flex($dir: row);
				}
			}

			& > ul {
				width: 205px;
				& > a {
					gap: 7px;
					padding: 6px 8px;
					user-select: none;
					border-radius: 6px;
					white-space: nowrap;
					text-decoration: none;
					color: var(--foreground);
					@include box(100%, 30px);
					@include make-flex($dir: row, $just: flex-start);

					& > img {
						@include box(auto);
					}
				}
				a {
					&.active,
					&:hover {
						background-color: var(--t-crp-background-hover);
					}
				}
			}
		}
	}
</style>
