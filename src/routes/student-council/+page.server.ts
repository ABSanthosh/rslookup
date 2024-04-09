import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_STUDENT_COUNCIL,
} from "$env/static/public";
import { convertTSVtoJSON } from "$utils/ToJson";
import getImageSrc from "$utils/getImageSrc";
import type { PageServerLoad } from "./$types";

interface StudentCouncil {
  ID: string;
  name: string;
  position: string;
  email: string;
  img: string;
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control":
      "public, must-revalidate, max-age=86400, stale-while-revalidate=86400",
  });

  const data = await fetch(
    `${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_STUDENT_COUNCIL}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/tab-separated-values",
      },
    }
  );
  const csv = convertTSVtoJSON(
    await data.text()
  ) as unknown as StudentCouncil[];
  return {
    studentCouncil: csv.map((item) => ({
      ...item,
      img: getImageSrc(item.img),
    })),
  };
};
