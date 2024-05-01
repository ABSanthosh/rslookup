import Papa from 'papaparse';

/**
 * Converts CSV (Comma-Separated Values) data to JSON format.
 * @param csvData - The CSV data to be converted.
 * @returns An array of JSON objects representing the converted data.
 */
export function convertCSVtoJSON(csvData: string) {
  return Papa.parse(csvData, {
    header: true,
    // newline: '\n'
  }).data;
}

/**
 * Converts TSV (Tab-Separated Values) data to JSON format.
 * @param csvData - The TSV data to be converted.
 * @returns An array of JSON objects representing the converted data.
 */
export function convertTSVtoJSON(tsvData: string) {
  const formattedData = tsvData
    .split(/\r\n|\r|\n/g)
    .filter((e) => !!e)
    .map((parsedEntry) => parsedEntry.split('\t'));
  const tsvHeaders = formattedData.shift();

  return formattedData.map((formattedEntry) => {
    {
      return tsvHeaders?.reduce((jsonObject: { [key: string]: string }, heading, position) => {
        jsonObject[heading] = formattedEntry[position];
        return jsonObject;
      }, {});
    }
  });
}
