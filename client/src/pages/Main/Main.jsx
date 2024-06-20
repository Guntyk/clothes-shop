import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as clothesSlice from '../../redux/features/clothesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../../components/Filters/Filters';
import './Main.css';

export default function Main() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const isClothesRequestLoading = useSelector((state) => state.clothes.isLoading);
  const clothesRequestError = useSelector((state) => state.clothes.error);
  const clothes = useSelector((state) => state.clothes.clothes);

  const [filters, setFilters] = useState({
    types: [],
    genders: [],
    sizes: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const matchesFilters = (item) => {
    const { types, genders, sizes } = filters;

    const matchesType = types.length === 0 || types.includes(item.type);
    const matchesGender = genders.length === 0 || genders.includes(item.sex);
    const matchesSize = sizes.length === 0 || sizes.includes(item.size);

    return matchesType && matchesGender && matchesSize;
  };

  const toggleFiltersModal = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  useEffect(() => {
    if (clothes.length) {
      setFilteredData(clothes.filter(matchesFilters));
    }
  }, [clothes, filters]);

  useEffect(() => {
    if (clothes.length <= 1) {
      dispatch(clothesSlice.getClothes());
    }
  }, []);

  return (
    <article className='page'>
      <div className='main-page-header'>
        <h2 className='title'>Знайди свій стиль</h2>
        <div className='buttons-wrapper'>
          <button className='btn' onClick={toggleFiltersModal}>
            Фільтри
          </button>
          <Link className='btn' to='/cart'>
            Корзина
          </Link>
        </div>
      </div>
      <Filters
        filters={filters}
        setFilters={setFilters}
        isOpen={isFiltersModalOpen}
        setIsOpen={setIsFiltersModalOpen}
      />
      <div className='clothes-wrapper'>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className='card' onClick={() => push(`/clothing/${item.id}`)} key={item.id}>
              <img src={item.image_url} alt='coat' />
              <div className='name'>{item.name}</div>
              <div className='size'>{item.size}</div>
              <div className='sex'>{item.sex}</div>
              <div className='price'>${item.price.split('.')[0]}</div>
            </div>
          ))
        ) : isClothesRequestLoading ? (
          <p className='no-results'>Завантаження</p>
        ) : (
          <p className='no-results'>Нічого не знайдено</p>
        )}
      </div>
    </article>
  );
}
