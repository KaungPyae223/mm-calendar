/**
 * Converts a Julian Day Number (JDN) to a Gregorian Date object.
 *
 * @param {number} jdn The Julian Day Number to convert.
 * @returns {Date} A JavaScript Date object representing the Gregorian date.
 *
 * @example
 * // Convert JDN 2460892 (September 1, 2025)
 * const date = jdn_to_gregorian(2460892);
 * console.log(date.toDateString());
 * // → "Mon Sep 01 2025"
 *
 */

export const jdn_to_gregorian = (jdn) => {

  if (typeof jdn !== "number") {
    throw new Error("Invalid Julian Day Number");
  }

  let l = jdn + 68569;
  const n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l) / 2447);
  const day = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  const month = j + 2 - 12 * l;
  const year = 100 * (n - 49) + i + l;

  const date = new Date(year, month - 1, day);

  return date;
};
