import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import cartSlice from './reducers/cartSlice';
import authSlice from './reducers/authSlice';
import favoriteSlice from './reducers/favoriteSlice';
import messageSlice from './reducers/messageSlice';
import { productApi } from './services/productApi';
import { reducer as toastrReducer } from 'react-redux-toastr';
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
import storage from './sync_storage';

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  cart: cartSlice,
  favorite: favoriteSlice,
  auth: authSlice,
  message: messageSlice,
  toastr: toastrReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whiteList: ['cart', 'auth', 'favorite'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          HYDRATE,
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(productApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
