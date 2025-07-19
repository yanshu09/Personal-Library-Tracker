import React, { useEffect, useState } from 'react';
import API from '../services/api';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import { motion } from 'framer-motion';
import './dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    (statusFilter === '' || book.status === statusFilter) &&
    (search === '' ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div 
      className="dashboard-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="dashboard-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
      >
        <motion.h2 
          className="dashboard-title"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span role="img" aria-label="books">📚</span> My Library Dashboard
        </motion.h2>

        <BookForm onBookAdded={fetchBooks} />

        <motion.div 
          className="filter-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="filter-control">
            <span role="img" aria-label="filter" className="filter-icon">🔎</span>
            <input
              placeholder="Search by Title or Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-control">
            <span role="img" aria-label="filter" className="filter-icon">📖</span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="">All</option>
              <option>To Read</option>
              <option>Reading</option>
              <option>Read</option>
            </select>
          </div>
        </motion.div>

        <motion.div 
          className="book-list"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p className="no-books">No books found matching your criteria.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default Dashboard;
