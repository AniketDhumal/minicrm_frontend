// src/store/reducers/customerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchCustomers } from '../actions/customerActions';

const initialState = {
  customers: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    resetCustomerState: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

// Export actions
export const { resetCustomerState } = customerSlice.actions;

// Export selectors
export const selectAllCustomers = (state) => state.customers.customers;
export const selectCustomerStatus = (state) => state.customers.status;
export const selectCustomerError = (state) => state.customers.error;

// Export reducer
export default customerSlice.reducer;