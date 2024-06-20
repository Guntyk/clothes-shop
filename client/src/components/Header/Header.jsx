import { NavLink } from 'react-router-dom';
import logo from '../../images/IMG_1631.png';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <a className='logo' href='/'>
        <img src={logo} alt='logo' />
        Одёж
      </a>
      <nav>
        <ul className='navlinks'>
          <li>
            <NavLink to='/'>111</NavLink>
          </li>
          <li>
            <NavLink to='/'>222</NavLink>
          </li>
          <li>
            <NavLink to='/'>333</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
