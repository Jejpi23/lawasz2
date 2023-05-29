import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Importowanie pliku CSS

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Rejestracja zakoñczona sukcesem.');
      }
    } catch (error) {
      console.error('B³¹d podczas rejestracji:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
      </div>
      <button type="submit" className="form-button">Register</button>
    </form>
  );
};

export default RegistrationForm;
