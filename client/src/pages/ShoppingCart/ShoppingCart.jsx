import useShoppingCart from '../../hooks/useShoppingCart';
import './ShoppingCart.css';

export default function ShoppingCart() {
  const { cartItems } = useShoppingCart();

  return (
    <article className='shopping-cart-page'>
      {cartItems.length > 0 ? cartItems.map(({ name }) => <span>{name}</span>) : 'Корзина пуста'}
    </article>
  );
}
