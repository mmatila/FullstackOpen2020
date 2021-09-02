import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const Login = ({ show, token, setToken }) => {
  const [login, result] = useMutation(LOGIN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token);
      localStorage.setItem('user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <h3>Login to get access to some awesome features</h3>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          born
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default Login;