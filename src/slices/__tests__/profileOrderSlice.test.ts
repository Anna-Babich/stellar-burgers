import { expect, test, describe } from '@jest/globals';
import profileOrderReducer, {initialState, fetchGetOrders} from '../profileOrderSlice';

describe('[profileOrderSlice] проверка асинхронных экшенов', () => {
  test('pending', () => {
    const action = { type: fetchGetOrders.pending.type};
    const state = profileOrderReducer(initialState, action);

    expect(state.loading).toBe(true);
  });
  test('fulfilled', () => {
    const mockData = [
          {
              "_id": "680feebbe8e61d001cec5037",
              "ingredients": [
                  "643d69a5c3f7b9001cfa093d"
              ],
              "status": "done",
              "name": "Флюоресцентный бургер",
              "createdAt": "2025-04-28T21:10:19.893Z",
              "updatedAt": "2025-04-28T21:10:20.639Z",
              "number": 75802
          },
          {
              "_id": "681141bfe8e61d001cec51fa",
              "ingredients": [
                  "643d69a5c3f7b9001cfa093d"
              ],
              "status": "done",
              "name": "Флюоресцентный бургер",
              "createdAt": "2025-04-29T21:16:47.264Z",
              "updatedAt": "2025-04-29T21:16:47.969Z",
              "number": 75894
          }
      ];
     

    const action = { type: fetchGetOrders.fulfilled.type, payload: mockData};
    const state = profileOrderReducer(initialState, action);

    expect(state.orders).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  test('rejected', () => {
    const action = { type: fetchGetOrders.rejected.type, error: {message: 'error'}};
    const state = profileOrderReducer(initialState, action);

    expect(state.error).toBe('error');
  });
});
