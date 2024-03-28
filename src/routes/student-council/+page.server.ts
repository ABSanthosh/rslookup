import {
  PUBLIC_DATA_SOURCE_BASE,
  PUBLIC_DATA_SOURCE_STUDENT_COUNCIL,
} from "$env/static/public";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

interface StudentCouncil {
  ID: string;
  name: string;
  position: string;
  email: string;
  img: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
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
  const imageBase = "https://drive.google.com/thumbnail?id={ID}&sz=w3840-h1998";

  return {
    studentCouncil: csv.map((item) => {
      const match = item.img.match(/\/d\/([^/]+)\//);
      const imgId = match ? match[1] : "";

      return {
        ...item,
        img: imageBase.replace("{ID}", imgId),
      };
    }),
  };
};
