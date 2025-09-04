//Julian date to Myanmar date
//input: (jd -julian date)
//output:  (my : year,
//myt :year type [0=common, 1=little watat, 2=big watat],
//myl: year length [354, 384, or 385 days],
//mm: month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, Tawthalin=6,
//    Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ],
//mmt: month type [1=hnaung, 0= Oo],
//mml: month length [29 or 30 days],
//md: month day [1 to 30],
//fd: fortnight day [1 to 15],
//mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
//wd: week day [0=sat, 1=sun, ..., 6=fri] )
//dependency: chk_my(my)

import { chk_my } from "./chk_my";

export const j2m = (jd) => {
  const SY = 1577917828 / 4320000; //solar year (365.2587565)
  const MO = 1954168.050623; //beginning of 0 ME
  const jdn = Math.round(jd); //convert jd to jdn
  const my = Math.floor((jdn - 0.5 - MO) / SY); //Myanmar year
  const yo = chk_my(my); //check year
  let dd = jdn - yo.tg1 + 1; //day count
  const b = Math.floor(yo.myt / 2);
  const c = Math.floor(1 / (yo.myt + 1)); //big wa and common yr
  const myl = 354 + (1 - c) * 30 + b; //year length
  const mmt = Math.floor((dd - 1) / myl); //month type: Hnaung =1 or Oo = 0
  dd -= mmt * myl;
  const a = Math.floor((dd + 423) / 512); //adjust day count and threshold
  let mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544); //month
  const e = Math.floor((mm + 12) / 16);
  const f = Math.floor((mm + 11) / 16);
  const md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30; //day
  mm += f * 3 - e * 4;
  const mml = 30 - (mm % 2); //adjust month and month length
  if (mm == 3) mml += b; //adjust if Nayon in big watat
  const mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);
  const fd = md - 15 * Math.floor(md / 16); //waxing or waning day
  const wd = (jdn + 2) % 7; //week day

  if (mm === 0) {
    mm = 4; // 1st Waso
  } else if (mm >= 4) {
    mm += 1; // shift later months
  }

  return {
    my: my,
    myt: yo.myt,
    myl: myl,
    mm: mm,
    mmt: mmt,
    mml: mml,
    md: md,
    mp: mp,
    fd: fd,
    wd: wd,
  };
};
