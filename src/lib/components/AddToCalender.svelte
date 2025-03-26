<script lang="ts">
  import google_calendar from '$images/google-calendar.png';
  import outlook_calendar from '$images/outlook-calendar.png';
  import apple_calendar from '$images/apple-calendar.svg';
  import { googleCalendar, outlookCalendar } from '$utils/calendarEvent';
  import clickOutside from '$utils/onClickOutside';

  const eventItem: {
    name: string;
    description: string;
    // TODO: Why is date not used here. It should be used in the calender to combine with start and end time
    date?: string;
    startTime: Date;
    endTime: Date;
    venueName: string;
    calenders: ('google' | 'outlook' | 'apple')[];
    isText?: boolean;
  } = $props();

  let isCalendarOpen = $state(false);
</script>

<details
  data-no-marker
  use:clickOutside
  bind:open={isCalendarOpen}
  class="CrispMenu AddToCalender"
  onOutClick={() => (isCalendarOpen = false)}
>
  <summary>
    <span data-icon="calendar_add_on">
      {#if eventItem.isText}
        Add to calendar
      {/if}
    </span>
  </summary>
  <ul class="CrispMenu__content" data-direction="bottom" data-align="right">
    {#if !eventItem.calenders || eventItem.calenders.includes('google')}
      <a
        class="AddToCalender--item"
        href={googleCalendar({
          title: eventItem.name,
          description: eventItem.description,
          start: eventItem.startTime,
          end: eventItem.endTime,
          location: eventItem.venueName
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={google_calendar} alt="Google Calendar" />
        Google Calendar
      </a>
    {/if}
    {#if !eventItem.calenders || eventItem.calenders.includes('outlook')}
      <a
        class="AddToCalender--item"
        href={outlookCalendar({
          title: eventItem.name,
          description: eventItem.description,
          start: eventItem.startTime,
          end: eventItem.endTime,
          location: eventItem.venueName
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={outlook_calendar} alt="Outlook Calendar" />
        Outlook Calendar
      </a>
    {/if}
    {#if !eventItem.calenders || eventItem.calenders.includes('apple')}
      <a
        class="AddToCalender--item"
        href={`/events/api?&title=${eventItem.name}&description=${eventItem.description}&start=${eventItem.startTime}&end=${eventItem.endTime}&location=${eventItem.venueName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={apple_calendar} alt="Apple Calendar" />
        Apple Calendar
      </a>
    {/if}
  </ul>
</details>

<style lang="scss">
  .AddToCalender {
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
</style>
