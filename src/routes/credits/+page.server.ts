import { DATA_SOURCE_BASE, DATA_SOURCE_META_CREDITS } from '$env/static/private';
import type { IConsolidatedCredit, ICredit } from '$types/Credits.types';
import { cacheConfig } from '$utils/CacheControl';
import { generateDate } from '$utils/calendarEvent';
import { convertCSVtoJSON } from '$utils/toJson';
import type { PageServerLoad } from './$types';

const consolidator = (data: ICredit[]) => {
  data.sort((a, b) => {
    const dateA = generateDate(a.date, '11.59 PM');
    const dateB = generateDate(b.date, '11.59 PM');
    return dateB.getTime() - dateA.getTime();
  });

  let holderList: IConsolidatedCredit = {
    name: data[0].name,
    email: data[0].email,
    role: data[0].role,
    image: data[0].image,
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

  return holderList;
};

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

  for (let i = 0; i < csv.length; i++) {
    if (i < csv.length - 1 && i + 1 <= csv.length - 1 && csv[i].email === csv[i + 1].email) {
      temp.push(csv[i]);
    } else {
      temp.push(csv[i]);
      batches.push(temp);
      temp = [];
    }
  }

  return {
    credits: batches.map(consolidator),
    batches
  };
};
