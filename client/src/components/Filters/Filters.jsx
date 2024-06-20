import cn from 'classnames';
import './Filters.css';
import cross from '../../icons/cross.svg';

export default function Filters({ filters, setFilters, isOpen, setIsOpen }) {
  const types = [
    { key: 'hoodie', name: 'Худі' },
    { key: 'coat', name: 'Кофти' },
    { key: 't-shirt', name: 'Футболки' },
    { key: 'pants', name: 'Штани' },
  ];
  const genders = [
    { key: 'unisex', name: 'Унісекс' },
    { key: 'male', name: 'Чоловіче' },
    { key: 'female', name: 'Жіноче' },
  ];
  const sizes = [
    { key: 'xs', name: 'XS' },
    { key: 's', name: 'S' },
    { key: 'm', name: 'M' },
    { key: 'l', name: 'L' },
    { key: 'xl', name: 'XL' },
    { key: 'xxl', name: 'XXL' },
  ];

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
      genders: [],
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
        {[types, genders, sizes].map((filtersType, index) => (
          <div key={index}>
            <ul className='filters-list'>
              {filtersType.map((filter, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type='checkbox'
                      checked={filters[
                        filtersType === types ? 'types' : filtersType === genders ? 'genders' : 'sizes'
                      ].includes(filter.key)}
                      onChange={() =>
                        handleCheckboxChange(
                          filtersType === types ? 'types' : filtersType === genders ? 'genders' : 'sizes',
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
