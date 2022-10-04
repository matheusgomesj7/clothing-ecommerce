import { createSelector } from "reselect";
import { RootState } from '../store'
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: RootState): CartState => state.cart;

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
  (cartItems): number => cartItems.reduce(
    (counter, currEl) => counter + currEl.quantity, 0
  )
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems): number => cartItems.reduce(
    (accum, item) => accum + item.quantity * item.price, 0
  )
);