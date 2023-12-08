import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import productsReducer from '@store/reducers/productSlice';
import locationAutocompleteSliceReducer from '@store/reducers/locationAutocompleteSlice'; 
import cartSliceReducer from '@store/reducers/cartSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products'] 
};

const rootReducer = combineReducers({
  products: productsReducer,
  locationAutocomplete: locationAutocompleteSliceReducer,
  cart: cartSliceReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetRootState = typeof store.getState;

export const persistor = persistStore(store);
