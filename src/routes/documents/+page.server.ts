import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_DOCUMENTS,
} from "$env/static/public";
import type { IDocument } from "$types/Documents.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const data = await fetch(
    `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_DOCUMENTS}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/tab-separated-values",
      },
    }
  );
  const csv = convertTSVtoJSON(await data.text()) as unknown as IDocument[];
  const formattedData: { [key: string]: IDocument[] } = {};

  csv.forEach((item) => {
    if (!formattedData[item.category]) {
      formattedData[item.category] = [];
    }
    formattedData[item.category].push(item);
  });
  console.log("formattedData", formattedData);

  return {
    documents: formattedData,
  };
};
