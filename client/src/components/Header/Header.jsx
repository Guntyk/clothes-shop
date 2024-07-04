import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as userSlice from '../../redux/features/userSlice';
import logout from 'icons/log-out.svg';
import logo from 'images/IMG_1631.png';
import './Header.css';

export default function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogOut = () => {
    push('/login');
    dispatch(userSlice.actions.logout());
  };

  return (
    <header className='header'>
      <Link className='logo' to='/'>
        VENDRE.
      </Link>
      <nav className='navigation-bar'>
        <ul className='navigation-links'>
          <li>
            <NavLink to='/'>Каталог</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Корзина</NavLink>
          </li>
          <li>
            <NavLink to='/orders'>Мої замовлення</NavLink>
          </li>
          {(user?.role === 'admin' || user?.role === 'superadmin') && (
            <li>
              <NavLink to='/orders-panel'>Панель замовлень</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className='account'>
        {isAuthenticated ? (
          <>
            <span className='username'>{user?.username}</span>
            <button className='log-out-btn' onClick={handleLogOut}>
              <img src={logout} alt='log out' />
            </button>
          </>
        ) : (
          <Link to='/login'>Вхід</Link>
        )}
      </div>
    </header>
  );
}
