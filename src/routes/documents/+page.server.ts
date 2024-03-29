import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_DOCUMENTS,
} from "$env/static/public";
import type { IDocuments } from "$types/Documents.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const data = await fetch(
    `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_DOCUMENTS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/tab-separated-values",
      },
    }
  );
  const csv = await data.text();
  return {
    documents: convertTSVtoJSON(csv) as unknown as IDocuments[],
  };
};
