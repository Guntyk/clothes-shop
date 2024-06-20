import cn from 'classnames';
import { useEffect, useState } from 'react';
import useShoppingCart from 'hooks/useShoppingCart';
import caretRight from 'icons/caret-right.svg';
import caretLeft from 'icons/caret-left.svg';
import cross from 'icons/cross.svg';
import './ShoppingCart.css';

export default function ShoppingCart() {
  const { removeFromCart } = useShoppingCart();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setOrder(savedCart);
    }
  }, []);

  const saveToLocalStorage = (updatedOrder) => localStorage.setItem('cart', JSON.stringify(updatedOrder));

  const getTotalPrice = () => {
    let totalPrice = 0;

    order.forEach((item) => {
      totalPrice += item.price * item.amount;
    });

    return totalPrice;
  };

  const handleRemoveClothing = (clothingId) => {
    removeFromCart(clothingId);
    setOrder(order.filter(({ id }) => id !== clothingId));
  };

  const handleDecreaseAmount = (itemId) => {
    const updatedOrder = order.map((item) => {
      if (item.id === itemId && item.amount > 1) {
        return {
          ...item,
          amount: item.amount - 1,
        };
      }
      return item;
    });
    setOrder(updatedOrder);
    saveToLocalStorage(updatedOrder);
  };

  const handleIncreaseAmount = (itemId) => {
    const updatedOrder = order.map((item) => {
      if (item.id === itemId && item.amount < 10) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });
    setOrder(updatedOrder);
    saveToLocalStorage(updatedOrder);
  };

  return (
    <article className='shopping-cart-page'>
      <div className='order'>
        {order.length > 0
          ? order.map((item) => (
              <div key={item.id}>
                <section className='clothing-detail'>
                  <img src={item.image_url} alt={item.name} className='clothing-image' />
                  <div className='wrapper'>
                    <div className='details'>
                      <div className='item-header'>
                        <h2 className='name'>{item.name}</h2>
                        <button className='remove-item-btn' onClick={() => handleRemoveClothing(item.id)}>
                          <img src={cross} alt='cross' />
                        </button>
                      </div>
                      <div className='characteristics'>
                        <p>
                          Категорія: <span className='sex'>{item.sex}</span>
                        </p>
                        <p>
                          Розмір: <span className='size'>{item.size}</span>
                        </p>
                      </div>
                    </div>
                    <div className='item-footer'>
                      <div className='amount'>
                        <span className='amount'>Кількість:</span>
                        <div className='amount-buttons'>
                          <button
                            className={cn('amount-btn', { active: item.amount > 1 })}
                            onClick={() => handleDecreaseAmount(item.id)}
                          >
                            <img src={caretLeft} alt='caret left' />
                          </button>
                          <span>{item.amount}</span>
                          <button
                            className={cn('amount-btn', { active: item.amount < 10 })}
                            onClick={() => handleIncreaseAmount(item.id)}
                          >
                            <img src={caretRight} alt='caret right' />
                          </button>
                        </div>
                      </div>
                      <span className='price'>${item.price * item.amount}</span>
                    </div>
                  </div>
                </section>
                <hr className='line' />
              </div>
            ))
          : 'Корзина пуста'}
      </div>
      <form className='buy-wrapper'>
        <h2 className='title'>Оформити замовлення</h2>
        <div className='inputs-wrapper'>
          <input type='text' placeholder='Імʼя' required />
          <input type='tel' inputMode='numeric' placeholder='Номер телефону' required />
        </div>
        <span className='total-price'>Сума: ${getTotalPrice()}</span>
        <button className='btn'>Замовити</button>
      </form>
    </article>
  );
}
