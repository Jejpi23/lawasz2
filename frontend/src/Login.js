import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
const Login = ({ setIsLoggedIn, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { user, token } = response.data;

      setIsLoggedIn(true);
      setUsername(user.name);
      // Zapisz token w localStorage lub w ciasteczkach (cookies) dla kontroli sesji
      localStorage.setItem('token', token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Wyst¹pi³ b³¹d podczas logowania');
      }
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Has³o:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
