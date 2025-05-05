import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../utils/types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
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
    resetConstructor: () => initialState
  },
  selectors: {
    getIngredient: (state: TConstructorState) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  moveDownIngredient,
  moveUpIngredient
} = constructorSlice.actions;

export const { getIngredient } = constructorSlice.selectors;
export default constructorSlice.reducer;
