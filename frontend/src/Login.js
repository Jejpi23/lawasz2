import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Importowanie pliku CSS

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Zalogowano pomyœlnie.');
      }
    } catch (error) {
      console.error('B³¹d podczas logowania:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container"> {/* Dodanie klasy CSS */}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
