import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AuthorDetails.css';

const AuthorDetails = ({ match }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (match?.params?.id) { // Sprawdzenie, czy match.params.id jest zdefiniowane
      fetchAuthor(match.params.id);
    }
  }, [match]);

  const fetchAuthor = (authorId) => {
    axios.get(`http://localhost:8000/api/authors/${authorId}`)
      .then(response => {
        setAuthor(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!author) {
    return <div>Loading author details...</div>;
  }

  return (
    <div className="author-details-container">
      <h1>Author Details</h1>
      <strong>First Name:</strong> {author.firstname}<br />
      <strong>Last Name:</strong> {author.lastname}<br />
      <strong>Date of Birth:</strong> {author.dateofbirth}<br />
      <strong>Nationality:</strong> {author.nationality}<br />
      <strong>Biography:</strong> {author.biography}<br />
    </div>
  );
};

export default AuthorDetails;
