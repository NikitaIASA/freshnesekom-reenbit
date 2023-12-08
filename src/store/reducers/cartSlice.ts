import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartFormData } from '@appTypes/cartForm';
import { DEFAULT_CART_FORM } from '@constants/defaultCartForm';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

interface cartState {
    CartFormData: ICartFormData;
    items: CartItem[];
}

const initialState: cartState = {
    CartFormData: DEFAULT_CART_FORM,
    items: [],
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
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id && item.unit === newItem.unit);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
        },
        removeItem: (state, action: PayloadAction<{ id: string; unit: string }>) => {
            const { id, unit } = action.payload;
            state.items = state.items.filter(item => item.id !== id || item.unit !== unit);
        },
    },
});

export const { updateField, resetCartForm, addItem, removeItem} = cartSlice.actions;

export default cartSlice.reducer;
