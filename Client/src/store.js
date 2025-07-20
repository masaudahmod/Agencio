import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/api/authSlice";
import { businessApi } from "./features/api/businessSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(businessApi.middleware),
});
