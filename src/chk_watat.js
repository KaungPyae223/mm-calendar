//Era definition
var g_eras = [
  //-------------------------------------------------------------------------
  //The first era (the era of Myanmar kings: ME1216 and before)
  //Makaranta system 1 (ME 0 - 797)
  {
    eid: 1.1, //era id
    begin: -999, //beginning Myanmar year
    end: 797, //ending Myanmar year
    WO: -1.1, // watat offset to compensate
    NM: -1, //number of months to find excess days
    fme: [
      [205, 1],
      [246, 1],
      [471, 1],
      [572, -1],
      [651, 1],
      [653, 2],
      [656, 1],
      [672, 1],
      [729, 1],
      [767, -1],
    ], //exceptions for full moon days
    wte: [], //exceptions for watat years
  },
  //Makaranta system 2 (ME 798 - 1099)
  {
    eid: 1.2, //era id
    begin: 798, //beginning Myanmar year
    end: 1099, //ending Myanmar year
    WO: -1.1, // watat offset to compensate
    NM: -1, //number of months to find excess days
    fme: [
      [813, -1],
      [849, -1],
      [851, -1],
      [854, -1],
      [927, -1],
      [933, -1],
      [936, -1],
      [938, -1],
      [949, -1],
      [952, -1],
      [963, -1],
      [968, -1],
      [1039, -1],
    ],
    //exceptions for full moon days
    wte: [], //exceptions for watat years
  },
  //Thandeikta (ME 1100 - 1216)
  {
    eid: 1.3, //era id
    begin: 1100, //beginning Myanmar year
    end: 1216, //ending Myanmar year
    WO: -0.85, // watat offset to compensate
    NM: -1, //number of months to find excess days
    fme: [
      [1120, 1],
      [1126, -1],
      [1150, 1],
      [1172, -1],
      [1207, 1],
    ], //exceptions for full moon days
    wte: [
      [1201, 1],
      [1202, 0],
    ], //exceptions for watat years
  },
  //---------------------------------------------------------
  //The second era (the era under British colony: 1217 ME - 1311 ME)
  {
    eid: 2, //era id
    begin: 1217, //beginning Myanmar year
    end: 1311, //ending Myanmar year
    WO: -1, // watat offset to compensate
    NM: 4, //number of months to find excess days
    fme: [
      [1234, 1],
      [1261, -1],
    ], //exceptions for full moon days
    wte: [
      [1263, 1],
      [1264, 0],
    ], //exceptions for watat years
  },
  //---------------------------------------------------------
  //The third era (the era after Independence 1312 ME and after)
  {
    eid: 3, //era id
    begin: 1312, //beginning Myanmar year
    end: 9999, //ending Myanmar year
    WO: -0.5, // watat offset to compensate
    NM: 8, //number of months to find excess days
    fme: [[1377, 1]], //exceptions for full moon days
    wte: [
      [1344, 1],
      [1345, 0],
    ], //exceptions for watat years
  },
];
//-------------------------------------------------------------------------
//Check watat (intercalary month)
//input: (my -myanmar year)
//output:  ( watat - intercalary month [1=watat, 0=common]
//  fm - full moon day of 2nd Waso in jdn [valid for watat years only])
//dependency: chk_exception(my,fm,watat,ei)
export const chk_watat = (my) => {
  for (var i = g_eras.length - 1; i > 0; i--) if (my >= g_eras[i].begin) break; //get data for respective era
  var era = g_eras[i];
  var NM = era.NM,
    WO = era.WO;
  var SY = 1577917828 / 4320000; //solar year (365.2587565)
  var LM = 1577917828 / 53433336; //lunar month (29.53058795)
  var MO = 1954168.050623; //beginning of 0 ME

  var TA = (SY / 12 - LM) * (12 - NM); //threshold to adjust
  var ed = (SY * (my + 3739)) % LM; // excess day
  if (ed < TA) ed += LM; //adjust excess days
  var fm = Math.round(SY * my + MO - ed + 4.5 * LM + WO); //full moon day of 2nd Waso
  var TW = 0,
    watat = 0; //find watat
  if (era.eid >= 2) {
    //if 2nd era or later find watat based on excess days
    TW = LM - (SY / 12 - LM) * NM;
    if (ed >= TW) watat = 1;
  } else {
    //if 1st era,find watat by 19 years metonic cycle
    //Myanmar year is divided by 19 and there is intercalary month
    //if the remainder is 2,5,7,10,13,15,18
    //https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
    watat = (my * 7 + 2) % 19;
    if (watat < 0) watat += 19;
    watat = Math.floor(watat / 12);
  }
  i = bSearch(my, era.wte);
  if (i >= 0) watat = era.wte[i][1]; //correct watat exceptions
  if (watat) {
    i = bSearch(my, era.fme);
    if (i >= 0) fm += era.fme[i][1];
  } //correct full moon day exceptions
  return { fm: fm, watat: watat };
};

const bSearch = (my, arr) => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid][0] === my) {
      return mid;
    } else if (arr[mid][0] < my) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};
