import { expect, test, describe } from '@jest/globals';
import feedReducer, { fetchGetFeeds, fetchGetOrderByNumber, initialState } from '../feedSlice';


describe('[feedSlice] проверка асинхронных экшенов', () => {
  test('fetchGetFeeds.pending', () => {
    const action = { type: fetchGetFeeds.pending.type};
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
  });
  test('fetchGetFeeds.fulfilled', () => {
    const mockData = {
      "orders": [
          {
              "_id": "6810f86de8e61d001cec5159",
              "ingredients": [
                  "643d69a5c3f7b9001cfa0941",
                  "643d69a5c3f7b9001cfa093e",
                  "643d69a5c3f7b9001cfa093d",
                  "643d69a5c3f7b9001cfa093d"
              ],
              "status": "done",
              "name": "Флюоресцентный люминесцентный био-марсианский бургер",
              "createdAt": "2025-04-29T16:03:57.120Z",
              "updatedAt": "2025-04-29T16:03:57.802Z",
              "number": 75876
          },
          {
              "_id": "6810f814e8e61d001cec5156",
              "ingredients": [
                  "643d69a5c3f7b9001cfa0941",
                  "643d69a5c3f7b9001cfa093e",
                  "643d69a5c3f7b9001cfa093d",
                  "643d69a5c3f7b9001cfa093d"
              ],
              "status": "done",
              "name": "Флюоресцентный люминесцентный био-марсианский бургер",
              "createdAt": "2025-04-29T16:02:28.273Z",
              "updatedAt": "2025-04-29T16:02:28.960Z",
              "number": 75875
          },
      ],
      "total": 75502,
      "totalToday": 94
  };
    const action = { type: fetchGetFeeds.fulfilled.type, payload: mockData};
    const state = feedReducer(initialState, action);

    expect(state.orders).toEqual(mockData.orders);
    expect(state.total).toEqual(mockData.total);
    expect(state.totalToday).toEqual(mockData.totalToday);
    expect(state.loading).toBe(false);


  });
  test('fetchGetFeeds.rejected', () => {
    const action = { type: fetchGetFeeds.rejected.type, error: {message: 'Error'}};
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });


  test('fetchGetOrderByNumber.pending', () => {
    const action = { type: fetchGetOrderByNumber.pending.type};
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
  });
  test('fetchGetOrderByNumber.fulfilled', () => {
    const mockData = {
      orders: [
        {
            "_id": "6811374ae8e61d001cec51e2",
            "ingredients": [
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093c"
            ],
            "owner": "681132a8e8e61d001cec51d7",
            "status": "done",
            "name": "Краторный space бургер",
            "createdAt": "2025-04-29T20:32:10.837Z",
            "updatedAt": "2025-04-29T20:32:11.549Z",
            "number": 75893,
            "__v": 0
        }
      ]
    }

    const action = { type: fetchGetOrderByNumber.fulfilled.type, payload: mockData};
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.selectedOrder).toEqual(mockData.orders[0]);
  });

  test('fetchGetOrderByNumber.rejected', () => {
    const action = { type: fetchGetOrderByNumber.rejected.type, error: {message: 'Error'}};

    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
