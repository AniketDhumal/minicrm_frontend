// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './reducers/campaignSlice';
import customerReducer from './reducers/customerSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
    customers: customerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
});