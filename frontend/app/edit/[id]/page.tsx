
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { api, Book, BookUpdate } from '../../../lib/api';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [formData, setFormData] = useState<BookUpdate>({
    title: '',
    author: '',
    publication_year: undefined,
    isbn: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const bookId = parseInt(id, 10);
      api.getBook(bookId)
        .then(book => {
          setFormData({
            title: book.title,
            author: book.author,
            publication_year: book.publication_year,
            isbn: book.isbn,
          });
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load book details.');
          setLoading(false);
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publication_year' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title?.trim() || !formData.author?.trim()) {
      setError('Title and author are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const bookToUpdate = {
        ...formData,
        isbn: formData.isbn?.trim() || undefined,
      };
      
      await api.updateBook(parseInt(id, 10), bookToUpdate);
      router.push('/');
    } catch (err) {
      setError('Failed to update book');
      console.error('Error updating book:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          ← Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="header-actions">
        <div className="header-info">
          <h1>✏️ Edit Book</h1>
          <p>Update book information</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="Enter the book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author || ''}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="Enter the author's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication_year">Publication Year</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year || ''}
            onChange={handleChange}
            min="1000"
            max="2100"
            placeholder="e.g., 2023"
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn || ''}
            onChange={handleChange}
            maxLength={13}
            placeholder="e.g., 9781234567890"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="form-actions">
          <Link href="/" className="btn btn-secondary">
            ← Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
