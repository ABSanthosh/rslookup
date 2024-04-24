import { DATA_SOURCE_BASE, DATA_SOURCE_STUDENT_COUNCIL } from '$env/static/private';
import type { StudentCouncil } from '$types/SC.types';
import getImageSrc from '$utils/getImageSrc';
import { convertTSVtoJSON } from '$utils/toJson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, must-revalidate, max-age=86400, stale-while-revalidate=86400'
	});

	const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_STUDENT_COUNCIL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/tab-separated-values'
		}
	});
	const csv = convertTSVtoJSON(await data.text()) as unknown as StudentCouncil[];
	return {
		studentCouncil: csv.map((item) => ({
			...item,
			img: getImageSrc(item.img)
		}))
	};
};
