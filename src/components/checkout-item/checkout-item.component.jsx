import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-dropdown.context';
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
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)

  const addingItemToCart = () => addItemToCart(cartItem);

  const removingItemFromCart = () => removeItemFromCart(cartItem);

  const clearingItemFromCart = () => clearItemFromCart(cartItem);

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