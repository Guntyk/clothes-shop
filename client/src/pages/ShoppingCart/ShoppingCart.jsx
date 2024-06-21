import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import useShoppingCart from 'hooks/useShoppingCart';
import { Link } from 'react-router-dom';
import OrdersService from 'services/OrdersService';
import { sexOptions } from 'constants/sexOptions';
import caretRight from 'icons/caret-right.svg';
import caretLeft from 'icons/caret-left.svg';
import cross from 'icons/cross.svg';
import './ShoppingCart.css';

export default function ShoppingCart() {
  const { removeFromCart } = useShoppingCart();
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState(0);

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

  const handleResetOrder = () => {
    setOrder([]);
    localStorage.removeItem('cart');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isFormValid = true;

    if (!name.trim()) {
      setNameError(true);
      isFormValid = false;
    } else {
      setNameError(false);
    }

    const phonePattern = /^\+?3?8?(0\d{9})$/;
    if (!phonePattern.test(phone)) {
      setPhoneError(true);
      isFormValid = false;
    } else {
      setPhoneError(false);
    }

    if (isFormValid) {
      const formedOrder = {
        name,
        phone,
        order: order.map(({ id, amount }) => ({ id, amount })),
        price: getTotalPrice(),
      };

      const result = await createNewOrder(formedOrder);

      if (result) {
        setName('');
        setPhone('');
        handleResetOrder();
        setCompletedOrderId(result);
      }
    }
  };

  const createNewOrder = async (order) => {
    const { result, error } = await OrdersService.createOrder(order);

    return result;
  };

  return (
    <article className='shopping-cart-page'>
      <div className='order'>
        {order.length > 0 ? (
          order.map((item) => (
            <React.Fragment key={item.id}>
              <section className='clothing-detail'>
                <div className='img-wrapper'>
                  <img src={item.image_url} alt={item.name} className='clothing-image' />
                </div>
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
                        Категорія: <span className='sex'>{sexOptions.find(({ key }) => key === item.sex).name}</span>
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
                    <span className='price'>{item.price * item.amount}₴</span>
                  </div>
                </div>
              </section>
              <hr className='line' />
            </React.Fragment>
          ))
        ) : (
          <div className='empty-cart-wrapper'>
            <span>Корзина пуста</span>
            <Link to='/' className='btn'>
              До каталогу
            </Link>
          </div>
        )}
      </div>
      <div className='buy-wrapper'>
        <form onSubmit={handleSubmit}>
          <h2 className='title'>Оформити замовлення</h2>
          <div className='inputs-wrapper'>
            <input
              type='text'
              placeholder='Імʼя'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn({ 'input-error': nameError })}
            />
            {nameError && <span className='error-message'>Обов'язкове поле</span>}
            <input
              type='tel'
              inputMode='numeric'
              placeholder='Номер телефону'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={cn('last-input', { 'input-error': phoneError })}
            />
            {phoneError && <span className='error-message'>Обов'язкове поле</span>}
          </div>
          <span className='total-price'>Сума: {getTotalPrice()}₴</span>
          <button className={cn('btn', 'buy-btn', { active: order.length > 0 })} type='submit'>
            Замовити
          </button>
        </form>
        {completedOrderId > 0 && (
          <div className='completed-order'>
            <span>Замовлення прийнято</span>
            <span>
              Номер замовлення: <b>#{completedOrderId}</b>
            </span>
          </div>
        )}
        {order.length > 0 && (
          <button className='btn' onClick={handleResetOrder}>
            Очистити корзину
          </button>
        )}
      </div>
    </article>
  );
}
