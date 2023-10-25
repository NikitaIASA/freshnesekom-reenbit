import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '@store/reducers/productSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetRootState = typeof store.getState;
