import { jdn_to_gregorian } from "./jdn_to_gregorian";

/**
 * Calculates the Thingyan time for a given Myanmar year.
 *
 * @param {number} my The Myanmar year to calculate the Thingyan time.
 * @returns {Object} An object containing the Thingyan time in Date objects.
 *
 * @example
 * // Calculate the Thingyan time for Myanmar year 1387
 * const thingyanTime = thingyan_time(1387);
 * console.log(thingyanTime);
 * // ja: Date object representing the Thingyan Kya (သင်္ကြန်ကြတ်နေ့)
 * // jk: Date object representing the Thingyan Kyo (သင်္ကြန်အကြိုနေ့)
 * // da: Date object representing the Thingyan Tat (သင်္ကြန်အတက်နေ့)
 * // dk: Date object representing the Thingyan Kya (သင်္ကြန်အကျနေ့)
 *
 */

export const thingyan_time = (my) => {
  const SY = 1577917828 / 4320000;
  const MO = 1954168.050623;
  const SE3 = 1312;
  const ja = SY * my + MO;
  const jk = my >= SE3 ? ja - 2.169918982 : ja - 2.1675;
  const da = Math.round(ja);
  const dk = Math.round(jk);
  return {
    ja: jdn_to_gregorian(ja),
    jk: jdn_to_gregorian(jk),
    da: jdn_to_gregorian(da),
    dk: jdn_to_gregorian(dk),
  };
};
