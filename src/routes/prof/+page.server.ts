import type { PageServerLoad } from './$types';
import { DATA_SOURCE_BASE, DATA_SOURCE_PROF } from '$env/static/private';
import { convertTSVtoJSON } from '$utils/toJson';
import type { ProfItem } from '$lib/types/Prof.types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// setHeaders({
	// 	'cache-control': 'public, must-revalidate, max-age=86400, stale-while-revalidate=86400'
	// });

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
