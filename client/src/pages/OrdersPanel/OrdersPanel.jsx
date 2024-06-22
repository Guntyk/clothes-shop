import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as clothesSlice from '../../redux/features/clothesSlice';
import * as ordersSlice from '../../redux/features/ordersSlice';
import './OrdersPanel.css';

export default function OrdersPanel() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const isOrdersRequestLoading = useSelector((state) => state.orders.isLoading);
  const ordersRequestError = useSelector((state) => state.orders.error);
  const orders = useSelector((state) => state.orders.orders);

  const isClothesRequestLoading = useSelector((state) => state.clothes.isLoading);
  const clothesRequestError = useSelector((state) => state.clothes.error);
  const clothes = useSelector((state) => state.clothes.clothes);

  useEffect(() => {
    dispatch(ordersSlice.getOrders());

    if (!clothes.length) {
      dispatch(clothesSlice.getClothes());
    }
  }, []);

  const handleDeleteOrder = (id) => {
    dispatch(ordersSlice.deleteOrder(id));
  };

  return (
    <div className='orders'>
      {user?.role === 'admin' || user?.role === 'superadmin' ? (
        <>
          <h1 className='title'>Панель замовлень</h1>
          <ul className='orders-list'>
            {orders.length > 0 ? (
              orders.map(({ id, name, phone, price, products }) => (
                <li className='order-card' key={id}>
                  <div className='order-header'>
                    <span className='order-id'>#{id}</span>
                    <span className='order-price'>{price}₴</span>
                  </div>
                  <table className='order-table'>
                    <tbody>
                      <tr>
                        <th>Імʼя:</th>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <th>Телефон:</th>
                        <td>{phone}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>Замовлення:</p>
                  <ul className='order-products'>
                    {clothes
                      .filter((clothing) => products.map(({ id }) => id).includes(clothing.id))
                      .map(({ id, image_url, name }) => {
                        const productInOrder = products.find((product) => product.id === id);
                        return (
                          <li className='order-product-card' onClick={() => push(`/clothing/${id}`)} key={id}>
                            <img src={image_url} alt={name} />
                            {productInOrder.amount > 1 && (
                              <span className='order-product-amount'>{productInOrder.amount}</span>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                  <button className='btn' onClick={() => handleDeleteOrder(id)}>
                    Видалити
                  </button>
                </li>
              ))
            ) : isOrdersRequestLoading ? (
              <span>Завантаження...</span>
            ) : (
              <div className='empty-cart-wrapper'>
                <span>Замовлення відсутні</span>
              </div>
            )}
          </ul>
        </>
      ) : (
        <h1 className='title'>У вас немає доступу до цієї сторінки</h1>
      )}
    </div>
  );
}
