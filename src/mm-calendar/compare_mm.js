import { en_to_jdn } from "./en_to_jdn";
import { j2m } from "./j2m";
import { chk_watat } from "./chk_watat";

const adjustMonth = (mmObj) => {
  const adjusted = { ...mmObj };
  if (adjusted.myt === 0 && adjusted.mm >= 5) {
    adjusted.mm -= 1;
  }
  return adjusted;
};

const getTotalMonthsInYear = (year) => {
  const watat = chk_watat(year);
  return watat.watat === 1 ? 13 : 12;
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

      switch (monthType) {
        case "days":
          const day1 = adj1.md > adj2.mml ? adj2.mml : adj1.md;
          const day2 = adj2.md;

          monthDiff += Math.floor(((day2 - day1) / 29.5) * 100) / 100;

          break;
        case "months":
          const month1Portion = adj1.md / adj1.mml;
          const month2Portion = adj2.md / adj2.mml;

          monthDiff += Math.floor((month2Portion - month1Portion) * 100) / 100;
          break;
        default:
          throw new Error(`Unknown comparison type: ${monthType}`);
      }

      return monthDiff;
    }

    case "years": {
      const adj1 = { ...mm1 };
      const adj2 = { ...mm2 };

      if (adj1.myt >= 4) adj1.mm -= 1;
      if (adj2.myt >= 4) adj2.mm -= 1;

      const totalMonthDiff =
        adj2.mm -
        adj1.mm +
        (getMonthFraction(adj2.mp, adj2.fd) -
          getMonthFraction(adj1.mp, adj1.fd));
      return adj2.my - adj1.my + totalMonthDiff / 12;
    }

    default:
      throw new Error(`Unknown comparison type: ${type}`);
  }
};
