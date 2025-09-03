export const num_eng_to_mm = (num) => {
    
    const num_mm = ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"];

    let mm_num = "";

    for (let i = 0; i < num.length; i++) {
        mm_num += num_mm[num[i]];
    }

    return mm_num;
}
