import React, { useState } from 'react';
import API from '../services/api';

const BookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'To Read',
    cover: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in book) {
      formData.append(key, book[key]);
    }

    try {
      const res = await API.post('/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onBookAdded(res.data);
      setBook({ title: '', author: '', genre: '', status: 'To Read', cover: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: 'auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        border: '1px solid #ccc',
        borderRadius: 8,
        backgroundColor: '#fafafa'
      }}
    >
      <input
        placeholder="Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        required
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <input
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        required
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <input
        placeholder="Genre"
        value={book.genre}
        onChange={(e) => setBook({ ...book, genre: e.target.value })}
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc'
        }}
      />
      <select
        value={book.status}
        onChange={(e) => setBook({ ...book, status: e.target.value })}
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
          backgroundColor: 'white'
        }}
      >
        <option>To Read</option>
        <option>Reading</option>
        <option>Read</option>
      </select>
      <input
        type="file"
        onChange={(e) => setBook({ ...book, cover: e.target.files[0] })}
        accept="image/*"
        style={{
          borderRadius: 4,
          border: '1px solid #ccc',
          padding: 5
        }}
      />
      <button
        type="submit"
        style={{
          padding: 12,
          fontSize: 16,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: 10
        }}
      >
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
