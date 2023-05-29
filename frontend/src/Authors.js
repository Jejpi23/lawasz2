import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Authors.css';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ firstname: '', lastname: '', dateofbirth: '', nationality: '', biography: '' });
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    axios.get('http://localhost:8000/api/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = e => {
    if (editingAuthor) {
      setEditingAuthor({ ...editingAuthor, [e.target.name]: e.target.value });
    } else {
      setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value });
    }
  };

  const validateAuthor = () => {
    const errors = {};
    if (!newAuthor.firstname) {
      errors.firstname = 'First Name is required';
    }
    if (!newAuthor.lastname) {
      errors.lastname = 'Last Name is required';
    }
    if (!newAuthor.dateofbirth) {
      errors.dateofbirth = 'Date of Birth is required';
    }
    if (!newAuthor.nationality) {
      errors.nationality = 'Nationality is required';
    }
    if (!newAuthor.biography) {
      errors.biography = 'Biography is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addAuthor = () => {
    if (validateAuthor()) {
      axios.post('http://localhost:8000/api/authors', newAuthor)
        .then(response => {
          setNewAuthor({ firstname: '', lastname: '', dateofbirth: '', nationality: '', biography: '' });
          fetchAuthors();
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
          }
          console.error(error);
        });
    }
  };

  const editAuthor = (author) => {
    setEditingAuthor(author);
  };

  const updateAuthor = () => {
    if (validateAuthor()) {
      axios.put(`http://localhost:8000/api/authors/${editingAuthor._id}`, editingAuthor)
        .then(response => {
          setEditingAuthor(null);
          fetchAuthors();
        })
        .catch(error => {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
          }
          console.error(error);
        });
    }
  };

  const deleteAuthor = (id) => {
    axios.delete(`http://localhost:8000/api/authors/${id}`)
      .then(response => {
        fetchAuthors();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="authors-container">
      <h1>Authors</h1>

      <div className="add-author-form">
        <h2>Add Author</h2>
        <input
          type="text"
          name="firstname"
          value={newAuthor.firstname}
          placeholder="First Name"
          onChange={handleInputChange}
        />
        {errors.firstname && <span className="error">{errors.firstname}</span>}
        <input
          type="text"
          name="lastname"
          value={newAuthor.lastname}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        {errors.lastname && <span className="error">{errors.lastname}</span>}
        <input
          type="text"
          name="dateofbirth"
          value={newAuthor.dateofbirth}
          placeholder="Date of Birth"
          onChange={handleInputChange}
        />
        {errors.dateofbirth && <span className="error">{errors.dateofbirth}</span>}
        <input
          type="text"
          name="nationality"
          value={newAuthor.nationality}
          placeholder="Nationality"
          onChange={handleInputChange}
        />
        {errors.nationality && <span className="error">{errors.nationality}</span>}
        <input
          type="text"
          name="biography"
          value={newAuthor.biography}
          placeholder="Biography"
          onChange={handleInputChange}
        />
        {errors.biography && <span className="error">{errors.biography}</span>}
        <button onClick={addAuthor}>Add</button>
      </div>

      <h2>Authors List</h2>
      <ul className="authors-list">
        {authors.map(author => (
          <li key={author._id} className="author-item">
            <strong>First Name:</strong> {author.firstname}<br />
            <strong>Last Name:</strong> {author.lastname}<br />
            <strong>Date of Birth:</strong> {author.dateofbirth}<br />
            <strong>Nationality:</strong> {author.nationality}<br />
            <strong>Biography:</strong> {author.biography}<br />

            {editingAuthor && editingAuthor._id === author._id ? (
              <div className="edit-author-form">
                <input
                  type="text"
                  name="firstname"
                  value={editingAuthor.firstname}
                  onChange={handleInputChange}
                />
                {errors.firstname && <span className="error">{errors.firstname}</span>}
                <input
                  type="text"
                  name="lastname"
                  value={editingAuthor.lastname}
                  onChange={handleInputChange}
                />
                {errors.lastname && <span className="error">{errors.lastname}</span>}
                <input
                  type="text"
                  name="dateofbirth"
                  value={editingAuthor.dateofbirth}
                  onChange={handleInputChange}
                />
                {errors.dateofbirth && <span className="error">{errors.dateofbirth}</span>}
                <input
                  type="text"
                  name="nationality"
                  value={editingAuthor.nationality}
                  onChange={handleInputChange}
                />
                {errors.nationality && <span className="error">{errors.nationality}</span>}
                <input
                  type="text"
                  name="biography"
                  value={editingAuthor.biography}
                  onChange={handleInputChange}
                />
                {errors.biography && <span className="error">{errors.biography}</span>}
                <button onClick={updateAuthor}>Save</button>
                <button onClick={() => setEditingAuthor(null)}>Cancel</button>
              </div>
            ) : (
              <div className="author-buttons">
                <button onClick={() => editAuthor(author)}>Edit</button>
                <button onClick={() => deleteAuthor(author._id)}>Delete</button>
              </div>
            )}

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
