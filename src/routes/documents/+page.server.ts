import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_DOCUMENTS,
} from "$env/static/public";
import type { IDocuments } from "$types/Documents.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const data = await fetch(
      `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_DOCUMENTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/tab-separated-values",
        },
      }
    );
    const csv = convertTSVtoJSON(await data.text()) as unknown as IDocuments[];
    // return a json of type
    /**
     * {
     *  documents: IDocuments[] where item.category !== 'Minutes of the Meeting'
     *  mom: IDocuments // where item.category === 'Minutes of the Meeting'
     * }
     */
    return {
      documents: csv.filter(
        (item) =>
          item.category !== "Minutes of the Meeting" &&
          item.category !== "Newsletter"
      ) as IDocuments[],
      mom: csv.filter(
        (item) => item.category === "Minutes of the Meeting"
      ) as unknown as IDocuments[],
      newsletter: csv.filter(
        (item) => item.category === "Newsletter"
      ) as unknown as IDocuments[],
    };
  } catch (e) {
    console.error("err", e);
    return {
      documents: [],
      mom: [],
      newsletter: [],
    };
  }
};
