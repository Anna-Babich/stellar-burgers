import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '../utils/types';
import { orderBurgerApi, TNewOrderResponse } from '../utils/burger-api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | unknown;
};

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const fetchNewOrder = createAsyncThunk(
  'order/fetchNewOrder',
  orderBurgerApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;

// export const orderBurgerApi = (data: string[]) =>
//   fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//       authorization: getCookie('accessToken')
//     } as HeadersInit,
//     body: JSON.stringify({
//       ingredients: data
//     })
//   }).then((data) => {
//     if (data?.success) return data;
//     return Promise.reject(data);
//   });
