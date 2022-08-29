import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id
  });

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    });
  };

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const currentCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id
  });

  if (currentCartItem.quantity > 1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    });
  };

  return cartItems.filter((el) => {return el !== currentCartItem})
}

const clearCartItem = (cartItems, productToClear) => {
  const currentCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToClear.id
  });

  return cartItems.filter((el) => {return el !== currentCartItem})
};

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};