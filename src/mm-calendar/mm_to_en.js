import { jdn_to_gregorian } from "./jdn_to_gregorian";
import { mm_to_jln } from "./mm_to_jln";

/**
 * Converts a Myanmar date to a Date object.
 *
 * @param {string} mm_date The Myanmar date to convert ("၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂") Can put both Myanmar and English but need to be formatted.
 * @returns {Date} The Date object.
 *
 * @example
 * // Convert a Myanmar date to a Date object
 * const date = mm_to_en("၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂");
 * console.log(date);
 * // → 2025-09-03T00:00:00.000Z
 *
 */
export const mm_to_en = (mm_date) => {

  if (typeof mm_date !== "string") {
    throw new Error("Invalid Myanmar date");
  }

  const julianDay = mm_to_jln(mm_date);

  const gregorianDate = jdn_to_gregorian(julianDay);

  return gregorianDate;
};
