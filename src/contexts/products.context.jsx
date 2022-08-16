import { createContext, useState } from "react";
import PRODUCTS_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  productsData: PRODUCTS_DATA,
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