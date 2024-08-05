import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../../Components/Book";
import { search, get, getAll, update } from "../../BooksAPI";

export const SearchBook = ({ location }) => {
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [noBookFound, setNoBookFound] = useState(false);

  useEffect(() => {
    const booksFromHome = location.state.booksFromHome;
    setBooks(booksFromHome);
  }, [location.state.booksFromHome]);

  const handleSearchBooks = (e) => {
    const searchInput = e.target.value;
    if (searchInput) {
      search(searchInput).then((resultBooks) => {
        if (!resultBooks || resultBooks.hasOwnProperty("error")) {
          setSearchResult([]);
          setNoBookFound(true);
        } else {
          const updatedBooks = resultBooks.map((searchBook) => {
            const bookFound = books.find((book) => book.id === searchBook.id);
            if (bookFound) {
              searchBook.shelf = bookFound.shelf;
            } else {
              searchBook.shelf = "none";
            }
            return searchBook;
          });
          setSearchResult(updatedBooks);
          setNoBookFound(false);
        }
      });
    } else {
      setSearchResult([]);
    }
  };

  const handleShelfChange = (book, shelf) => {
    update(book, shelf).then((result) => {
      book.shelf = shelf;
      const updatedBooks = books.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      setBooks(updatedBooks);
      const updatedSearchResult = searchResult.map((searchBook) => {
        if (searchBook.id === book.id) {
          searchBook.shelf = shelf;
        }
        return searchBook;
      });
      setSearchResult(updatedSearchResult);
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={handleSearchBooks}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResult.length > 0 && (
          <div>
            <div>
              <h3>{searchResult.length} books found!</h3>
            </div>
            <ol className="books-grid">
              {searchResult.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  shelfChange={handleShelfChange}
                />
              ))}
            </ol>
          </div>
        )}
        {noBookFound && (
          <div>
            <h3>No book found. Please try again!</h3>
          </div>
        )}
      </div>
    </div>
  );
}