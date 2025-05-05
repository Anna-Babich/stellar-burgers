import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../utils/burger-api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  error: string | undefined;
};

export const initialState: TUserState = {
  data: null, // { email: '', name: '',}
  isAuthChecked: false,
  error: undefined
};

export const fetchRegisterUser = createAsyncThunk(
  'userInfo/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchLoginUser = createAsyncThunk(
  'userInfo/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'userInfo/forgotPassword',
  forgotPasswordApi
);
export const resetPassword = createAsyncThunk(
  'userInfo/resetPassword',
  resetPasswordApi
);
export const fetchGetUser = createAsyncThunk('userInfo/getUser', getUserApi);
export const fetchUpdateUser = createAsyncThunk(
  'userInfo/updateUser',
  updateUserApi
);
export const logout = createAsyncThunk('userInfo/logout', (_, { dispatch }) => {
  logoutApi()
    .then(() => {
      deleteCookie('accessToken');
      localStorage.clear();
      dispatch(logout());
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // checkUser
      .addCase(fetchGetUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(fetchGetUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.data = payload.user;
      })
      .addCase(fetchGetUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = true;
      })
      // логин
      .addCase(fetchLoginUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.data = payload;
      })
      .addCase(fetchLoginUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = true;
      })
      // изменеие данных в профиле
      .addCase(fetchUpdateUser.pending, (state) => {})
      .addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
        state.data = payload.user;
      })
      .addCase(fetchUpdateUser.rejected, (state, { error }) => {
        state.error = error.message;
      })
      // регистрация
      .addCase(fetchRegisterUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isAuthChecked = true;
      })
      // выход
      .addCase(logout.pending, (state) => {
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.data = null;
        state.isAuthChecked = true;
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
  selectors: {
    getCheckUser: (state) => state.isAuthChecked
  }
});

export const { getCheckUser } = userSlice.selectors;

export default userSlice.reducer;
