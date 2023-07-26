import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      let newBasket = [...state.items];

      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant Remove product (id: ${action.payload.id}) as its not basket`
        );
      }

      state.items = newBasket;
    },
    removeAll: (state, action) => {
      const id = action.payload.id;

      let newBasket = [];

      for (const item of state.items) {
        if (item.id !== id) {
          newBasket.push(item);
        }
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, removeAll } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

// export const selectBasketItemWithId = (state, id) =>
// state.basket.items.filter((item) => item.id == id);

// NOTE: To solve the warning, Memoization allows you to cache the result of a selector based on its input parameters
// Used to show the number of orders on a specific dish
export const selectBasketItemWithId = createSelector(
  (state) => state.basket.items,
  (_, id) => id,
  (items, id) => items.filter((item) => item.id === id)
);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
