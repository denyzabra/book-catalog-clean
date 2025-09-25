'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, BookCreate } from '../../lib/api';

export default function AddBookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BookCreate>({
    title: '',
    author: '',
    publication_year: undefined,
    isbn: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publication_year' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.author.trim()) {
      setError('Title and author are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const bookToCreate = {
        ...formData,
        isbn: formData.isbn?.trim() || undefined,
      };
      
      await api.createBook(bookToCreate);
      router.push('/');
    } catch (err) {
      setError('Failed to create book');
      console.error('Error creating book:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header-actions">
        <div className="header-info">
          <h1>📚 Add New Book</h1>
          <p>Add a new book to your collection</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
            value={formData.author}
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
            {loading ? '⏳ Adding...' : '➕ Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}
