import { en_to_jdn } from "./en_to_jdn";
import { j2m } from "./j2m";
import { jdn_to_gregorian } from "./jdn_to_gregorian";

/**
 * Gets the Sabbath dates for a given month and year.
 *
 * @param {Date} date The date to get the Sabbath dates for.
 * @param {string} type The type of Sabbath to get (default is "default") ("default", "pre", "pre_moon") If you use pre only show the pre Sabbath and if you use pre_moon show both pre Sabbath and pre moon Sabbath.
 * @returns {Array} An array of objects containing the Sabbath dates and their types.
 *
 * @example
 * // Get the Sabbath dates for the current month
 * const sabbathDates = get_sabbath(new Date());
 * console.log(sabbathDates);
 * // → [{ date: Date object, type: "Sabbath" }, { date: Date object, type: "full moon" }, ...]
 *
 */
export const get_sabbath = (date, type = "default") => {

  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }

  const month = date.getMonth();
  const year = date.getFullYear();

  const { start, end } = getMonthBounds(year, month);

  const startJulian = en_to_jdn(start);

  const endJulian = en_to_jdn(end);

  let Sabbath = [];

  for (let jdn = startJulian; jdn <= endJulian; jdn++) {
    const mm = j2m(jdn);

    if (mm.mm >= 4 && mm.mm <= 8) {
      if (mm.fd === 8) {
        if ((type === "pre" || type === "pre_moon") && jdn !== startJulian) {
          addSabbath(Sabbath, jdn - 1, "pre Sabbath");
        }

        addSabbath(Sabbath, jdn, "Sabbath");
      }

      if (mm.mp === 1 || mm.mp === 3) {
        if (type === "pre_moon" && jdn !== startJulian) {
          addSabbath(Sabbath, jdn - 1, "pre Sabbath");
        }

        addSabbath(Sabbath, jdn, mm.mp === 1 ? "full moon" : "new moon");
      }
    }
  }

  return Sabbath;
};

const addSabbath = (list, jdn, type) => {
  list.push({
    date: jdn_to_gregorian(jdn),
    type,
  });
};

function getMonthBounds(year, month) {
  const start = new Date(year, month, 1, 0, 0, 0, 0);

  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return { start, end };
}
