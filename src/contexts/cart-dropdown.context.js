import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  itemsList: [],
  setItemsList: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const value = {isCartOpen, setIsCartOpen, itemsList, setItemsList};

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
};