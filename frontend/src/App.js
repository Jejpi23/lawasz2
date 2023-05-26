import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Authors from './Authors';
import Books from './Books';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/register">Register</Link>}
          {isLoggedIn && (
            <div>
              <span>ZALOGOWANO JAKO: {username}</span>
              <button onClick={handleLogout}>Wyloguj</button>
            </div>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
          />
          <Route
            path="/authors"
            element={isLoggedIn ? <Authors /> : <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
          />
          <Route
            path="/books"
            element={isLoggedIn ? <Books /> : <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />}
          />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
