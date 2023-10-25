import { IProduct } from "@appTypes/products";

interface ICategory {
    name: string;
    brands: string[];
}

export const getCategories = (products: IProduct[]): ICategory[] => {
    const categoriesMap: { [key: string]: Set<string> } = {};

    products.forEach(product => {
        if (!categoriesMap[product.category]) {
            categoriesMap[product.category] = new Set();
        }
        if (product.details.farm) {
            categoriesMap[product.category].add(product.details.farm);
        }
        if (product.details.brand) {
            categoriesMap[product.category].add(product.details.brand);
        }
    });

    return Object.entries(categoriesMap).map(([category, brandsSet]) => ({
        name: category,
        brands: [...brandsSet],
    }));
};
