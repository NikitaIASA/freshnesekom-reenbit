import { productInstance } from '@core/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../../types/products';

export const getProductsService = async () => {
    try {
        const { data } = await productInstance.get("/products");
        return data;
    } catch (error) {
        throw new Error('Network error occurred');
    }
};

export const getOneProductService = async (id: string) => {
    try {
        const { data } = await productInstance.get(`/products/${id}`);
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

export const getOneProduct = createAsyncThunk<IProduct, string, { rejectValue: string }>(
    'products/getOneProduct',
    async (id, { rejectWithValue }) => {
        try {
            const data = await getOneProductService(id);
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Network error occurred');
        }
    },
);

const productServices = {
    getProducts,
    getOneProduct,
};

export default productServices;
