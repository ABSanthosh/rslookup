import type { PageServerLoad } from './$types';
import { convertTSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { ProfItem } from '$lib/types/Prof.types';
import { DATA_SOURCE_BASE, DATA_SOURCE_PROF } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders(cacheConfig);

	const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_PROF}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/tab-separated-values'
		}
	});
	const csv = await data.text();
	return {
		prof: convertTSVtoJSON(csv) as unknown as ProfItem[]
	};
};
