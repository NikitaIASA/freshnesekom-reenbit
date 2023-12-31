import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { ALL_CATEGORIES_FILTER } from "@constants/allCategoriesConst";
import { selectSortBy } from "./sortSelectors";
import { SORT_OPTIONS } from "@constants/sortOptions";

export const selectError = (state: RootState) => state.products.error;
export const selectProductsState = (state: RootState) => state.products;
export const selectProducts = (state: RootState) => state.products.products;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectCategory = (state: RootState) => state.products.selectedCategory;
export const selectBrands = (state: RootState) => state.products.selectedBrands;
export const selectSelectedRatings = (state: RootState) => state.products.selectedRatings;
export const selectPriceRange = (state: RootState) => state.products.selectedPriceRange;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectSelectedProductStatus = (state: RootState) => state.products.selectedProductStatus;

// Selector for filtering products by category, brand, rating, and search query.
export const selectBaseFilteredProducts = createSelector(
    [selectProducts, selectSearchQuery, selectCategory, selectBrands, selectSelectedRatings, selectPriceRange],
    (products, searchQuery, selectedCategory, selectedBrands, selectedRatings) => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === ALL_CATEGORIES_FILTER || product.category === selectedCategory;
            const matchesBrand = !selectedBrands.length || selectedBrands.includes(product.brand);
            const matchesRating = !selectedRatings.length || selectedRatings.includes(product.rating);
            const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesBrand && matchesRating && matchesSearch;
        });
    }
);

// This range is dynamically adjusted based on other selected filters.
export const selectFilteredPriceRange = createSelector(
    [selectBaseFilteredProducts, selectPriceRange],
    (baseFilteredProducts) => {
        const prices = baseFilteredProducts.map(product => product.price.current);
        const minValue = prices.length ? Math.floor(Math.min(...prices)) : 0;
        const maxValue = prices.length ? Math.ceil(Math.max(...prices)) : 0;

        return [minValue, maxValue];
    }
);

// Uses the base filtered products to apply a price range filter.
export const selectFilteredProducts = createSelector(
    [selectBaseFilteredProducts, selectPriceRange, selectSortBy],
    (baseFilteredProducts, selectedPriceRange, sortBy) => {
        const filteredProducts = baseFilteredProducts.filter(product => {
            const matchesPrice = Math.round(product.price.current) >= selectedPriceRange[0] && Math.round(product.price.current) <= selectedPriceRange[1];
            return matchesPrice;
        });

        switch (sortBy) {
            case SORT_OPTIONS.PRICE_ASC:
                filteredProducts.sort((a, b) => a.price.current - b.price.current);
                break;
            case SORT_OPTIONS.PRICE_DESC:
                filteredProducts.sort((a, b) => b.price.current - a.price.current);
                break;
            case SORT_OPTIONS.RATING_ASC:
                filteredProducts.sort((a, b) => a.rating - b.rating);
                break;
            case SORT_OPTIONS.RATING_DESC:
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case SORT_OPTIONS.NAME_ASC:
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case SORT_OPTIONS.NAME_DESC:
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case SORT_OPTIONS.STOCK_ASC:
                filteredProducts.sort((a, b) => a.stock - b.stock);
                break;
            case SORT_OPTIONS.STOCK_DESC:
                filteredProducts.sort((a, b) => b.stock - a.stock);
                break;
            default:
                break;
        }
        return filteredProducts;
    }
);

// Selector for search suggestion list
export const selectSearchedProducts = createSelector(
    [selectProducts, selectCategory, selectSearchQuery],
    (products, selectedCategory, searchQuery) => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === ALL_CATEGORIES_FILTER || product.category === selectedCategory;
            const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }
);
