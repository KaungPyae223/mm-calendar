import { en_to_jdn } from "./en_to_jdn";

const calculateLeapYear = (year) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

const calculateMonthLength = (year, month) => {
  if (month === 2) {
    return calculateLeapYear(year) ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    return 30;
  } else {
    return 31;
  }
};

export const compare_en = (date1, date2, type) => {
  const d1 = {
    day: date1.getDate(),
    month: date1.getMonth() + 1,
    year: date1.getFullYear(),
    monthLength: calculateMonthLength(
      date1.getFullYear(),
      date1.getMonth() + 1
    ),
  };
  const d2 = {
    day: date2.getDate(),
    month: date2.getMonth() + 1,
    year: date2.getFullYear(),
    monthLength: calculateMonthLength(
      date2.getFullYear(),
      date2.getMonth() + 1
    ),
  };

  switch (type) {
    case "days": {
      return en_to_jdn(date2) - en_to_jdn(date1);
    }

    case "months": {
      const yearMonthDiff = (d2.year - d1.year) * 12 + (d2.month - d1.month);

      const tempDay1 = d1.day > d2.monthLength ? d2.monthLength : d1.day;

      const dayFraction = (d2.day - tempDay1) / 30.4; // approx.
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
