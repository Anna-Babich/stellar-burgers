import { expect, test, describe } from '@jest/globals';
import store, { rootReducer } from '../../services/store';
import { initialState as constructorState } from '../constructorSlice';
import { initialState as burgerState } from '../burgerSlice';
import { initialState as orderState } from '../orderSlice';
import { initialState as userState } from '../userSlice';
import { initialState as feedState } from '../feedSlice';
import { initialState as profileOrderState } from '../profileOrderSlice';

describe('[rootReducer] проверка правильной инициализации ', () => {
  test('возвращает корректное начальное состояние хранилища', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);

    expect(newState).toEqual(store.getState());
    expect(newState.burgerConstructor).toEqual(constructorState);
    expect(newState.ingredients).toEqual(burgerState);
    expect(newState.newOrder).toEqual(orderState);
    expect(newState.user).toEqual(userState);
    expect(newState.feed).toEqual(feedState);
    expect(newState.profileOrders).toEqual(profileOrderState);
  });
});
