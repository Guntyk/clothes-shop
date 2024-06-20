import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/IMG_1631.png';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <Link className='logo' to='/'>
        <img src={logo} alt='logo' />
        Одеж
      </Link>
      <nav>
        <ul className='navigation-links'>
          <li>
            <NavLink to='/'>Каталог</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Корзина</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
