import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useShoppingCart from 'hooks/useShoppingCart';
import * as clothesSlice from '../../redux/features/clothesSlice';
import { sexOptions } from 'constants/sexOptions';
import arrowLeft from 'icons/arrow-left.svg';
import './ClothingDetail.css';

export default function ClothingDetail() {
  const isClothesRequestLoading = useSelector((state) => state.clothes.isLoading);
  const clothesRequestError = useSelector((state) => state.clothes.error);
  const clothes = useSelector((state) => state.clothes.clothes);

  const [currentClothing, setCurrentClothing] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { cartItems, addToCart, removeFromCart } = useShoppingCart();
  const [isProductInCart, setIsProductInCart] = useState(cartItems.some((cartItem) => cartItem.id === Number(id)));

  useEffect(() => {
    if (clothes.length) {
      setCurrentClothing(clothes.find((item) => item.id === Number(id)));
    }
  }, [clothes]);

  useEffect(() => {
    if (clothes.length <= 1) {
      dispatch(clothesSlice.getClothes());
    }
  }, []);

  const handleCartChange = () => {
    if (isProductInCart) {
      removeFromCart(id);
      setIsProductInCart(false);
    } else {
      addToCart(currentClothing);
      setIsProductInCart(true);
    }
  };

  return (
    <article className='cloth-wrapper'>
      <Link to='/' className='home-btn'>
        <img src={arrowLeft} alt='arrow left' />
        До каталогу
      </Link>
      <section className='clothing-detail'>
        {currentClothing ? (
          <>
            <img src={currentClothing.image_url} alt={currentClothing.name} className='clothing-image' />
            <div className='wrapper'>
              <div className='details'>
                <h2 className='name'>{currentClothing.name}</h2>
                <div className='characteristics'>
                  <p>
                    Категорія:{' '}
                    <span className='sex'>{sexOptions.find(({ key }) => key === currentClothing.sex).name}</span>
                  </p>
                  <p>
                    Розмір: <span className='size'>{currentClothing.size}</span>
                  </p>
                </div>
              </div>
              <div className='order-info'>
                <span className='price'>{currentClothing.price}₴</span>
                <button className='cart-btn' onClick={handleCartChange}>
                  {isProductInCart ? 'Видалити з корзини' : 'Додати до корзини'}
                </button>
              </div>
            </div>
          </>
        ) : isClothesRequestLoading ? (
          <span>Завантаження</span>
        ) : (
          <span>Невідома сторінка</span>
        )}
      </section>
    </article>
  );
}
