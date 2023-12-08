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

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

interface cartState {
    CartFormData: CartFormData;
    items: CartItem[];
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
    },
    items: [],
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