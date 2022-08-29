import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCounter } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCounter = useSelector(selectCartCounter);

  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));
  
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount>{cartCounter}</ItemCount>
    </CartIconContainer>
  )
};

export default CartIcon;