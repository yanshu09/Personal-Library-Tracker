import React, { useEffect, useState } from 'react';
import { getAllBooks, addBook, deleteBook } from '../services/bookService';

function BooksPage() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Your Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} - {book.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default BooksPage;
