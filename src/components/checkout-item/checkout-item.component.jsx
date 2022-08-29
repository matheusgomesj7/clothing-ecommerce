import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action.js';
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Arrow,
  Value,
  Price,
  RemoveButton
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;

  const cartItems = useSelector(selectCartItems)

  const dispatch = useDispatch()
;
  const addingItemToCart = () => dispatch(addItemToCart(cartItems, cartItem));

  const removingItemFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

  const clearingItemFromCart = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow
          onClick={removingItemFromCart}
        >
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow
          onClick={addingItemToCart}
        >
          &#10095;
        </Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton
        onClick={clearingItemFromCart}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;