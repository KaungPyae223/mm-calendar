import mm_month from "./mm_month";
import moon_phases from "./moon_phases";
import { num_mm_to_eng } from "./num_mm_to_eng";
import { chk_my } from "./chk_my";
import { m2j } from "./m2j";

/**
 * Converts a Myanmar date to a Julian Day Number (JDN).
 *
 * @param {string} mm_date The Myanmar date to convert ("၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂") Can put both Myanmar and English but need to be formatted.
 * @returns {number} The Julian Day Number.
 *
 * @example
 * // Convert a Myanmar date to a Julian Day Number
 * const jdn = mm_to_jln("၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂");
 * console.log(jdn);
 * // → 2460892
 *
 */
export const mm_to_jln = (mm_date) => {

  if (typeof mm_date !== "string") {
    throw new Error("Invalid Myanmar date");
  }

  const lang = isMyanmarText(mm_date) ? "mm" : "en";

  const dateArray = mm_date.split(" ");

  const year = lang === "mm" ? num_mm_to_eng(dateArray[0]) : dateArray[0];

  let month = mm_month.find((m) =>
    m[lang].includes("/")
      ? m[lang].split("/").find((m) => m === dateArray[2])
      : m[lang] === dateArray[2]
  )["id"];

  if (month === 4) {
    month = 0;
  } else if (month >= 5) {
    month -= 1;
  }

  const mmt = get_mmt(year, month);

  const moon_phase = moon_phases.find((m) => m[lang] === dateArray[3])["id"];

  const day = lang === "mm" ? num_mm_to_eng(dateArray[4]) : dateArray[4];

  const julianDay = m2j(
    parseInt(year),
    parseInt(month),
    parseInt(mmt),
    parseInt(moon_phase),
    parseInt(day)
  );

  return julianDay;
};

const isMyanmarText = (text) => {
  const myanmarRegex = /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF\uAB80-\uABBF]/;
  return myanmarRegex.test(text);
};

const get_mmt = (my, mm) => {
  const yo = chk_my(my); // check year

  let mmt = 0;

  if (yo.myt === 2 && mm === 0) {
    mmt = 1;
  }

  return mmt;
};
