import { HUNDRED_PERCENT } from "@constants/priceValidation";

export const calculateDiscount = (currentPrice: number, previousPrice?: number): number | null => {
    if (previousPrice === undefined || previousPrice <= 0) {
        return null;
    }

    const discount = ((previousPrice - currentPrice) / previousPrice) * HUNDRED_PERCENT;
    return Math.round(discount);
};
