import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_CLUB_CULTURAL,
  PUBLIC_DATA_SOURCE_CLUB_CULTURAL_CORE,
} from "$env/static/public";
import type { IClub, IClubCore } from "$types/Club.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import getImageSrc from "$utils/getImageSrc";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const [clubs, clubCore] = await Promise.all([
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_CLUB_CULTURAL}`),
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_CLUB_CULTURAL_CORE}`),
  ]);

  const [clubsData, clubCoreData] = await Promise.all([
    clubs.ok
      ? (convertTSVtoJSON(await clubs.text()) as unknown as IClub[])
      : [],
    clubCore.ok
      ? (convertTSVtoJSON(await clubCore.text()) as unknown as IClubCore[])
      : [],
  ]);

  return {
    clubs: clubsData.map((club) => ({
      name: club.club,
      image: getImageSrc(club.image),
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
