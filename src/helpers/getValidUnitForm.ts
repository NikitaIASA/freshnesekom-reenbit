import { BOX } from "@constants/productUnits";

export const getValidUnitForm = (quantity: number, unit: string) => {
    if (unit === BOX) {
        return quantity === 1 ? 'box' : 'boxes';
    }
    return quantity === 1 ? 'kg' : 'kgs';
};
