import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';
import { SerializedError } from '@reduxjs/toolkit';

type TIngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
};

const initialState: TIngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  getIngredientsApi
);

export const burgerSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      });
  }
});

export default burgerSlice.reducer;

// export const getIngredientsApi = () =>
//   fetch(`${URL}/ingredients`)
//     .then((res) => checkResponse<TIngredientsResponse>(res))
//     .then((data) => {
//       if (data?.success) return data.data;
//       return Promise.reject(data);
//     });
