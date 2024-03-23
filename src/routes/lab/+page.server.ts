import { PUBLIC_DATA_SOURCE_BASE, PUBLIC_DATA_SOURCE_LAB } from "$env/static/public";
import type { Lab } from "$types/Labs.types";
import { convertTSVtoJSON } from "$utils/ToJson";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const data = await fetch(`${PUBLIC_DATA_SOURCE_BASE}${PUBLIC_DATA_SOURCE_LAB}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/tab-separated-values',
    },
  })
  const csv = await data.text()

  return {
    labs: convertTSVtoJSON(csv) as unknown as Lab[]
  }
}