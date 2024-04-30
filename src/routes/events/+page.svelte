<script lang="ts">
	import { googleCalendar } from '$utils/calendarEvent';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.events[0]);
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

<ul class="Events__content">
	{#each data.events as item, index}
		{@const [day, month, year] = item.date.split('/')}
		{@const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))}
		{@const startTime = new Date(date)}
		<!-- <a
			href={googleCalendar({
				title: item.name,
				description: item.description,
				startTime: date.toISOString(),
				endTime: date.toISOString(),
				location: item.venueLink,
				date: date.toISOString()
			})}
		>
			google cal
		</a> -->
		<li class="Event">
			<div class="Event__left">
				<span>{item.category}</span>
				<h2>{date.getDate()}</h2>
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
						<span class="Event__separator--content"> 10:00 AM - 12:00 PM </span>
					</div>
					<div class="Event__separator">
						<span class="Event__separator--icon" data-icon={String.fromCharCode(57544)}>
							Venue
						</span>
						<hr />
						<span class="Event__separator--content"> Online </span>
					</div>
					<div class="Event__right--actions Row--j-end w-100 gap-10">
						<a
							target="_blank"
							class="CrispButton"
							data-type="black-outline"
							rel="noopener noreferrer"
							data-icon={String.fromCharCode(58715)}
							href="https://www.google.com/maps/search/?api=1&query=34.052235, -118.243683"
						>
							Map
						</a>
						<button class="CrispButton" data-icon={String.fromCharCode(61317)}>
							Add to calender
						</button>
					</div>
				</div>
			</div>
		</li>

		<!-- <hr class="Events__content--separator" /> -->
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
	}
</style>
