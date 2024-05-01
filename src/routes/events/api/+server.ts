import { generateIcs, type IEvent } from '$utils/calendarEvent';
import type { RequestHandler } from './$types';

// @ts-ignore
export const POST: RequestHandler = async ({ request }) => {
	const eventData = (await request.json()) as IEvent;
	const ics = generateIcs({
		...eventData,
		start: new Date(eventData.start),
		end: new Date(eventData.end)
	});
	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8'
		}
	});
};

// @ts-ignore
export const GET: RequestHandler = async ({ url }) => {
	const eventData = {
		title: url.searchParams.get('title') ?? 'Event',
		description: url.searchParams.get('description') ?? '',
		location: url.searchParams.get('location') ?? '',
		start: new Date(url.searchParams.get('start') ?? Date.now()),
		end: new Date(url.searchParams.get('end') ?? Date.now())
	};
	const ics = generateIcs(eventData);
	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8'
		}
	});
};
