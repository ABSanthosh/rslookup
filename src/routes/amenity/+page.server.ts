import {
  DATA_SOURCE_BASE,
  DATA_SOURCE_AMENITY_ACAD,
  DATA_SOURCE_AMENITY_FOOD,
  DATA_SOURCE_AMENITY_SPORT,
  DATA_SOURCE_AMENITY_ADMIN,
  DATA_SOURCE_AMENITY_HOSTEL,
  DATA_SOURCE_AMENITY_ESSENTIAL
} from '$env/static/private';
import type { PageServerLoad } from './$types';
import { cacheConfig } from '$utils/CacheControl';
import { convertCSVtoJSON } from '$utils/toJson';
import type { IAcademics, IAdmin, IEssentials, IFood, IHostel, ISport } from '$types/Amenity.types';

async function fetchAndParse<T>(url: string, fetch: typeof globalThis.fetch): Promise<T[]> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'text/csv' }
    });
    if (!res.ok) return [];
    const text = await res.text();
    return convertCSVtoJSON(text) as unknown as T[];
  } catch (e) {
    if (import.meta.env.DEV) console.error(`Failed to fetch ${url}`, e);
    return [];
  }
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const [Academics, Admin, Essentials, Food, Hostel, Sports] = await Promise.all([
    fetchAndParse<IAcademics>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ACAD}`, fetch),
    fetchAndParse<IAdmin>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ADMIN}`, fetch),
    fetchAndParse<IEssentials>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ESSENTIAL}`, fetch),
    fetchAndParse<IFood>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_FOOD}`, fetch),
    fetchAndParse<IHostel>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_HOSTEL}`, fetch),
    fetchAndParse<ISport>(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_SPORT}`, fetch)
  ]);

  return {
    Hostel,
    Academics,
    Admin,
    Essentials,
    Food,
    Sports
  };
};
