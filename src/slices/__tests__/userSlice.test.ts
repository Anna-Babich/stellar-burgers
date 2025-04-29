import { expect, test, describe } from '@jest/globals';
import userReducer, { initialState, fetchLoginUser, fetchGetUser, fetchRegisterUser, fetchUpdateUser, logout } from '../userSlice';

describe('[userSlice] проверка асинхронных экшенов', () => {
  test('fetchLoginUser.pending', () => {
    const action = { type: fetchLoginUser.pending.type};
    const state = userReducer(initialState, action);

    expect(state.error).toBeUndefined();
  });
  test('fetchLoginUser.fulfilled', () => {
    const mockData = {
      "email": "anna@yandex.ru",
      "name": "Anya"
  }
    const action = { type: fetchLoginUser.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toEqual(mockData);
    expect(state.isAuthChecked).toBe(true);
  });
  
  test('fetchLoginUser.rejected', () => {
    const action = { type: fetchLoginUser.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(true);
  });


  test('fetchGetUser.pending', () => {
    const action = { type: fetchGetUser.pending.type};
    const state = userReducer(initialState, action);

    expect(state.error).toBeUndefined();
  });
  test('fetchGetUser.fulfilled', () => {
    const mockData = {"success":true,"user":{"email":"anna@yandex.ru","name":"Anya"}};

    const action = { type: fetchGetUser.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toEqual(mockData.user);
    expect(state.isAuthChecked).toBe(true);
  });
  test('fetchGetUser.rejected', () => {
    const action = { type: fetchGetUser.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(true);
  });


  test('fetchRegisterUser.pending', () => {
    const action = { type: fetchRegisterUser.pending.type};
    const state = userReducer(initialState, action);

    expect(state.error).toBeUndefined();
  });
  test('fetchRegisterUser.fulfilled', () => {
    const mockData = {
      "user": {
          "email": "filya@email.com",
          "name": "filya"
      },
      "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTE0YTg0ZThlNjFkMDAxY2VjNTIxYyIsImlhdCI6MTc0NTk2MzY1MiwiZXhwIjoxNzQ1OTY0ODUyfQ.kgGwUDkf01ihknMAFv4qjW_I0pLKPCPjpJ7UReLZdhU",
      "refreshToken": "946eedd6ad04a2675ab0462b17ef10166d3be7ea04b67f93039059e2ae2b897f68abeb984885fff0"
  };

    const action = { type: fetchRegisterUser.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toEqual(mockData);
    expect(state.isAuthChecked).toBe(true);
  });
  test('fetchRegisterUser.rejected', () => {
    const action = { type: fetchRegisterUser.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(true);
  });


  test('fetchRegisterUser.pending', () => {
    const action = { type: fetchRegisterUser.pending.type};
    const state = userReducer(initialState, action);

    expect(state.error).toBeUndefined();
  });
  test('fetchRegisterUser.fulfilled', () => {
    const mockData = {
          "email": "filya@email.com",
          "name": "filya"
    };

    const action = { type: fetchRegisterUser.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toEqual(mockData);
    expect(state.isAuthChecked).toBe(true);
  });
  test('fetchRegisterUser.rejected', () => {
    const action = { type: fetchRegisterUser.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
    expect(state.isAuthChecked).toBe(true);
  });


  test('fetchUpdateUser.fulfilled', () => {
    const mockData = {"success":true,"user":{"email":"filya@email.com","name":"filyaТheBest"}}

    const action = { type: fetchUpdateUser.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toEqual(mockData.user);
  });
  test('fetchUpdateUser.rejected', () => {
    const action = { type: fetchUpdateUser.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
  });


  test('logout.pending', () => {
    const action = { type: logout.pending.type};
    const state = userReducer(initialState, action);

    expect(state.error).toBeUndefined();
  });
  test('logout.fulfilled', () => {
    const mockData = {"success":true,"message":"Successful logout"};

    const action = { type: logout.fulfilled.type, payload: mockData};
    const state = userReducer(initialState, action);

    expect(state.data).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
  test('logout.rejected', () => {
    const action = { type: logout.rejected.type, error: {message: 'error'}};
    const state = userReducer(initialState, action);

    expect(state.error).toBe('error');
  });
});
