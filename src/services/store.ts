import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerReducer from '../slices/burgerSlice';
import constructorReducer from '../slices/constructorSlice';
import orderSlice from '../slices/orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: burgerReducer,
  burgerConstructor: constructorReducer,
  newOrder: orderSlice
}); // Заменить на импорт настоящего редьюсера
//burderCOnstructor, feed, ingredients, order - Прямая ссылка или в модалке, ProfileOrders - со страницы профиля/заказы профиля , user

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
