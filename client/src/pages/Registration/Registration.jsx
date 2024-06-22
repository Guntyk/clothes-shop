import cn from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import * as userSlice from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Registration.css';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { replace } = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const registrationRequestError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (isAuthenticated) {
      replace('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userSlice.registerUser({ username, email, password }));
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <section className='registration'>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='title'>Реєстрація</h2>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ім'я" />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Пошта' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' />
        <button
          className={cn('btn', { active: username.length > 1 && email.length > 5 && password.length > 2 })}
          type='submit'
        >
          Зареєструватись
        </button>
      </form>
      {registrationRequestError && <span className='error-message'>{registrationRequestError.message}</span>}
      <div className='auth-redirect'>
        <span>Вже зареєстровані?</span>
        <Link className='auth-link' to='/login'>
          Увійти
        </Link>
      </div>
    </section>
  );
}
