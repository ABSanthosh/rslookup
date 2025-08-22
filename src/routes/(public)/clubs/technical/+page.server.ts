import {
  DATA_SOURCE_BASE,
  DATA_SOURCE_CLUB_TECHNICAL,
  DATA_SOURCE_CLUB_TECHNICAL_CORE
} from '$env/static/private';

import getImageSrc from '$utils/getImageSrc';
import type { PageServerLoad } from './$types';
import { convertCSVtoJSON } from '$utils/toJson';
import { cacheConfig } from '$utils/CacheControl';
import type { IClub, IClubCore } from '$types/sheet-data/Club.types';

async function fetchAndParse<T>(url: string, fetch: typeof globalThis.fetch): Promise<T[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    return convertCSVtoJSON(await res.text()) as unknown as T[];
  } catch (e) {
    if (import.meta.env.DEV) console.error(`Failed to fetch ${url}`, e);
    return [];
  }
}

function mapClubData(clubs: IClub[], coreData: IClubCore[]) {
  return clubs.map((club) => ({
    name: club.club,
    image: getImageSrc(club.image),
    description: club.description,
    email: club.email,
    roles: coreData
      .filter((core) => core.club === club.club)
      .map((core) => ({
        position: core.position,
        name: core.name
      }))
  }));
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const [technicalClubs, technicalClubCore] = await Promise.all([
    fetchAndParse<IClub>(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_TECHNICAL}`, fetch),
    fetchAndParse<IClubCore>(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_TECHNICAL_CORE}`, fetch)
  ]);

  return {
    technical: mapClubData(technicalClubs, technicalClubCore)
  };
};
