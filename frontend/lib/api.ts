const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year?: number;
  isbn?: string;
}

export interface BookCreate {
  title: string;
  author: string;
  publication_year?: number;
  isbn?: string;
}

export interface BookUpdate {
  title?: string;
  author?: string;
  publication_year?: number;
  isbn?: string;
}

export const api = {
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  },

  async getBook(id: number): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    return response.json();
  },

  async createBook(book: BookCreate): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error('Failed to create book');
    }
    return response.json();
  },

  async updateBook(id: number, book: BookUpdate): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error('Failed to update book');
    }
    return response.json();
  },

  async deleteBook(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  },
};
