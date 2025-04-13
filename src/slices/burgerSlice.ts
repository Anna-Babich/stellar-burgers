import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

type IngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка загрузки ингредиентов');
    }
  }
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
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
