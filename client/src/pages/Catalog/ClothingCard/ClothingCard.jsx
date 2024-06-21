import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { sexOptions } from 'constants/sexOptions';

export default function ClothingCard({ clothing: { id, image_url, name, size, sex, price } }) {
  const { push } = useHistory();
  const savedCart = JSON.parse(localStorage.getItem('cart'));
  const isClothingInCart = savedCart ? savedCart.some((clothing) => clothing.id === id) : false;

  return (
    <div className='card' onClick={() => push(`/clothing/${id}`)}>
      <img className={cn({ passive: isClothingInCart })} src={image_url} alt='coat' />
      {isClothingInCart && <p className='in-cart-label'>У корзині</p>}
      <div className='name'>{name}</div>
      <div className='size'>{size}</div>
      <div className='sex'>{sexOptions.find(({ key }) => key === sex).name}</div>
      <div className='price'>${price}</div>
    </div>
  );
}
