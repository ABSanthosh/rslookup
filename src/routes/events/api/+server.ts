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
	const bytes = new Uint8Array(await ics.arrayBuffer());
	return new Response(bytes, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `attachment; filename="${eventData.title.replace(/ /g, '_')}.ics"`
		}
	});
};
