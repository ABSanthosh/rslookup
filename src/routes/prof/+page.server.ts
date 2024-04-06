import type { PageServerLoad } from "./$types";
import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_PROF,
} from "$env/static/public";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { ProfItem } from "$types/Prof.types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const data = await fetch(
    `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_PROF}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/tab-separated-values",
      },
    }
  );
  const csv = await data.text();
  return {
    prof: convertTSVtoJSON(csv) as unknown as ProfItem[],
  };
};
