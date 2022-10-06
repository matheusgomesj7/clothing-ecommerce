import { memo } from 'react';
import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

const CartItem = memo(({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name}/>
      <ItemDetails>
        <Name>{name}</Name>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  )
});

export default CartItem;