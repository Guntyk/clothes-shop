import cn from 'classnames';
import { useHistory } from 'react-router-dom';

export default function ClothingCard({ clothing: { id, image_url, name, size, sex, price } }) {
  const { push } = useHistory();
  const isClothingInCart = JSON.parse(localStorage.getItem('cart')).some((clothing) => clothing.id === id);

  return (
    <div className='card' onClick={() => push(`/clothing/${id}`)}>
      <img className={cn({ passive: isClothingInCart })} src={image_url} alt='coat' />
      {isClothingInCart && <p className='in-cart-label'>У корзині</p>}
      <div className='name'>{name}</div>
      <div className='size'>{size}</div>
      <div className='sex'>{sex}</div>
      <div className='price'>${price}</div>
    </div>
  );
}
