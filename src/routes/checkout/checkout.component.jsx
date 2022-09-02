import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartTotalPrice);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      <section>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </section>
      <Total>
        Total: ${cartTotalPrice}
      </Total>
      <PaymentForm />
      <h3>For payment test, use:</h3>
      <h3>Card number: 4242 4242 4242 4242</h3>
      <h3>MM/AA: 01/30 CVC: 000 CEP: 00000</h3>
    </CheckoutContainer>
  )
};

export default Checkout;