import { expect, test, describe } from '@jest/globals';
import orderReducer, {fetchNewOrder, initialState} from '../orderSlice';

describe('[orderSlice] проверка асинхронных экшенов', () => {
  test('pending', () => {
    const action = { type: fetchNewOrder.pending.type};
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
  });

  test('fulfilled', () => {
    const mockData = {
      "name": "Флюоресцентный бургер",
      "order": {
          "ingredients": [
              {
                  "_id": "643d69a5c3f7b9001cfa093d",
                  "name": "Флюоресцентная булка R2-D3",
                  "type": "bun",
                  "proteins": 44,
                  "fat": 26,
                  "carbohydrates": 85,
                  "calories": 643,
                  "price": 988,
                  "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                  "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                  "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                  "__v": 0
              }
          ],
          "_id": "681141bfe8e61d001cec51fa",
          "owner": {
              "name": "Anya",
              "email": "anna@yandex.ru",
              "createdAt": "2025-04-19T20:58:37.630Z",
              "updatedAt": "2025-04-19T21:40:31.055Z"
          },
          "status": "done",
          "name": "Флюоресцентный бургер",
          "createdAt": "2025-04-29T21:16:47.264Z",
          "updatedAt": "2025-04-29T21:16:47.969Z",
          "number": 75894,
          "price": 988
      }
    };

    const action = { type: fetchNewOrder.fulfilled.type, payload: mockData};
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockData.order);
  });

  test('rejected', () => {
    const action = { type: fetchNewOrder.rejected.type, payload: 'error'};
    const state = orderReducer(initialState, action);

    expect(state.error).toBe('error');
  });
});
