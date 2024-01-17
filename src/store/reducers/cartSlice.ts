import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartFormData } from '@appTypes/cartForm';
import { DEFAULT_CART_FORM } from '@constants/defaultCartForm';
import { ICartItem } from '@appTypes/cartItem';
import { toast } from 'react-toastify';

interface cartState {
    CartFormData: ICartFormData;
    items: ICartItem[];
}

const initialState: cartState = {
    CartFormData: DEFAULT_CART_FORM,
    items: [],
};

const KG_PER_BOX = 5;

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
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id && item.unit === newItem.unit);

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.unshift(newItem);
            }
        },
        removeItem: (state, action: PayloadAction<{ id: string; unit: string }>) => {
            const { id, unit } = action.payload;
            state.items = state.items.filter(item => item.id !== id || item.unit !== unit);
        },
        changeItemUnit: (state, action: PayloadAction<{ id: string; newUnit: string; stock: number }>) => {
            const { id, newUnit, stock } = action.payload;
        
            const existingItem = state.items.find(item => item.id === id && item.unit === newUnit);
            const itemToChange = state.items.find(item => item.id === id && item.unit !== newUnit);
        
            if (!existingItem) {
                const item = state.items.find(item => item.id === id);
        
                if (item) {
                    const newTotalQuantityInKg = newUnit === 'box' ? item.quantity * KG_PER_BOX : item.quantity;
        
                    if (newTotalQuantityInKg > stock) {
                        toast.error("Exceeding warehouse stock: " + stock);
                    } else {
                        item.unit = newUnit;
                    }
                }
            } else {
                if (itemToChange) {
                    const newTotalQuantity = existingItem.quantity + itemToChange.quantity;
                    const newTotalQuantityInKg = newUnit === 'box' ? newTotalQuantity * KG_PER_BOX : newTotalQuantity;
        
                    if (newTotalQuantityInKg > stock) {
                        toast.error("Not enough units in stock: " + stock);
                    } else {
                        state.items = state.items.filter(item => item !== itemToChange);
                        existingItem.quantity = newTotalQuantity;
                    }
                }
            }
        },
        changeItemQuantity: (state, action: PayloadAction<{ id: string; newQuantity: number; unit: string }>) => {
            const { id, newQuantity, unit } = action.payload;
            const item = state.items.find(item => item.id === id && item.unit === unit);

            if (item && newQuantity >= 0) {
                item.quantity = newQuantity;
            }
        },
    },
});

export const { updateField, resetCartForm, addItem, removeItem, changeItemUnit, changeItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
