import { DATA_SOURCE_BASE, DATA_SOURCE_DOCUMENTS } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { convertTSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IDocument } from '$types/Documents.types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig);

  const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_DOCUMENTS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/tab-separated-values'
    }
  });
  const csv = convertTSVtoJSON(await data.text()) as unknown as IDocument[];
  const formattedData: { [key: string]: IDocument[] } = {};

  // Take all the documents and group them by category
  csv.forEach((item) => {
    if (!formattedData[item.category]) {
      formattedData[item.category] = [];
    }
    formattedData[item.category].push(item);
  });

  return {
    documents: formattedData
  };
};
