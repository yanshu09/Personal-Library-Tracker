import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        display: 'flex',
        gap: 15,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        alignItems: 'center'
      }}
    >
      {book.cover && (
        <img
          src={`http://localhost:5000/uploads/${book.cover}`}
          alt="cover"
          width={80}
          height={120}
          style={{ objectFit: 'cover', borderRadius: 4 }}
        />
      )}
      <div>
        <h3 style={{ margin: '0 0 8px' }}>{book.title}</h3>
        <p style={{ margin: '4px 0' }}><strong>Author:</strong> {book.author}</p>
        <p style={{ margin: '4px 0' }}><strong>Genre:</strong> {book.genre}</p>
        <p style={{ margin: '4px 0' }}><strong>Status:</strong> {book.status}</p>
      </div>
    </div>
  );
};

export default BookCard;
