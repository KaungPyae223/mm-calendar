/**
 * Converts a Myanmar number to an English number.
 *
 * @param {string} num The Myanmar number to convert.
 * @returns {string} The English number as a string.
 *
 * @example
 * // Convert a Myanmar number to a number
 * const number = num_mm_to_eng("၁၂၃");
 * console.log(number);
 * // → "123"
 *
 */
export const num_mm_to_eng = (num) => {
    
    const num_mm = ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];

    let eng_num = "";

    for (let i = 0; i < num.length; i++) {
        eng_num += num_mm.indexOf(num[i]);
    }

    return eng_num;
}