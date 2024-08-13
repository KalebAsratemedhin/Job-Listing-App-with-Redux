import { apiSlice } from '@/app/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
})