
export const jdn_to_mmyear = (jdn) => {
    const SY = 1577917828/4320000

    const mmyear = (jdn-0.5-1954168.0506)/SY

    return Math.floor(mmyear)
}
    
