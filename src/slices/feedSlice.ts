import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrdersData, TOrder } from '../utils/types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | undefined;
  selectedOrder: null | TOrder;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined,
  selectedOrder: null
};

export const fetchGetFeeds = createAsyncThunk(
  'feed/fetchGetFeeds',
  getFeedsApi
);

export const fetchGetOrderByNumber = createAsyncThunk(
  'feed/fetchGetOrderByNumber',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeeds.pending, (state) => {})
      .addCase(fetchGetFeeds.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.loading = false;
      })
      .addCase(fetchGetFeeds.rejected, (state, { error }) => {
        state.error = error.message;
      })

      .addCase(fetchGetOrderByNumber.pending, (state) => {
        state.selectedOrder = null;
      })
      .addCase(fetchGetOrderByNumber.fulfilled, (state, { payload }) => {
        state.selectedOrder = payload.orders[0];
      })
      .addCase(fetchGetOrderByNumber.rejected, (state, { error }) => {
        state.error = error.message;
      });
  }
});

export default feedSlice.reducer;
// export const getFeedsApi = () =>
//   fetch(`${URL}/orders/all`)
//     .then((res) => checkResponse<TFeedsResponse>(res))
//     .then((data) => {
//       if (data?.success) return data;
//       return Promise.reject(data);
//     });
