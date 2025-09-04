/**
 * Converts an English number to a Myanmar number.
 *
 * @param {string} num The English number to convert.
 * @returns {string} The Myanmar number as a string.
 *
 * @example
 * // Convert a number to a Myanmar number
 * const myanmarNumber = num_eng_to_mm("123");
 * console.log(myanmarNumber);
 * // → "၁၂၃"
 *
 */
export const num_eng_to_mm = (num) => {
  const num_mm = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];

  let mm_num = "";

  for (let i = 0; i < num.length; i++) {
    mm_num += num_mm[num[i]];
  }

  return mm_num;
};
