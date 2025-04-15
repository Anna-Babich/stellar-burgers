import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient, TOrder } from '../utils/types';
import { orderBurgerApi, TNewOrderResponse } from '../utils/burger-api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | unknown;
};

const initialState: TOrderState = {
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
  reducers: {},
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

// type TNewOrderResponse = TServerResponse<{
//   order: TOrder;
//   name: string;
// }>;

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

// export const fetchIngredients = createAsyncThunk(
//   'burger/fetchIngredients',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getIngredientsApi();
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.message || 'Ошибка загрузки ингредиентов');
//     }
//   }
// );

// export const burgerSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   }
// });

// export default burgerSlice.reducer;
