import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
  const [authors, setAuthors] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8000/api/books')
      .then(response => {
        setBooks(response.data);
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
    if (editingBook) {
      setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
    } else {
      setNewBook({ ...newBook, [e.target.name]: e.target.value });
    }
  };

  const handleAuthorSelect = e => {
    const selectedAuthor = authors.find(author => author._id === e.target.value);
    if (selectedAuthor) {
      if (editingBook) {
        setEditingBook({ ...editingBook, author: selectedAuthor });
      } else {
        setNewBook({ ...newBook, author: selectedAuthor });
      }
    }
  };

  const addBook = () => {
    axios.post('http://localhost:8000/api/books', newBook)
      .then(response => {
        setNewBook({ title: '', author: '', price: '' });
        fetchBooks();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const editBook = (book) => {
    setEditingBook(book);
  };

  const updateBook = () => {
    axios.put(`http://localhost:8000/api/books/${editingBook._id}`, editingBook)
      .then(response => {
        setEditingBook(null);
        fetchBooks();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:8000/api/books/${id}`)
      .then(response => {
        fetchBooks();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Books</h1>

      <h2>Add Book</h2>
      <input
        type="text"
        name="title"
        value={newBook.title}
        placeholder="Title"
        onChange={handleInputChange}
      />
      <select name="author" value={newBook.author._id} onChange={handleAuthorSelect}>
        <option value="">Select Author</option>
        {authors.map(author => (
          <option key={author._id} value={author._id}>{author.firstname} {author.lastname}</option>
        ))}
      </select>
      <input
        type="text"
        name="price"
        value={newBook.price}
        placeholder="Price"
        onChange={handleInputChange}
      />
      <button onClick={addBook}>Add</button>

      <h2>Books List</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author.firstname} {book.author.lastname}<br />
            <strong>Price:</strong> {book.price}<br />

            {editingBook && editingBook._id === book._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editingBook.title}
                  onChange={handleInputChange}
                />
                <select name="author" value={editingBook.author._id} onChange={handleAuthorSelect}>
                  <option value="">Select Author</option>
                  {authors.map(author => (
                    <option key={author._id} value={author._id}>{author.firstname} {author.lastname}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="price"
                  value={editingBook.price}
                  onChange={handleInputChange}
                />
                <button onClick={updateBook}>Save</button>
                <button onClick={() => setEditingBook(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => editBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </>
            )}

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
