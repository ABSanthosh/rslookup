import {
  DATA_SOURCE_BASE,
  DATA_SOURCE_ACAD_OFFICE,
  DATA_SOURCE_ACAD_ADVISORS,
  DATA_SOURCE_ACAD_COMMITTEE,
} from "$env/static/private";
import type {
  IAcadAdvisors,
  IAcadCommittee,
  IAcadOffice,
} from "$types/Acad.types";
import { cacheConfig } from "$utils/CacheControl";
import { convertTSVtoJSON } from "$utils/toJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig);

  const [office, advisors, committee] = await Promise.all([
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_OFFICE}`),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_ADVISORS}`),
    fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_ACAD_COMMITTEE}`),
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

  console.log(officeData)

  return {
    office: officeData,
    advisors: advisorsData,
    committee: committeeData,
  };
};
