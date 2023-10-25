import axios from '@core/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../types/products';

export const getProductsService = async () => {
    try {
        const { data } = await axios.get("/products");
        return data;
    } catch (error) {
        throw new Error('Network error occurred');
    }
};

export const getProducts = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
    'products/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProductsService();
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Network error occurred');
        }
    },
);

const productsServices = {
    getProducts
};

export default productsServices;
