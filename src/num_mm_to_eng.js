export const num_mm_to_eng = (num) => {
    
    const num_mm = ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];

    let eng_num = "";

    for (let i = 0; i < num.length; i++) {
        eng_num += num_mm.indexOf(num[i]);
    }

    return eng_num;
}