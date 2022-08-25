import {
  createContext,
  useReducer
} from "react";
import { createAction } from '../utils/reducer/reducer.utils'

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCounter: 0,
  cartTotalPrice: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
 };

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCounter: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCounter, cartTotalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
  const updateCartItemsReducer = (cartItems) => {
    const newCartCounter = cartItems.reduce(
      (counter, currEl) => counter + currEl.quantity, 0
    );
    const newCartTotalPrice = cartItems.reduce(
      (accum, item) => accum + item.quantity * item.price, 0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
        { 
          cartItems,
          cartCounter: newCartCounter,
          cartTotalPrice: newCartTotalPrice
        }
      ));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCounter,
    cartTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};