import { chk_my } from "./chk_my";

//Myanmar date to Julian date
//input:  (my : year,
//mm: month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, Tawthalin=6,
//    Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12 ],
//mmt: month type [1=hnaung, 0=Oo],
//mp :moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon],
//fd: fortnight day [1 to 15])
//output: (jd -julian day number)
//dependency: chk_my(my)
export const m2j = (my, mm, mmt, mp, fd) => {
  const yo = chk_my(my); //check year
  const b = Math.floor(yo.myt / 2);
  const c = yo.myt == 0; //if big watat and common year
  let mml = 30 - (mm % 2); //month length
  if (mm == 3) mml += b; //adjust if Nayon in big watat
  const m1 = mp % 2;
  const m2 = Math.floor(mp / 2);
  let md = m1 * (15 + m2 * (mml - 15)) + (1 - m1) * (fd + 15 * m2);
  mm += 4 - Math.floor((mm + 15) / 16) * 4 + Math.floor((mm + 12) / 16); //adjust month
  let dd =
    md +
    Math.floor(29.544 * mm - 29.26) -
    c * Math.floor((mm + 11) / 16) * 30 +
    b * Math.floor((mm + 12) / 16);
  const myl = 354 + (1 - c) * 30 + b; //year length
  dd += mmt * myl; //adjust day count
  return dd + yo.tg1 - 1;
};
