import { createSlice } from '@reduxjs/toolkit';

import { IProduct } from "@appTypes/products";
import productsServices from '@store/services/productServices';

interface ProductsState {
    products: IProduct[];
    status: 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    status: 'loading',
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsServices.getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(productsServices.getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(productsServices.getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default productsSlice.reducer;
