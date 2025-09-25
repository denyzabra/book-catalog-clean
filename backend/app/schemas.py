from pydantic import BaseModel
from typing import Optional

class BookBase(BaseModel):
    title: str
    author: str
    publication_year: Optional[int] = None
    isbn: Optional[str] = None

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    publication_year: Optional[int] = None
    isbn: Optional[str] = None

class Book(BookBase):
    id: int

    class Config:
        from_attributes = True
