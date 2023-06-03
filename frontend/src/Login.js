import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

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
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the JWT token in localStorage
        console.log('Logged in successfully.');
        // Redirect the user to the "Books" or "Authors" page
        window.location.href = '/books'; // Redirect to the "Books" page
        // window.location.href = '/authors'; // Redirect to the "Authors" page
      }
    } catch (error) {
      console.error('Error during login:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
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
