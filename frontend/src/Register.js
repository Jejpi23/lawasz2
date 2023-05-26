import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log(response.data); // Mo¿esz dodaæ logikê przekierowania lub inne dzia³ania po rejestracji

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(Object.values(error.response.data.errors).flat().join(', '));
      } else {
        setError('Wyst¹pi³ b³¹d podczas rejestracji');
      }
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Imiê:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Has³o:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>PotwierdŸ has³o:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default Register;
