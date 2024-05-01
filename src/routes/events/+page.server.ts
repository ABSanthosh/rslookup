import { DATA_SOURCE_BASE, DATA_SOURCE_CLUB_EVENTS } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';
import { convertTSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IEvents } from '$types/Events.types';
import { generateIcs, type IEvent } from '$utils/calendarEvent';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders(cacheConfig);

	const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_EVENTS}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/tab-separated-values'
		}
	});
	const csv = convertTSVtoJSON(await data.text()) as unknown as IEvents[];

	return {
		events: csv
	};
};

export const actions: Actions = {
	ics: async ({ request }) => {
		const data = JSON.parse((await request.formData()).get('event') as string) as IEvent;
		const ics = generateIcs({ ...data, start: new Date(data.start), end: new Date(data.end) });

		return new Response(ics, {
			headers: {
				'Content-Type': 'text/calendar; charset=utf-8',
			}
		});
	}
};
