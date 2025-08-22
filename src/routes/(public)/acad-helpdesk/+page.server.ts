import {
  DATA_SOURCE_BASE,
  DATA_SOURCE_ACAD_OFFICE,
  DATA_SOURCE_ACAD_ADVISORS,
  DATA_SOURCE_ACAD_COMMITTEE
} from '$env/static/private';

import type { PageServerLoad } from './$types';
import { convertCSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IAcadAdvisors, IAcadCommittee, IAcadOffice } from '$types/sheet-data/Acad.types';

async function fetchAndParse<T>(url: string, fetch: typeof globalThis.fetch): Promise<T[]> {
  const res = await fetch(url);
  if (!res.ok) return [];
  const text = await res.text();
  return convertCSVtoJSON(text) as unknown as T[];
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const [office, advisors, committee] = await Promise.all([
    fetchAndParse<IAcadOffice>(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_OFFICE}`, fetch),
    fetchAndParse<IAcadAdvisors>(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_ADVISORS}`, fetch),
    fetchAndParse<IAcadCommittee>(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_COMMITTEE}`, fetch)
  ]);

  return { office, advisors, committee };
};
