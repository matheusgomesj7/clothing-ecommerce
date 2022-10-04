import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

// product to remove was of type CartItem before *fixme
const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] => {
  const currentCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToRemove.id
  });

  if (currentCartItem && currentCartItem.quantity > 1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    });
  };

  return cartItems.filter((el) => {return el !== currentCartItem})
}

//this function's return type was of CartItem[] before *fixme
const clearCartItem = (cartItems: CartItem[], productToClear: CartItem) => {
  const currentCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToClear.id
  });

  return cartItems.filter((el) => {return el !== currentCartItem})
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

//this function's return type was of SetIsCartOpen before *fixme
export const setIsCartOpen = withMatcher((bool: boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
});

//this function's return type was of SetCartItems before *fixme
export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    cartItems
  )
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return setCartItems(newCartItems);
};