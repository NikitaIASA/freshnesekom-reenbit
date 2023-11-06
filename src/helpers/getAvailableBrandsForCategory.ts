import { ALL_CATEGORIES_FILTER } from "@constants/allCategoriesConst";
import { IProduct } from "@appTypes/products";

export const getAvailableBrandsForCategory = (
    category: string,
    allProducts: IProduct[]
): string[] => {
    return category === ALL_CATEGORIES_FILTER
        ? Array.from(new Set(allProducts.map((product) => product.brand)))
        : Array.from(
            new Set(
                allProducts
                    .filter((product) => product.category === category)
                    .map((product) => product.brand)
            )
        );
};
