# myanmar-cal

A JavaScript library for convenient use and calculation of Myanmar days.

**Special Thanks**

Most of the core features, like converting from Myanmar day to Gregorian day, Julian day and others, are based on this blog and some features are directly used. from this.

[Original Doc](https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html)

I only modified it and made some calculations based on this for ease of use.

**Note**

If you want to know details about this package, can you read the on this.

[Explain Doc](https://docs.google.com/document/d/1NVnYgnPmD6SNFqnqYQ8TLa-_yBnQ45BTuE9nB1W3h4Y/edit?usp=sharing)

## Installation

    npm  install  myanmar-cal

## Functions

The list of the functions contain in this package are

- en_to_jdn
- jdn_to_gregorian
- thingyan_time
- myanmar_compare
- en_to_mm
- mm_to_en
- mm_to_jln
- get_sabbath
- tran_mm
- num_eng_to_mm
- num_mm_to_eng
- english_compare

**1. en_to_jdn**

This function converts the English day (Gregorian day) to the Julian day. To use this function, you need to add the date object parameter and return the Julian day.

The usage

    const  julianDay  =  en_to_jdn(new  Date());

The result is

> 2460922

**2. jdn_to_gregorian**

This function converts the Julian day to an English day (Gregorian day). To use this function, you need to add the Julian and return the date object.

The usage

    const  gregorianDay  =  jdn_to_gregorian(2460922);

The result is

> Wed Sep 03 2025 00:00:00 GMT+0630 (Myanmar Time)

**3. thingyan_time**

This function calculates the dates of the Myanmar Thingyan festival. To use it, you need to provide the **Myanmar year**, not the English (Gregorian) year. The reason is that a single English year overlaps with two different Myanmar years, which makes it difficult to determine the correct Thingyan dates using the English year alone. The function will return the Thingyan days as JavaScript `Date` objects array.

The usage

    const  thingyanTime  =  thingyan_time(1387); // Myanmar Year

**4. myanmar_compare**

This function compares two Myanmar dates. For more details on how the comparison works, you can refer to [this](https://docs.google.com/document/d/1NVnYgnPmD6SNFqnqYQ8TLa-_yBnQ45BTuE9nB1W3h4Y/edit?usp=sharing).

To use it, pass in two JavaScript `Date` objects (in the English calendar) along with a parameter that specifies what you want to compare—such as **days**, **months**, or **years**. The function will return the difference between the two dates based on the chosen parameter.

If you want to work directly with Myanmar dates, you can first convert English dates to Myanmar dates using the `en_to_mm` function.

The usage

    const monthDiff = myanmar_compare(new  Date("2024-09-01"), new  Date("2025-09-01"), "months", "days")

The Result

> 12.4

Params

In the month comparison, you can use **days** or **months** as the second parameter based on the day of the month comparison methods.

You can see the details differences between the day of the month comparison methods [here](https://docs.google.com/document/d/1NVnYgnPmD6SNFqnqYQ8TLa-_yBnQ45BTuE9nB1W3h4Y/edit?usp=sharing).

| Param  | Explain                                                                                      |
| ------ | -------------------------------------------------------------------------------------------- |
| days   | Compare the total days difference between two dates                                          |
| months | Compare the total months' difference between two dates based on the Myanmar day-month system |
| years  | Compare the total years' difference between two dates based on the Myanmar day-month system  |

| Param  | Explain                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| days   | Based on the day of the month comparison methods (mostly used in the financial calculation)                |
| months | Based on the position of the day of the month comparison methods (mostly used in the calendar calculation) |

**5. en_to_mm**

This function converts an English (Gregorian) date into a Myanmar date. To use it, pass in a JavaScript `Date` object. You can also specify parameters such as the project context and choose the output language you want the result in.

The usage

    const  myanmarDate  =  en_to_mm(new  Date(),"mm"); // mm/en

The result is

> ၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂ //If param **mm**
> 1387 Year Tawthalin Waxing 12 //If param **en**

**6. mm_to_en**

This function converts a Myanmar date into an English (Gregorian) date. To use it, provide a Myanmar date, and the function will return a JavaScript `Date` object.

**Note:** The input Myanmar date must be in the same format as the output from the `en_to_mm` function. You can use either Burmese or English language formats, but if the input format does not match, the function will throw an error.

The usage

    const  englishDate  =  mm_to_en("၁၃၈၇ ခုနှစ် တော်သလင်း လဆန်း ၁၂");

The result is

> Wed Sep 03 2025 00:00:00 GMT+0630 (Myanmar Time)

**7. mm_to_jln**

This function is like a `mm_to_en`. It gives the Julian days.

**8. get_sabbath**

In Myanmar, some schools close on sabbath days during the sabbath month. This function retrieves all the sabbath days within that month.

It also includes a parameter that lets you specify whether or not to include the **pre-sabbath day** in the results.

The usage

    const  sabbathDays  =  get_sabbath(new Date());

The params

| Param    | About                                                                                         |
| -------- | --------------------------------------------------------------------------------------------- |
| none     | Only show the sabbath days                                                                    |
| pre      | show the pre-Sabbath day (do not contain the pre-full moon day nor new moon day), Sabbath day |
| pre_moon | show the pre-Sabbath day (also contain the pre-full moon day nor new moon day), Sabbath day   |

**9. tran_mm**

This function localizes an English (Gregorian) date into the Myanmar language.

It is useful for users who cannot read English dates, allowing them to view dates in a format they can easily understand.

The usage

    const myanmarLan  =  tran_mm(new Date());

The result

> ၂၀၂၅ ခုနှစ် စက်တင်ဘာ ၃ ရက် (၃/၈/၂၀၂၅)

**10. num_eng_to_mm**

This function localises an English number to a Myanmar number.

It is useful for users who cannot read English numbers and easy to understand.

The usage

    const myanmarNum  =  num_eng_to_mm("1250");

The result

> ၁၂၅၀

**11. num_mm_to_eng**

This function is like a `num_eng_to_mm`. The difference is changing from Myanmar numbers to English numbers. Note: the output number is a string type.

The usage

    const englishNum  =  num_mm_to_eng("၁၂၅၀");

The result

> 1250

**12. english_compare**

This function compares two English dates like `myanmar_compare`.

The usage

    const monthDiff = english_compare(new Date("2024-09-01"), new Date("2025-09-01"), "months")

The result

> 12

Params

| Param  | About                                                                                        |
| ------ | -------------------------------------------------------------------------------------------- |
| days   | Compare the total days difference between two dates                                          |
| months | Compare the total months' difference between two dates based on the English day-month system |
| years  | Compare the total years' difference between two dates based on the English day-month system  |

---

Made with love ( Kaung Pyae Aung )
