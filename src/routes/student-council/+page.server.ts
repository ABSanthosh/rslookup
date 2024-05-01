import getImageSrc from '$utils/getImageSrc';
import type { PageServerLoad } from './$types';
import { convertTSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { StudentCouncil } from '$types/SC.types';
import { DATA_SOURCE_BASE, DATA_SOURCE_STUDENT_COUNCIL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig);

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
