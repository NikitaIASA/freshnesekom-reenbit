import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartFormData } from '@appTypes/cartForm';
import { DEFAULT_CART_FORM } from '@constants/defaultCartForm';

interface cartState {
    CartFormData: ICartFormData;
}

const initialState: cartState = {
    CartFormData: DEFAULT_CART_FORM,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateField: (state, action: PayloadAction<{ field: keyof ICartFormData, value: string | boolean }>) => {
            const { field, value } = action.payload;
            (state.CartFormData[field] as any) = value;
        },
        resetCartForm: (state) => {
            state.CartFormData = initialState.CartFormData;
        }
    },
});

export const { updateField, resetCartForm } = cartSlice.actions;

export default cartSlice.reducer;
