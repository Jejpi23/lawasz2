import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Data_Admin = () => {
  const [data, setData] = useState([]);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchData();
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

  const handleInputChange = e => {
    if (editingData) {
      setEditingData({ ...editingData, [e.target.name]: e.target.value });
    }
  };

  const updateData = () => {
    if (editingData) {
      axios.put(`http://localhost:8000/api/books/${editingData._id}`, editingData)
        .then(response => {
          setEditingData(null);
          fetchData();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>Data Admin</h1>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author's Firstname</th>
            <th>Author's Lastname</th>
            <th>Author's Birth</th>
            <th>Price</th>
            <th>Actions</th>
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
                    <input
                      type="text"
                      name="price"
                      value={editingData.price}
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
