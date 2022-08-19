import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCounter: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const cartIconCounter = (cartItems) => {
      return setCartCounter(
        cartItems.reduce((counter, currEl) => {
          return counter + currEl.quantity;
        }, 0)
      );
    };

    cartIconCounter(cartItems);
  }, [cartItems])

  useEffect(() => {
    const itemsTotalPrice = (cartItems) => {
      const itemPriceCalculated = cartItems.reduce((priceAccum, item) => {
        return item.price * item.quantity + priceAccum;
      }, 0);
      
      return itemPriceCalculated;
    };

    setCartTotalPrice(itemsTotalPrice(cartItems));
  }, [cartItems])



  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    setCartItems,
    cartCounter,
    cartTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};