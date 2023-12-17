import { RootState } from "@store/store";

export const selectCartFormData = (state: RootState) => state.cart.CartFormData
export const selectCartItems = (state: RootState) => state.cart.items;
