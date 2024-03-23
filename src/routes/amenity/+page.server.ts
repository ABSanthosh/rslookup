import {
  PUBLIC_DATA_SOURCE_AMENITY_HOSTEL,
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_AMENITY_ACAD,
  PUBLIC_DATA_SOURCE_AMENITY_ADMIN,
  PUBLIC_DATA_SOURCE_AMENITY_ESSENTIAL,
  PUBLIC_DATA_SOURCE_AMENITY_FOOD,
  PUBLIC_DATA_SOURCE_AMENITY_SPORT,
} from "$env/static/public";
import type {
  IAcademics,
  IAdmin,
  IEssentials,
  IFood,
  IHostel,
  ISport,
} from "$types/Amenity.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "text/tab-separated-values",
    },
  };

  const [Academics, Admin, Essentials, Food, Hostel, Sports] =
    await Promise.all([
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_ACAD}`,
        options
      ),
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_ADMIN}`,
        options
      ),
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_ESSENTIAL}`,
        options
      ),
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_FOOD}`,
        options
      ),
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_HOSTEL}`,
        options
      ),
      fetch(
        `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_AMENITY_SPORT}`,
        options
      ),
    ]);

  const [
    AcademicsData,
    AdminData,
    EssentialsData,
    FoodData,
    HostelData,
    SportsData,
  ] = await Promise.all([
    Academics.ok
      ? (convertTSVtoJSON(await Academics.text()) as unknown as IAcademics[])
      : [],
    Admin.ok
      ? (convertTSVtoJSON(await Admin.text()) as unknown as IAdmin[])
      : [],
    Essentials.ok
      ? (convertTSVtoJSON(await Essentials.text()) as unknown as IEssentials[])
      : [],
    Food.ok ? (convertTSVtoJSON(await Food.text()) as unknown as IFood[]) : [],
    Hostel.ok
      ? (convertTSVtoJSON(await Hostel.text()) as unknown as IHostel[])
      : [],
    Sports.ok
      ? (convertTSVtoJSON(await Sports.text()) as unknown as ISport[])
      : [],
  ]);

  return {
    Academics: AcademicsData,
    Admin: AdminData,
    Essentials: EssentialsData,
    Food: FoodData,
    Hostel: HostelData,
    Sports: SportsData,
  };
};
