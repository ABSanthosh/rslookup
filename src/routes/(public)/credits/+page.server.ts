import { DATA_SOURCE_BASE, DATA_SOURCE_META_CREDITS } from '$env/static/private';
import type { IConsolidatedCredit, ICredit } from '$types/sheet-data/Credits.types';
import { cacheConfig } from '$utils/CacheControl';
import { generateDate } from '$utils/calendarEvent';
import getImageSrc from '$utils/getImageSrc';
import { convertCSVtoJSON } from '$utils/toJson';
import type { PageServerLoad } from './$types';

/**
 * Consolidates the given array of credit data into a single object.
 * The credit data is sorted by date in descending order.
 *
 * @param data - The array of credit data to be consolidated.
 * @returns The consolidated credit object.
 */
const consolidator = (data: ICredit[]) => {
  data.sort((a, b) => {
    const dateA = generateDate(a.date, '11.59 PM');
    const dateB = generateDate(b.date, '11.59 PM');
    return dateB.getTime() - dateA.getTime();
  });

  const holderList: IConsolidatedCredit = {
    name: data[0].name,
    email: data[0].email,
    role: data[0].role,
    image: getImageSrc(data[0].image),
    changes: []
  };

  data.forEach((item) => {
    const { email, date, description } = item;
    holderList.changes.push({
      email: email,
      date,
      description
    });
  });

  holderList.changes.sort((a, b) => {
    const dateA = generateDate(a.date, '11.59 PM');
    const dateB = generateDate(b.date, '11.59 PM');
    return dateB.getTime() - dateA.getTime();
  });

  return holderList;
};

/**
 * Loads the credits data from a remote source and processes it.
 * @param fetch - The function used to make the HTTP request.
 * @param setHeaders - The function used to set the response headers.
 * @returns An object containing the processed credits data and batches.
 */
export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders(cacheConfig());

  const data = await fetch(`${DATA_SOURCE_BASE}${DATA_SOURCE_META_CREDITS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv'
    }
  });

  const csv = convertCSVtoJSON(await data.text()) as unknown as ICredit[];

  const batches: ICredit[][] = [];
  csv.sort((a, b) => {
    const dateA = generateDate(a.date, '11.59 PM');
    const dateB = generateDate(b.date, '11.59 PM');
    return dateB.getTime() - dateA.getTime();
  });

  let temp = [];

  // 1) All data are sorted by date in descending order
  // 2) Batch the data by email and consolidate the data

  for (let i = 0; i < csv.length; i++) {
    // If the current email is the same as the next email, push the data to the temp array
    if (i < csv.length - 1 && i + 1 <= csv.length - 1 && csv[i].email === csv[i + 1].email) {
      temp.push(csv[i]);
    } else {
      // If the current email is different from the next email, push the data to the temp array
      // and push the temp array to the batches array
      temp.push(csv[i]);
      batches.push(temp);
      temp = [];
    }
  }

  const batchedData = batches.map(consolidator);

  return {
    maintainers: batchedData.filter((item) => item.role !== 'Contributor'),
    contributors: batchedData.filter((item) => item.role === 'Contributor')
  };
};
