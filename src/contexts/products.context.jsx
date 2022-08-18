import { createContext, useState } from "react";
import PRODUCTS_DATA from '../data/shop-data.json';

export const ProductsContext = createContext({
  productsData: [],
});

export const ProductsProvider = ({ children }) => {
  const [productsData, setProductsData] = useState(PRODUCTS_DATA);
  const value = { productsData, setProductsData };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}