import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import {
  DATA_SOURCE_BASE,
  DATA_SOURCE_CLUB_CULTURAL,
  DATA_SOURCE_CLUB_CULTURAL_CORE,
  DATA_SOURCE_CLUB_TECHNICAL,
  DATA_SOURCE_CLUB_TECHNICAL_CORE
} from '$env/static/private';
import type { IClub, IClubCore } from '$types/Club.types';
import { convertCSVtoJSON } from '$utils/toJson';
import getImageSrc from '$utils/getImageSrc';
import { cacheConfig } from '$utils/CacheControl';

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
  if (url.pathname === '/clubs') {
    redirect(308, '/clubs/cultural');
  }
  setHeaders(cacheConfig());

  const [culturalClubs, culturalClubCore, technicalClubs, technicalClubCore] = await Promise.all([
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_CULTURAL}`),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_CULTURAL_CORE}`),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_TECHNICAL}`),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_CLUB_TECHNICAL_CORE}`)
  ]);

  const [culturalClubsData, culturalClubCoreData, technicalClubsData, technicalClubCoreData] =
    await Promise.all([
      culturalClubs.ok ? (convertCSVtoJSON(await culturalClubs.text()) as unknown as IClub[]) : [],
      culturalClubCore.ok
        ? (convertCSVtoJSON(await culturalClubCore.text()) as unknown as IClubCore[])
        : [],
      technicalClubs.ok
        ? (convertCSVtoJSON(await technicalClubs.text()) as unknown as IClub[])
        : [],
      technicalClubCore.ok
        ? (convertCSVtoJSON(await technicalClubCore.text()) as unknown as IClubCore[])
        : []
    ]);

  return {
    cultural: culturalClubsData.map((club) => ({
      name: club.club,
      image: getImageSrc(club.image),
      description: club.description,
      email: club.email,
      roles: culturalClubCoreData
        .filter((core) => core.club === club.club)
        .map((core) => ({
          position: core.position,
          name: core.name
        }))
    })),
    technical: technicalClubsData.map((club) => ({
      name: club.club,
      image: getImageSrc(club.image),
      description: club.description,
      email: club.email,
      roles: technicalClubCoreData
        .filter((core) => core.club === club.club)
        .map((core) => ({
          position: core.position,
          name: core.name
        }))
    }))
  };
};
