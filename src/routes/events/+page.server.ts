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

  return {
    events: csv.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return (
        new Date(dateB.year, dateB.month, dateB.date).getTime() -
        new Date(dateA.year, dateA.month, dateA.date).getTime()
      );
    })
  };
};
