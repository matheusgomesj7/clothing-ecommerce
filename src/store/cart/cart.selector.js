import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCounter = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (counter, currEl) => counter + currEl.quantity, 0
  )
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (accum, item) => accum + item.quantity * item.price, 0
  )
);