import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Authors from './Authors';
import Books from './Books';
import Home from './Home';
import './App.css';
const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
