import { DATA_SOURCE_BASE, DATA_SOURCE_LAB } from '$env/static/private';
import type { Lab } from '$types/Labs.types';
import { convertTSVtoJSON } from '$utils/toJson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// setHeaders({
	// 	'cache-control': 'public, must-revalidate, max-age=86400, stale-while-revalidate=86400'
	// });

	const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_LAB}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/tab-separated-values'
		}
	});
	return {
		labs: convertTSVtoJSON(await data.text()) as unknown as Lab[]
	};
};
