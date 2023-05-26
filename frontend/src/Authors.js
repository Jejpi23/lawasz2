import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ firstname: '', lastname: '', dateofbirth: '' });
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
        setNewAuthor({ firstname: '', lastname: '', dateofbirth: '' });
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
    <div>
      <h1>Authors</h1>

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
      <button onClick={addAuthor}>Add</button>

      <h2>Authors List</h2>
      <ul>
        {authors.map(author => (
          <li key={author._id}>
            <strong>First Name:</strong> {author.firstname}<br />
            <strong>Last Name:</strong> {author.lastname}<br />
            <strong>Date of Birth:</strong> {author.dateofbirth}<br />

            {editingAuthor && editingAuthor._id === author._id ? (
              <>
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
                <button onClick={updateAuthor}>Save</button>
                <button onClick={() => setEditingAuthor(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => editAuthor(author)}>Edit</button>
                <button onClick={() => deleteAuthor(author._id)}>Delete</button>
              </>
            )}

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Authors;
