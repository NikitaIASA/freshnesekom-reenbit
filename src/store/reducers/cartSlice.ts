import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    zip: string;
}

interface cartState {
    CartFormData: CartFormData;
}

const initialState: cartState = {
    CartFormData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        city: '',
        zip: '',
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof CartFormData, value: string }>) => {
            const { field, value } = action.payload;
            state.CartFormData[field] = value;
        },
        resetCartForm: (state) => {
            state.CartFormData = initialState.CartFormData;
        }
    },
});

export const { updateField, resetCartForm } = cartSlice.actions;

export default cartSlice.reducer;