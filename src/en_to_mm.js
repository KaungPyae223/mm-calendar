import { en_to_jdn } from "./en_to_jdn";
import { j2m } from "./j2m";
import { num_eng_to_mm } from "./num_eng_to_mm";
import mm_month from "./mm_month";
import moon_phases from "./moon_phases";

/**
 * Converts a Date object to a Myanmar date.
 *
 * @param {Date} date The Date object to convert.
 * @param {string} lang The language to use for the Myanmar date (default is "mm") ("mm", "en").
 * @returns {string} The Myanmar date as a string.
 *
 * @example
 * // Convert a Date object to a Myanmar date
 * const date = new Date();
 * const myanmarDate = en_to_mm(date);
 * console.log(myanmarDate);
 * // → "၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂ "
 *
 */
export const en_to_mm = (date, lang = "mm") => {
  const jdn = en_to_jdn(date);
  const mm = j2m(jdn);

  let month = mm_month.find((m) => m.id === mm.mm)[lang];

  if (mm.myt > 0 && mm.mm === 5) {
    month = month.split("/")[0];
  } else if (mm.myt == 0 && mm.mm === 5) {
    month = month.split("/")[1];
  }

  const year = lang === "mm" ? num_eng_to_mm(mm.my.toString()) : mm.my;

  const day = lang === "mm" ? num_eng_to_mm(mm.fd.toString()) : mm.fd;

  const moon_phase = moon_phases.find((m) => m.id === mm.mp)[lang];

  return `${year} ${
    lang === "mm" ? "ခုနှစ်" : "Year"
  } ${month} ${moon_phase} ${day} `;
};
