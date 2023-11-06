import { IProduct } from "@appTypes/products";

interface categoryCount {
    name: string;
    count: number;
}
export const getProductsCountByCategory = (products: IProduct[]): categoryCount[] => {
    const categoryCounts: Record<string, categoryCount> = {};

    products.forEach(product => {
        if (!categoryCounts[product.category]) {
            categoryCounts[product.category] = { name: product.category, count: 0 };
        }
        categoryCounts[product.category].count++;
    });

    return Object.values(categoryCounts);
};
