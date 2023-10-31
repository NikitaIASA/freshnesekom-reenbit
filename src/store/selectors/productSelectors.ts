import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const selectProductsState = (state: RootState) => state.products;
export const selectProducts = (state: RootState) => state.products.products;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectCategory = (state: RootState) => state.products.selectedCategory;

export const selectFilteredProducts = createSelector(
    [selectProductsState],
    ({ products, searchQuery, selectedCategory, selectedBrand }) => {

        return products.filter(product => {
            let matchesCategory = true;
            let matchesBrand = true;
            let matchesSearch = true;

            if (selectedCategory && selectedCategory !== "All Categories") {
                matchesCategory = product.category === selectedCategory;
            }

            if (selectedBrand) {
                matchesBrand = product.brand === selectedBrand;
            }

            if (searchQuery) {
                matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            }

            return matchesCategory && matchesBrand && matchesSearch;
        });
    }
);
