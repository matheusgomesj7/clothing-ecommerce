import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

const Shop = () => {
  const { productsData } = useContext(ProductsContext);

  return (
    <div className='products-container'>
      {productsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
};

export default Shop;