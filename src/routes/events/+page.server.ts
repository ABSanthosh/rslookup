import { DATA_SOURCE_BASE, DATA_SOURCE_CLUB_EVENTS } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { convertTSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IEvents } from '$types/Events.types';

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
