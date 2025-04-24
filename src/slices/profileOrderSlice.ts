import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

type TProfileOrderState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined;
};

const initialState: TProfileOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

export const fetchGetOrders = createAsyncThunk(
  'profileOrders/fetchGetOrders',
  getOrdersApi
);

export const profileOrderSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrders.pending, (state) => {})
      .addCase(fetchGetOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.loading = true;
      })
      .addCase(fetchGetOrders.rejected, (state, { error }) => {
        state.error = error.message;
      });
  }
});

export default profileOrderSlice.reducer;
