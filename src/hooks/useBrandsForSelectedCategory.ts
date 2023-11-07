import { useMemo } from "react"

import { useAppSelector } from "./useAppSelector";
import { getCategories } from "@helpers/getCategories";
import { selectProducts, selectCategory } from '@store/selectors/productSelectors';
import { ALL_CATEGORIES_FILTER } from "@constants/allCategoriesConst";

export const useBrandsForSelectedCategory = (): string[] => {
    const selectedCategory = useAppSelector(selectCategory);
    const products = useAppSelector(selectProducts);

    const brandsForSelectedCategory = useMemo(() => {
        if (selectedCategory === ALL_CATEGORIES_FILTER) {
            const allBrands = new Set<string>();
            products.forEach(product => {
                if (product.brand) {
                    allBrands.add(product.brand);
                }
            });
            return [...allBrands];
        }

        const categoriesWithBrands = getCategories(products);
        const category = categoriesWithBrands.find(cat => cat.name === selectedCategory);
        return category ? category.brands : [];
    }, [products, selectedCategory]);

    return brandsForSelectedCategory;
};
