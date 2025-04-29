import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerReducer from '../slices/burgerSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import feedReducer from '../slices/feedSlice';
import profileOrderReducer from '../slices/profileOrderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Заменить на импорт настоящего редьюсера
export const rootReducer = combineReducers({
  ingredients: burgerReducer,
  burgerConstructor: constructorReducer,
  newOrder: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
