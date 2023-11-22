export const calculateDiscount = (currentPrice: number, previousPrice?: number): number | null => {
    if (previousPrice === undefined || previousPrice <= 0) {
        return null;
    }

    const discount = ((previousPrice - currentPrice) / previousPrice) * 100;
    return Math.round(discount);
};
