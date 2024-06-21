import cn from 'classnames';
import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);

    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      window.sessionStorage.setItem('isAuthenticated', true);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <section className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Захищена сторінка</h2>
        <input
          className={cn({ 'input-error': error })}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Пароль'
        />
        {error && <span className='error-message'>Невірний пароль</span>}
        <button className='btn' type='submit'>
          Увійти
        </button>
      </form>
    </section>
  );
}
