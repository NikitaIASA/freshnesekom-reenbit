import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from "@appTypes/products";
import { STATUSES } from '@constants/statuses';
import productServices from '@store/services/productServices';
import { ALL_CATEGORIES_FILTER } from '@constants/allCategoriesConst';

interface ProductsState {
    products: IProduct[];
    status: STATUSES;
    error: string | null;
    searchQuery: string;
    selectedCategory: string;
    selectedBrand: string | null;
}

const initialState: ProductsState = {
    products: [],
    status: STATUSES.LOADING,
    error: null,
    searchQuery: "",
    selectedCategory: ALL_CATEGORIES_FILTER,
    selectedBrand: null
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
        setSelectedBrand: (state, action: PayloadAction<string | null>) => {
            state.selectedBrand = action.payload;
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
    setSelectedBrand
} = productsSlice.actions;

export default productsSlice.reducer;
