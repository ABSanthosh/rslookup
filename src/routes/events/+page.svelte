<!-- TODO: Add a toggle for expired events, sections sorted by month, year -->
<!-- TODO: Use a datepicker to pick a range to show the events in that range -->
<script lang="ts">
  import {
    generateDate,
    googleCalendar,
    isValidDate,
    outlookCalendar,
    parseDate
  } from '$utils/calendarEvent';
  import clickOutside from '$utils/onClickOutside';
  import type { PageData } from './$types';
  import google_calendar from '$images/google-calendar.png';
  import outlook_calendar from '$images/outlook-calendar.png';
  import apple_calendar from '$images/apple-calendar.svg';
  import type { IEvents } from '$types/Events.types';

  let {
    data
  }: {
    data: PageData;
  } = $props();

  let isCalendarOpen = $derived({} as Record<string, boolean>);
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

{#snippet EventCard(item: IEvents, isExpired: boolean, index: number)}
  {@const parsedDate = parseDate(item.date)}
  {@const date = new Date(parsedDate.year, parsedDate.month, parsedDate.date)}
  <li class="Event" class:expired={isExpired}>
    <div class="Event__left">
      <span>{item.category}</span>
      <h2>{isValidDate(date) ? parseDate(item.date).date : 'TBA'}</h2>
      <span>
        {#if isValidDate(date)}
          {date.toLocaleString('default', { month: 'short' })}
          {"'"}
          {date.toLocaleString('default', { year: '2-digit' })}
        {:else}
          TBA
        {/if}
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
          <span class="Event__separator--icon" data-icon="schedule"> Time </span>
          <hr />
          <span class="Event__separator--content">
            {item['time.from']} - {item['time.to']}
          </span>
        </div>
        <div class="Event__separator">
          <span class="Event__separator--icon" data-icon="location_on"> Venue </span>
          <hr />
          <span class="Event__separator--content">
            {item.venueName}
          </span>
        </div>
        <div class="Event__right--actions w-100 h-100 gap-10">
          <a
            data-icon="map"
            target="_blank"
            class="CrispButton"
            href={item.venueLink}
            data-type="black-outline"
            rel="noopener noreferrer"
          >
            Map
          </a>

          <details
            data-no-marker
            use:clickOutside
            bind:open={isCalendarOpen[index]}
            class="CrispMenu Event__calendarTab"
            onOutClick={() => (isCalendarOpen[index] = false)}
          >
            <summary>
              <span data-icon="calendar_add_on"> Add to calendar </span>
            </summary>
            <ul class="CrispMenu__content" data-direction="top" data-align="right">
              <a
                class="Event__calendarTab--item"
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
                <img src={google_calendar} alt="Google Calendar" />
                Google Calendar
              </a>
              <a
                class="Event__calendarTab--item"
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
                <img src={outlook_calendar} alt="Outlook Calendar" />
                Outlook Calendar
              </a>
              <a
                class="Event__calendarTab--item"
                href={`/events/api?&title=${item.name}&description=${item.description}&start=${generateDate(item.date, item['time.from'])}&end=${generateDate(item.date, item['time.to'])}&location=${item.venueName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={apple_calendar} alt="Apple Calendar" />
                Apple Calendar
              </a>
            </ul>
          </details>
        </div>
      </div>
    </div>
  </li>
{/snippet}

<ul class="Events__content">
  {#if data.upcomingEvents.length !== 0}
    {#each data.upcomingEvents as item, index}
      {@render EventCard(item, false, index)}
    {/each}
  {:else}
    <i class="CrispMessage" data-type="info" data-format="box">
      <span style="line-height: 1.3;">
        No upcoming events found at the moment. Check the official
        <a href="https://snu.edu.in/events/" target="_blank" rel="noopener noreferrer">
          SNU website
        </a>
        for departmental events.
      </span>
    </i>
  {/if}
</ul>

{#if data.expiredEvents.length !== 0}
  <div class="Events__header">
    <h2>Expired Events</h2>
    <p>These events have already passed.</p>
  </div>
  <ul class="Events__content">
    {#each data.expiredEvents as item, index}
      {@render EventCard(item, true, index)}
    {/each}
  </ul>
{/if}

<style lang="scss">
  .Events {
    &__header {
      @include box();
      padding-top: 80px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 40px 0 0px 0;
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

      @include respondAt(680px) {
        margin: 0;
      }
    }
  }

  .Event {
    gap: 25px;
    width: 100%;
    display: grid;
    position: relative;
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

    &.expired {
      &::before {
        content: 'Expired';
        top: 50%;
        left: 50%;
        z-index: 2;
        font-size: 60px;
        font-weight: 900;
        font-weight: 600;
        padding: 5px 10px;
        position: absolute;
        border-radius: 15px 15px;
        color: var(--foreground);
        transform: translate(-50%, -50%) rotate(-7deg);
      }

      &::after {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        content: '';
        opacity: 0.3;
        position: absolute;
        border-radius: 15px;
        background: rgba(235, 109, 109, 0.41);
      }
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
          font-size: 16px;
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
        font-size: 16px;
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
      min-width: 0;
      @include make-flex($just: flex-start);

      &--actions {
        margin-top: 40px;
        @include make-flex($dir: row, $just: space-between, $align: flex-end);
        & > a {
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

      &--item {
        gap: 7px;
        padding: 6px 8px;
        user-select: none;
        border-radius: 6px;
        white-space: nowrap;
        text-decoration: none;
        color: var(--foreground);
        @include box(100%, 30px);
        background-color: var(--elevation-1);
        @include make-flex($dir: row, $just: flex-start);

        & > img {
          @include box(auto);
        }
        &:hover {
          background-color: var(--t-crp-background-hover);
        }
      }
      & > ul {
        width: 205px;
      }
    }
  }
</style>
