import { en_to_jdn } from "./en_to_jdn";
import { j2m } from "./j2m";
import { chk_watat } from "./chk_watat";

const adjustMonth = (mmObj) => {
  if (mmObj.myt === 0 && mmObj.mm >= 5) {
    return { ...mmObj, mm: mmObj.mm - 1 };
  }
  return { ...mmObj };
};

const getTotalMonthsInYear = (year) => {
  const watat = chk_watat(year);
  return watat.watat === 1 ? 13 : 12;
};

const normalizeDay = (day, maxDay) => Math.min(day, maxDay);

const calculateMonthPortion = (day, monthLength) => day / monthLength;

const compareMonths = (mm1, mm2, type = "days") => {
  const adj1 = adjustMonth(mm1);
  const adj2 = adjustMonth(mm2);

  let monthDiff = 0;

  for (let y = adj1.my + 1; y < adj2.my; y++) {
    monthDiff += getTotalMonthsInYear(y);
  }
  if (adj1.my !== adj2.my) {
    monthDiff += getTotalMonthsInYear(adj1.my) - adj1.mm + adj2.mm;
  } else {
    monthDiff += adj2.mm - adj1.mm;
  }

  switch (type) {
    case "days":
      const day1 = normalizeDay(adj1.md, adj2.mml);
      const day2 = adj2.md;

      monthDiff += Math.floor(((day2 - day1) / 29.5) * 100) / 100;

      break;
    case "months":
      const month1Portion = calculateMonthPortion(adj1.md, adj1.mml);
      const month2Portion = calculateMonthPortion(adj2.md, adj2.mml);

      monthDiff += Math.floor((month2Portion - month1Portion) * 100) / 100;
      break;
    default:
      throw new Error(`Unknown comparison type: ${monthType}`);
  }

  return monthDiff;
};

const compareYear = (mm1, mm2) => {
  const adj1 = { ...mm1, mm: mm1.mm >= 5 ? mm1.mm - 1 : mm1.mm };
  const adj2 = { ...mm2, mm: mm2.mm >= 5 ? mm2.mm - 1 : mm2.mm };

  const day1 = normalizeDay(adj1.md, adj2.mml);
  const day2 = adj2.md;

  const monthDiff =
    adj2.mm - adj1.mm + Math.floor(((day2 - day1) / 29.5) * 100) / 100;

  return adj2.my - adj1.my + monthDiff / 12;
};

export const compare_mm = (date1, date2, type = "days", monthType = "days") => {
  const jdn1 = en_to_jdn(date1);
  const jdn2 = en_to_jdn(date2);

  const mm1 = j2m(jdn1);
  const mm2 = j2m(jdn2);

  switch (type) {
    case "days":
      return jdn2 - jdn1;

    case "months": {
      return compareMonths(mm1, mm2, monthType);
    }

    case "years": {
      return compareYear(mm1, mm2);
    }

    default:
      throw new Error(`Unknown comparison type: ${type}`);
  }
};
