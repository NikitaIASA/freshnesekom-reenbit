import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import productsReducer from '@store/reducers/productSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['selectedCategory', 'selectedBrands', "selectedRatings", "sortBy", "currentPage", "itemsPerPageByPage"]
};

const persistedReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    products: persistedReducer,
  },
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
