import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Authors.css';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ firstname: '', lastname: '', dateofbirth: '', nationality: '', biography: '' });
  const [editingAuthor, setEditingAuthor] = useState(null);

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

  const addAuthor = () => {
    axios.post('http://localhost:8000/api/authors', newAuthor)
      .then(response => {
        setNewAuthor({ firstname: '', lastname: '', dateofbirth: '', nationality: '', biography: '' });
        fetchAuthors();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editAuthor = (author) => {
    setEditingAuthor(author);
  };

  const updateAuthor = () => {
    axios.put(`http://localhost:8000/api/authors/${editingAuthor._id}`, editingAuthor)
      .then(response => {
        setEditingAuthor(null);
        fetchAuthors();
      })
      .catch(error => {
        console.error(error);
      });
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
        <input
          type="text"
          name="lastname"
          value={newAuthor.lastname}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="dateofbirth"
          value={newAuthor.dateofbirth}
          placeholder="Date of Birth"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nationality"
          value={newAuthor.nationality}
          placeholder="Nationality"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="biography"
          value={newAuthor.biography}
          placeholder="Biography"
          onChange={handleInputChange}
        />
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
                <input
                  type="text"
                  name="lastname"
                  value={editingAuthor.lastname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="dateofbirth"
                  value={editingAuthor.dateofbirth}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="nationality"
                  value={editingAuthor.nationality}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="biography"
                  value={editingAuthor.biography}
                  onChange={handleInputChange}
                />
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
