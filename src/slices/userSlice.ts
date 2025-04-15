import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';

type TUser = {
  name: string;
  isCheck: boolean;
  error: null | string;
};

const initialState: TUser = {
  name: '',
  isCheck: false,
  error: null
};

const registerUser = createAsyncThunk('userInfo/registerUser', registerUserApi);

const loginUser = createAsyncThunk('userInfo/loginUser', loginUserApi);

const forgotPassword = createAsyncThunk(
  'userInfo/forgotPassword',
  forgotPasswordApi
);

const resetPassword = createAsyncThunk(
  'userInfo/resetPassword',
  resetPasswordApi
);

const getUser = createAsyncThunk('userInfo/getUser', getUserApi);

const updateUser = createAsyncThunk('userInfo/updateUser', updateUserApi);

const logout = createAsyncThunk('userInfo/logout', logoutApi);

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {}
});
