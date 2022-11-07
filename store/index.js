import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import cartSlice from "./reducers/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { productApi } from "./services/productApi";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userSlice from "./reducers/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: createWebStorage("local"),
  whitelist: ["cart", "user"],
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  cart: cartSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.cart) nextState.cart = state.cart;
    return nextState;
  } else {
    return persistedReducer(state, action);
  }
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;

export const wrapper = createWrapper(() => store);
