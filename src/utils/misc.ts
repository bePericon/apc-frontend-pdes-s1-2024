

export const numberWithCommas = (x: any) => {
    let parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    if (parts[1]?.length === 1) {
        // IF THERE IS ONLY ONE DIGIT AFTER THE COMMA, i.e. 25.5, MAKE IT 25.50
        parts[1] = parts[1] + '0'
    }
    return parts.join(',')
}