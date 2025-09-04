import { num_eng_to_mm } from "./num_eng_to_mm";
/**
 * Translates a Date object to a Myanmar Language.
 *
 * @param {Date} date The Date object to translate.
 * @returns {string} The Myanmar date as a string.
 *
 * @example
 * // Translate a Date object to a Myanmar Language
 * const date = new Date();
 * const myanmarDate = tran_mm(date);
 * console.log(myanmarDate);
 * // → "၂၀၂၅ ခုနှစ် စက်တင်ဘာ ၃ ရက် (၃/၈/၂၀၂၅)"
 *
 */
const months = [
  "ဇန်နဝါရီ",
  "ဖေဖော်ဝါရီ",
  "မတ်",
  "ဧပြီ",
  "မေ",
  "ဇွန်",
  "ဇူလိုင်",
  "ဩဂုတ်",
  "စက်တင်ဘာ",
  "အောက်တိုဘာ",
  "နိုဝင်ဘာ",
  "ဒီဇင်ဘာ",
];

export const tran_mm = (date) => {

  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }

  const Day = date.getDate();
  const Month = date.getMonth();
  const Year = date.getFullYear();

  const mmDay = num_eng_to_mm(Day.toString());
  const mmYear = num_eng_to_mm(Year.toString());
  const mmMonth = num_eng_to_mm(Month.toString());

  return `${mmYear} ခုနှစ် ${months[Month]} ${mmDay} ရက် (${mmDay}/${mmMonth}/${mmYear})`;
};
