import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from "@appTypes/products";
import { STATUSES } from '@constants/statuses';
import productServices from '@store/services/productServices';
import { ALL_CATEGORIES_FILTER } from '@constants/allCategoriesConst';
import { getAvailableBrandsForCategory } from '@helpers/getAvailableBrandsForCategory';
import { SORT_OPTIONS } from '@constants/sortOptions';

interface ProductsState {
    products: IProduct[];
    status: STATUSES;
    error: string | null;
    searchQuery: string;
    selectedCategory: string;
    selectedBrands: string[];
    selectedRatings: number[];
    selectedPriceRange: number[];
    sortBy: string;
}

const initialState: ProductsState = {
    products: [],
    status: STATUSES.LOADING,
    error: null,
    searchQuery: "",
    selectedCategory: ALL_CATEGORIES_FILTER,
    selectedBrands: [],
    selectedRatings: [],
    selectedPriceRange: [0, 0],
    sortBy: SORT_OPTIONS.DEFAULT,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedCategoryWithBrands: (state, action: PayloadAction<string>) => {
            const newCategory = action.payload;
            const availableBrands = getAvailableBrandsForCategory(newCategory, state.products);

            if (state.selectedCategory === ALL_CATEGORIES_FILTER) {
                state.selectedBrands = state.selectedBrands.filter(brand => availableBrands.includes(brand));
            } else {
                state.selectedBrands = [];
            }

            state.selectedCategory = newCategory;
        },
        setSelectedBrand(state, action: PayloadAction<string>) {
            state.selectedBrands = [action.payload];
        },
        setSelectedBrands(state, action: PayloadAction<string[]>) {
            state.selectedBrands = action.payload;
        },
        toggleBrand(state, action: PayloadAction<string>) {
            const brand = action.payload;
            const index = state.selectedBrands.indexOf(brand);
            if (index !== -1) {
                state.selectedBrands.splice(index, 1);
            } else {
                state.selectedBrands.push(brand);
            }
        },
        setSelectedRatings(state, action: PayloadAction<number[]>) {
            state.selectedRatings = action.payload;
        },
        toggleRating(state, action: PayloadAction<number>) {
            const rating = action.payload;
            const index = state.selectedRatings.indexOf(rating);
            if (index !== -1) {
                state.selectedRatings.splice(index, 1);
            } else {
                state.selectedRatings.push(rating);
            }
        },
        setSelectedPriceRange(state, action: PayloadAction<number[]>) {
            state.selectedPriceRange = action.payload;
        },
        resetFilter: (state) => {
            const prices = state.products.map(product => product.price.current);
            const minPrice = Math.floor(Math.min(...prices));
            const maxPrice = Math.ceil(Math.max(...prices));

            state.searchQuery = initialState.searchQuery;
            state.selectedCategory = initialState.selectedCategory;
            state.selectedBrands = initialState.selectedBrands;
            state.selectedRatings = initialState.selectedRatings;
            state.selectedPriceRange = [minPrice, maxPrice];
            state.sortBy = initialState.sortBy;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(productServices.getProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(productServices.getProducts.fulfilled, (state, action) => {
                state.status = STATUSES.SUCCEEDED;
                state.products = action.payload;
            })
            .addCase(productServices.getProducts.rejected, (state, action) => {
                state.status = STATUSES.FAILED;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    setSelectedCategory,
    setSelectedCategoryWithBrands,
    setSelectedBrand,
    setSelectedBrands,
    toggleBrand,
    setSelectedRatings,
    toggleRating,
    setSelectedPriceRange,
    resetFilter,
    setSortBy
} = productsSlice.actions;

export default productsSlice.reducer;
