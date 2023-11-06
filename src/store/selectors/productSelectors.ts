import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { ALL_CATEGORIES_FILTER } from "@constants/allCategoriesConst";

export const selectProductsState = (state: RootState) => state.products;
export const selectProducts = (state: RootState) => state.products.products;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectCategory = (state: RootState) => state.products.selectedCategory;
export const selectBrands = (state: RootState) => state.products.selectedBrands;
export const selectSelectedRatings = (state: RootState) => state.products.selectedRatings;
export const selectPriceRange = (state: RootState) => state.products.selectedPriceRange;

// Selector for filtering products by category, brand, rating, and search query.
const selectBaseFilteredProducts = createSelector(
    [selectProducts, selectSearchQuery, selectCategory, selectBrands, selectSelectedRatings],
    (products, searchQuery, selectedCategory, selectedBrands, selectedRatings) => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === ALL_CATEGORIES_FILTER || product.category === selectedCategory;
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(product.rating);
            const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesBrand && matchesRating && matchesSearch;
        });
    }
);

// Uses the base filtered products to apply a price range filter.
export const selectFilteredProducts = createSelector(
    [selectBaseFilteredProducts, selectPriceRange],
    (baseFilteredProducts, selectedPriceRange) => {
        return baseFilteredProducts.filter(product => {
            const matchesPrice = product.price.current >= selectedPriceRange[0] && product.price.current <= selectedPriceRange[1];
            return matchesPrice;
        });
    }
);

// This range is dynamically adjusted based on other selected filters.
export const selectFilteredPriceRange = createSelector(
    [selectBaseFilteredProducts],
    (baseFilteredProducts) => {
        const prices = baseFilteredProducts.map(product => product.price.current);
        const minValue = prices.length ? Math.min(...prices) : 0;
        const maxValue = prices.length ? Math.max(...prices) : 0;
        return [minValue, maxValue];
    }
);
