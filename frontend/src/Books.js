import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/books') // Zmieñ adres URL na odpowiedni dla Twojego API
      .then(response => {
        setBooks(response.data[0].books);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book._id}>{book.title} by {book.author} - ${book.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
