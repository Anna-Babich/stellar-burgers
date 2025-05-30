import { expect, test, describe } from '@jest/globals';
import burgerReducer, { fetchIngredients, initialState } from '../burgerSlice';

describe('[burgerSlice] проверка асинхронных экшенов', () => {
  test('pending', () => {
    const action = { type: fetchIngredients.pending.type};
    const state = burgerReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test('fulfilled', () => {
    const mockData = [
            {
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            },
            {
                "_id": "643d69a5c3f7b9001cfa093e",
                "name": "Филе Люминесцентного тетраодонтимформа",
                "type": "main",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "price": 988,
                "image": "https://code.s3.yandex.net/react/code/meat-03.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
                "__v": 0
            }
        ];

    const action = {type: fetchIngredients.fulfilled.type, payload: mockData};
    const state = burgerReducer(initialState, action);

    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  test('rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: {message: 'Error'}};
    const state = burgerReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error?.message).toBe('Error');
  });
});
