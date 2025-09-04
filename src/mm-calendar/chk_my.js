//Check Myanmar Year
//input: (my -myanmar year)
//output:  (myt :year type [0=common, 1=little watat, 2=big watat],
//tg1 : the 1st day of Tagu as Julian Day Number
//fm : full moon day of [2nd] Waso as Julain Day Number)
//werr: watat error
//dependency: chk_watat(my)

import {chk_watat} from './chk_watat';

export const chk_my = (my) => {
  let yd = 0;
  let y1;
  let nd = 0;
  let werr = 0;
  let fm = 0;
  const y2 = chk_watat(my);
  let myt = y2.watat;
  do {
    yd++;
    y1 = chk_watat(my - yd);
  } while (y1.watat == 0 && yd < 3);
  if (myt) {
    nd = (y2.fm - y1.fm) % 354;
    myt = Math.floor(nd / 31) + 1;
    fm = y2.fm;
    if (nd != 30 && nd != 31) {
      werr = 1;
    }
  } else fm = y1.fm + 354 * yd;
  const tg1 = y1.fm + 354 * yd - 102;
  return { myt: myt, tg1: tg1, fm: fm, werr: werr };
}
