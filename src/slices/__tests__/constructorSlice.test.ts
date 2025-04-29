import constructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient
} from '../constructorSlice';

import { expect, test, describe } from '@jest/globals';

describe('[constructorSlice] тесты синхронных экшенов', () => {
  const mockIngredients = {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    ingredients: [
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        id: '2',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ]
  };

  test('добавляем ингредиент', () => {
    const newIngredient = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    };

    const state = { ...initialState };

    const action = addIngredient(newIngredient);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients[0].name).toBe('Соус Spicy-X');
    expect(newState.bun).toBeNull();
  });

  test('добавляем булку', () => {
    const newBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    const state = { ...initialState };

    const action = addIngredient(newBun);
    const newState = constructorReducer(state, action);

    expect(newState.bun?.name).toBe('Краторная булка N-200i');
    expect(newState.ingredients).toEqual([]);
  });

  test('экшен удаления ингредиента', () => {
    const state = { ...mockIngredients };

    const action = removeIngredient(0);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]._id).toBe('643d69a5c3f7b9001cfa0941');
  });

  test('экшен перемещения ингредиента вниз', () => {
    const state = { ...mockIngredients };

    const action = moveDownIngredient(0);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
    expect(newState.ingredients[1].name).toBe(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  test('экшен перемещения ингредиента вверх', () => {
    const state = { ...mockIngredients };

    const action = moveUpIngredient(1);
    const newState = constructorReducer(state, action);

    expect(newState.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
    expect(newState.ingredients[1].name).toBe(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });
});
