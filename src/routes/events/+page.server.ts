import { DATA_SOURCE_BASE, DATA_SOURCE_CLUB_EVENTS } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { convertCSVtoJSON } from '$utils/toJson';
import type { IEvents } from '$types/Events.types';
import { parseDate } from '$utils/calendarEvent';
import { cacheConfig } from '$utils/CacheControl';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_EVENTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv'
    }
  });
  const csv = convertCSVtoJSON(await data.text()) as unknown as IEvents[];
  const validatedEvents = csv
    .map((event) => {
      const formatLine = (line: string) => line.replaceAll(/[\r\n]+/g, ' ').trim();
      return {
        ...event,
        name: formatLine(event.name),
        club: formatLine(event.club),
        category: formatLine(event.category),
        venueName: formatLine(event.venueName),
        description: event.description.trim(),
        date: new Date(event.date) ? event.date : 'TBA'
      };
    })
    .sort((a, b) => {
      if (a.date === 'TBA') return -1;
      if (b.date === 'TBA') return 1;

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return (
        new Date(dateB.year, dateB.month, dateB.date).getTime() -
        new Date(dateA.year, dateA.month, dateA.date).getTime()
      );
    });

  const expiredEvents = validatedEvents.filter((event) => {
    const date = parseDate(event.date);
    const today = new Date();
    const eventDate = new Date(date.year, date.month, date.date);
    return eventDate.getTime() < today.getTime();
  });
  const upcomingEvents = validatedEvents.filter((event) => {
    const date = parseDate(event.date);
    const today = new Date();
    const eventDate = new Date(date.year, date.month, date.date);
    return eventDate.getTime() >= today.getTime();
  });

  return {
    upcomingEvents,
    expiredEvents
  };
};
