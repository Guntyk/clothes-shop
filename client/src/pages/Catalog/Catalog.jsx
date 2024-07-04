import { useEffect, useState } from 'react';
import * as clothesSlice from '../../redux/features/clothesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Filters from 'components/Filters/Filters';
import ClothingCard from './ClothingCard/ClothingCard';
import './Catalog.css';

export default function Catalog() {
  const dispatch = useDispatch();

  const isClothesRequestLoading = useSelector((state) => state.clothes.isLoading);
  const clothesRequestError = useSelector((state) => state.clothes.error);
  const clothes = useSelector((state) => state.clothes.clothes);

  const [filters, setFilters] = useState(
    JSON.parse(window.sessionStorage.getItem('filters')) || {
      types: [],
      sexOptions: [],
      sizes: [],
    }
  );
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const matchesFilters = (item) => {
    const { types, sexOptions, sizes } = filters;

    const matchesType = types.length === 0 || types.includes(item.type);
    const matchesSex = sexOptions.length === 0 || sexOptions.includes(item.sex);
    const matchesSize = sizes.length === 0 || sizes.includes(item.size);

    return matchesType && matchesSex && matchesSize;
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
    window.sessionStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    if (clothes.length <= 1) {
      dispatch(clothesSlice.getClothes());
    }
  }, []);

  return (
    <article className='page'>
      <div className='main-page-header'>
        <h2 className='title'>Знайди свій стиль</h2>
        <button className='btn' onClick={toggleFiltersModal}>
          Фільтри
        </button>
      </div>
      <Filters
        clothes={clothes}
        filters={filters}
        setFilters={setFilters}
        isOpen={isFiltersModalOpen}
        setIsOpen={setIsFiltersModalOpen}
      />
      <div className='clothes-view'>
        <div className='clothes-wrapper'>
          {filteredData.length > 0 ? (
            filteredData.map((item) => <ClothingCard clothing={item} key={item.id} />)
          ) : isClothesRequestLoading ? (
            <p className='no-results'>Завантаження</p>
          ) : (
            <p className='no-results'>Нічого не знайдено</p>
          )}
        </div>
      </div>
    </article>
  );
}
