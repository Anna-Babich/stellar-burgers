import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient, TConstructorIngredient } from '../utils/types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    moveDownIngredient: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index === state.ingredients.length - 1) return;
      const items = [...state.ingredients];
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
      state.ingredients = items;
    },
    moveUpIngredient: (state, { payload }: PayloadAction<number>) => {
      const index = payload;
      if (index <= 0) return;
      const items = [...state.ingredients];
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
      state.ingredients = items;
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    getIngredient: (state: TConstructorState) => state
  }
});

// export const constructorSlice = createSlice({
//   name: 'burgerConstruct',
//   initialState,
//   reducers: {
//     setBun(state, action: PayloadAction<TIngredient>) {
//       state.bun = action.payload;
//     },
//     addIngredient(state, action: PayloadAction<TIngredient>) {
//       console.log('Добавление ингредиента', action.payload);
//       state.ingredients.push(action.payload);
//     },
//     removeIngredient(state, action: PayloadAction<string>) {
//       // удаляет по уникальному id (можно будет доработать для drag-n-drop)
//       state.ingredients = state.ingredients.filter(
//         (item) => item._id !== action.payload
//       );
//     },
//     resetConstructor(state) {
//       state.bun = null;
//       state.ingredients = [];
//     }
//   }
// });

export const {
  addIngredient,
  removeIngredient,
  reorderConstructor,
  resetConstructor,
  moveDownIngredient,
  moveUpIngredient
} = constructorSlice.actions;

export const { getIngredient } = constructorSlice.selectors;
export default constructorSlice.reducer;
