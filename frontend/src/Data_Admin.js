import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Data_Admin = () => {
  const [data, setData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchData();
    fetchAuthors();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/books')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

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
    if (editingData) {
      setEditingData({ ...editingData, [e.target.name]: e.target.value });
    } else {
      setNewBook({ ...newBook, [e.target.name]: e.target.value });
    }
  };

  const addBook = () => {
    const selectedAuthor = authors.find(author => author._id === newBook.author);
    if (selectedAuthor) {
      const book = {
        title: newBook.title,
        author: selectedAuthor,
        price: parseFloat(newBook.price).toFixed(2),
      };

      axios.post('http://localhost:8000/api/books', book)
        .then(response => {
          setNewBook({ title: '', author: '', price: '' });
          fetchData();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const updateData = () => {
    if (editingData) {
      const selectedAuthor = authors.find(author => author._id === editingData.author);
      if (selectedAuthor) {
        const updatedData = {
          ...editingData,
          author: selectedAuthor,
          price: parseFloat(editingData.price).toFixed(2),
        };

        axios.put(`http://localhost:8000/api/books/${editingData._id}`, updatedData)
          .then(response => {
            setEditingData(null);
            fetchData();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div>
      <h1>Data Admin</h1>

      <h2>Add Book</h2>
      <input
        type="text"
        name="title"
        value={newBook.title}
        placeholder="Title"
        onChange={handleInputChange}
      />
      <select name="author" value={newBook.author} onChange={handleInputChange}>
        <option value="">Select Author</option>
        {authors.map(author => (
          <option key={author._id} value={author._id}>
            {author.firstname} {author.lastname}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="price"
        value={newBook.price}
        placeholder="Price"
        step="0.01"
        onChange={handleInputChange}
      />
      <button onClick={addBook}>Add</button>

      <h2>Data List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author's First Name</th>
            <th>Author's Last Name</th>
            <th>Author's Birth</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.author.firstname}</td>
              <td>{item.author.lastname}</td>
              <td>{item.author.dateofbirth}</td>
              <td>{item.price}</td>
              <td>
                {editingData && editingData._id === item._id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={editingData.title}
                      onChange={handleInputChange}
                    />
                    <select
                      name="author"
                      value={editingData.author._id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Author</option>
                      {authors.map(author => (
                        <option key={author._id} value={author._id}>
                          {author.firstname} {author.lastname}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="price"
                      value={editingData.price}
                      step="0.01"
                      onChange={handleInputChange}
                    />
                    <button onClick={updateData}>Save</button>
                    <button onClick={() => setEditingData(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditingData(item)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data_Admin;
