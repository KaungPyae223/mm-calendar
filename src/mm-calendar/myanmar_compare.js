import { compare_mm } from "./compare_mm";
/**
 * Compares two Myanmar dates.
 *
 * @param {Date} date1 The first date to compare (Date Object).
 * @param {Date} date2 The second date to compare (Date Object).
 * @param {string} type The type of comparison to perform (default is "days") ("days", "months", "years").
 * @param {string} monthType The type of comparison to perform (default is "days") ("days", "months").
 * @returns {number} The result of the comparison.
 *
 * @example
 * // Compare two Myanmar dates
 * const date1 = new Date();
 * const date2 = new Date();
 * const result = myanmar_compare(date1, date2);
 * console.log(result);
 * // → 2460892
 *
 */
export const myanmar_compare = (date1, date2, type = "days", monthType = "days") => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Both dates must be Date objects");
  }

  if (date1 instanceof Date && date2 instanceof Date) {
    if (date1 > date2) {
      return -1 * compare_mm(date2, date1, type, monthType);
    } else {
      return compare_mm(date1, date2, type, monthType);
    }
  } else {
    throw new Error("Both dates must be Date objects");
  }
};
