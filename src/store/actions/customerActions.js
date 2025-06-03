// src/store/actions/customerActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomers } from '../../services/api';

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCustomers();
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);