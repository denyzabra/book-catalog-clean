'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Book } from '../lib/api';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await api.getBooks();
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError('Failed to load books');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await api.deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading your book collection...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button onClick={loadBooks} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          🔄 Try Again
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <h2>📚 Your Library is Empty</h2>
        <p>Start building your book collection by adding your first book.</p>
        <Link href="/add" className="btn btn-primary btn-lg">
          ➕ Add Your First Book
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="header-actions">
        <div className="header-info">
          <h1>Book Collection</h1>
          <p>{books.length} {books.length === 1 ? 'book' : 'books'} in your library</p>
        </div>
        <Link href="/add" className="btn btn-primary">
          ➕ Add New Book
        </Link>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            {book.publication_year && (
              <p><strong>Published:</strong> {book.publication_year}</p>
            )}
            {book.isbn && (
              <p><strong>ISBN:</strong> {book.isbn}</p>
            )}
            <div className="book-actions">
              <Link href={`/edit/${book.id}`} className="btn btn-sm btn-secondary">
                ✏️ Edit
              </Link>
              <button
                onClick={() => handleDelete(book.id)}
                className="btn btn-sm btn-danger"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
