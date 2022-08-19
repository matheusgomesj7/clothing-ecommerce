import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-dropdown.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
  
  const addingItemToCart = () => addItemToCart(cartItem);

  const removingItemFromCart = () => removeItemFromCart(cartItem);

  const clearingItemFromCart = () => clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div
          className='arrow'
          onClick={removingItemFromCart}
        >
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div
          className='arrow'
          onClick={addingItemToCart}
        >
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div
        className='remove-button'
        onClick={clearingItemFromCart}
      >
        &#10005;
      </div>
    </div>
  )
};

export default CheckoutItem;