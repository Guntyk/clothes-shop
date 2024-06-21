import cn from 'classnames';
import { sexOptions } from 'constants/sexOptions';
import cross from 'icons/cross.svg';
import './Filters.css';

export default function Filters({ clothes, filters, setFilters, isOpen, setIsOpen }) {
  const types = Array.from(new Set(clothes.map(({ type }) => type)))
    .sort()
    .map((type) => ({
      key: type,
      name: type.charAt(0).toUpperCase() + type.slice(1),
    }));

  const sizes = [
    { key: 'xxs', name: 'XXS' },
    { key: 'xs', name: 'XS' },
    { key: 's', name: 'S' },
    { key: 'm', name: 'M' },
    { key: 'l', name: 'L' },
    { key: 'xl', name: 'XL' },
    { key: 'xxl', name: 'XXL' },
    { key: '3xl', name: '3XL' },
    { key: '4xl', name: '4XL' },
  ];

  const availableSizes = Array.from(new Set(clothes.map(({ size }) => size))).map((size) => ({
    key: size,
    name: size.toUpperCase(),
  }));

  const handleCheckboxChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      types: [],
      sexOptions: [],
      sizes: [],
    });
  };

  const activeFiltersCount = Object.values(filters)
    .flat()
    .filter((filter) => filter !== '').length;

  return (
    <div className={cn('overflow', { opened: isOpen })}>
      <section className='filters'>
        <div className='filters-header'>
          <span className='title'>Фільтри</span>
          <button className='close-btn' onClick={() => setIsOpen(false)}>
            <img src={cross} alt='cross' />
          </button>
        </div>
        <hr className='line' />
        {[types, sexOptions, sizes].map((filtersType, index) => (
          <div key={index}>
            <ul className='filters-list'>
              {filtersType.map((filter, idx) => (
                <li key={idx}>
                  <label
                    className={cn({
                      passive:
                        filtersType === sizes &&
                        !availableSizes.some((availableSize) => availableSize.key === filter.key),
                    })}
                  >
                    <input
                      type='checkbox'
                      checked={filters[
                        filtersType === types ? 'types' : filtersType === sexOptions ? 'sexOptions' : 'sizes'
                      ].includes(filter.key)}
                      onChange={() =>
                        handleCheckboxChange(
                          filtersType === types ? 'types' : filtersType === sexOptions ? 'sexOptions' : 'sizes',
                          filter.key
                        )
                      }
                    />
                    {filter.name}
                  </label>
                </li>
              ))}
            </ul>
            <hr className='line' />
          </div>
        ))}
        {activeFiltersCount > 0 && (
          <button className='reset-filters-btn' onClick={handleResetFilters}>
            Скинути фільтри
          </button>
        )}
      </section>
    </div>
  );
}
