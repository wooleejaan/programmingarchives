/* eslint-disable @typescript-eslint/no-unused-vars */

/* 아래 코드는 예시일 뿐입니다. */

import { APIResponse, fetchData } from "./api-externs";

/**
 * @typedef {{
 *   longPropertyName: string,
 *   anotherLongName: number
 * }}
 */
let ProcessedData;

/**
 * @param {APIResponse} data
 * @return {ProcessedData}
 */
function processData(data) {
  return {
    longPropertyName: data.foo,
    anotherLongName: data.bar,
  };
}

const apiData = fetchData();
const processedData = processData(apiData);
console.log(processedData.longPropertyName, processedData.anotherLongName);
