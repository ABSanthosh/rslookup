import {
  DATA_SOURCE_AMENITY_HOSTEL,
  DATA_SOURCE_BASE,
  DATA_SOURCE_AMENITY_ACAD,
  DATA_SOURCE_AMENITY_ADMIN,
  DATA_SOURCE_AMENITY_ESSENTIAL,
  DATA_SOURCE_AMENITY_FOOD,
  DATA_SOURCE_AMENITY_SPORT
} from '$env/static/private';
import type { IAcademics, IAdmin, IEssentials, IFood, IHostel, ISport } from '$types/Amenity.types';
import { cacheConfig } from '$utils/CacheControl';
import { convertCSVtoJSON } from '$utils/toJson';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv'
    }
  };

  const [Academics, Admin, Essentials, Food, Hostel, Sports] = await Promise.all([
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ACAD}`, options),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ADMIN}`, options),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_ESSENTIAL}`, options),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_FOOD}`, options),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_HOSTEL}`, options),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_AMENITY_SPORT}`, options)
  ]);

  const [AcademicsData, AdminData, EssentialsData, FoodData, HostelData, SportsData] =
    await Promise.all([
      Academics.ok ? (convertCSVtoJSON(await Academics.text()) as unknown as IAcademics[]) : [],
      Admin.ok ? (convertCSVtoJSON(await Admin.text()) as unknown as IAdmin[]) : [],
      Essentials.ok ? (convertCSVtoJSON(await Essentials.text()) as unknown as IEssentials[]) : [],
      Food.ok ? (convertCSVtoJSON(await Food.text()) as unknown as IFood[]) : [],
      Hostel.ok ? (convertCSVtoJSON(await Hostel.text()) as unknown as IHostel[]) : [],
      Sports.ok ? (convertCSVtoJSON(await Sports.text()) as unknown as ISport[]) : []
    ]);

  return {
    Hostel: HostelData,
    Academics: AcademicsData,
    Admin: AdminData,
    Essentials: EssentialsData,
    Food: FoodData,
    Sports: SportsData
  };
};
