import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-dropdown.context';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCounter } = useContext(CartContext)

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount>{cartCounter}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;