import { createSlice } from '@reduxjs/toolkit';

import { IProduct } from "@appTypes/products";
import { STATUSES } from '@constants/statuses';
import productServices from '@store/services/productServices';

interface ProductsState {
    products: IProduct[];
    status: STATUSES;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    status: STATUSES.LOADING,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
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

export default productsSlice.reducer;
