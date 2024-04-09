import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_ACAD_OFFICE,
  PUBLIC_DATA_SOURCE_ACAD_ADVISORS,
  PUBLIC_DATA_SOURCE_ACAD_COMMITTEE,
} from "$env/static/public";
import type {
  IAcadAdvisors,
  IAcadCommittee,
  IAcadOffice,
} from "$types/Acad.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const [office, advisors, committee] = await Promise.all([
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_ACAD_OFFICE}`),
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_ACAD_ADVISORS}`),
    fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_ACAD_COMMITTEE}`),
  ]);

  const [officeData, advisorsData, committeeData] = await Promise.all([
    office.ok
      ? (convertTSVtoJSON(await office.text()) as unknown as IAcadOffice[])
      : [],
    advisors.ok
      ? (convertTSVtoJSON(await advisors.text()) as unknown as IAcadAdvisors[])
      : [],
    committee.ok
      ? (convertTSVtoJSON(
          await committee.text()
        ) as unknown as IAcadCommittee[])
      : [],
  ]);

  return {
    office: officeData,
    advisors: advisorsData,
    committee: committeeData,
  };
};
