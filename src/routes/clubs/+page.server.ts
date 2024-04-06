import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_CLUBS,
  PUBLIC_DATA_SOURCE_CLUB_CORE,
} from "$env/static/public";
import type { IClub, IClubCore } from "$types/Club.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const [clubs, clubCore] = await Promise.all([
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_CLUBS}`),
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_CLUB_CORE}`),
  ]);

  const [clubsData, clubCoreData] = await Promise.all([
    clubs.ok
      ? (convertTSVtoJSON(await clubs.text()) as unknown as IClub[])
      : [],
    clubCore.ok
      ? (convertTSVtoJSON(await clubCore.text()) as unknown as IClubCore[])
      : [],
  ]);

  /**
   * make the data to this format
   * {
   *  [
   *     name: club name,
   *     image: club image,
   *     description: club description,
   *     roles: [
   *      {
   *        position: role position,
   *        name: role name
   *      }
   *     ]
   *  ]
   * }
   */

  return {
    clubs: clubsData.map((club) => ({
      name: club.club,
      image: club.image,
      description: club.description,
      email: club.email,
      roles: clubCoreData
        .filter((core) => core.club === club.club)
        .map((core) => ({
          position: core.position,
          name: core.name,
        })),
    })),
  };
};
