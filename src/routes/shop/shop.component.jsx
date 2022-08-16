import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

const Shop = () => {
  const { productsData } = useContext(ProductsContext);

  return (
    <div>
      {productsData.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
};

export default Shop;