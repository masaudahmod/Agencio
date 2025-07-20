import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authSlice";
import { businessApi } from "./features/api/businessSlice";
import authReducer from "./features/authHandle";
import { contentSlice } from "./features/api/contentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [contentSlice.reducerPath]: contentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(businessApi.middleware)
      .concat(contentSlice.middleware),
});
