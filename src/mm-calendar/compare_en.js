import { en_to_jdn } from "./en_to_jdn";

export const compare_en = (date1, date2, type) => {
  const d1 = {
    day: date1.getDate(),
    month: date1.getMonth() + 1,
    year: date1.getFullYear(),
  };
  const d2 = {
    day: date2.getDate(),
    month: date2.getMonth() + 1,
    year: date2.getFullYear(),
  };

  switch (type) {
    case "days": {
      return en_to_jdn(date2) - en_to_jdn(date1);
    }

    case "months": {
      const yearMonthDiff = (d2.year - d1.year) * 12 + (d2.month - d1.month);
      const dayFraction = (d2.day - d1.day) / 30; // approx.
      return yearMonthDiff + dayFraction;
    }

    case "years": {
      const yearDiff = d2.year - d1.year;
      const monthFraction = (d2.month - d1.month + (d2.day - d1.day) / 30) / 12;
      return yearDiff + monthFraction;
    }

    default:
      throw new Error("Invalid comparison type");
  }
};
