import { DATA_SOURCE_BASE, DATA_SOURCE_DOCUMENTS } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { convertCSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IDocument } from '$types/Documents.types';

function groupByCategory(data: IDocument[]): Record<string, IDocument[]> {
  return data.reduce(
    (acc, doc) => {
      (acc[doc.category] ||= []).push(doc);
      return acc;
    },
    {} as Record<string, IDocument[]>
  );
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  try {
    const res = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_DOCUMENTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/csv'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch documents: ${res.statusText}`);
    }

    const data = convertCSVtoJSON(await res.text()) as unknown as IDocument[];
    const documents = groupByCategory(data);

    return { documents };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('Document load error:', err);
    }
    return { documents: {} }; // fallback
  }
};
