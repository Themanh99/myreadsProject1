import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../../Components/Book";
import { search, update, getAll } from "../../BooksAPI";
import { debounce } from "../../Helpers";

export const SearchBook = () => {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // Call API search after 0.5s
  const debouncedSearch = debounce(search, 500);

  const handleSearchInput = (e) => {
    const query = e.target.value;
    if (!query) {
      setSearchResults(libraryBooks); // Display all books if search query is empty
      setNoResultsFound(false);
      return;
    }

    debouncedSearch(query).then((foundBooks) => {
      if (!foundBooks || foundBooks.error) {
        setSearchResults([]);
        setNoResultsFound(true);
        return;
      }

      const updatedResults = foundBooks.map((searchBook) => {
        const matchedBook = libraryBooks.find((book) => book.id === searchBook.id);
        if (matchedBook) {
          searchBook.shelf = matchedBook.shelf;
        } else {
          searchBook.shelf = "none";
        }
        return searchBook;
      });

      setSearchResults(updatedResults);
      setNoResultsFound(false);
    });
  };

  const handleShelfUpdate = (book, newShelf) => {
    update(book, newShelf).then(() => {
      book.shelf = newShelf;
      const updatedLibraryBooks = libraryBooks
        .filter((libraryBook) => libraryBook.id !== book.id)
        .concat(book);
      setLibraryBooks(updatedLibraryBooks);

      const updatedSearchResults = searchResults.map((searchBook) => {
        if (searchBook.id === book.id) {
          searchBook.shelf = newShelf;
        }
        return searchBook;
      });
      setSearchResults(updatedSearchResults);
    });
  };

  useEffect(() => {
    getAll().then((books) => {
      setLibraryBooks(books);
      setSearchResults(books); // Set initial search results to all library books
    });
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={handleSearchInput}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResults.length > 0 && (
          <div>
            <div>
              <h3>{searchResults.length} books found!</h3>
            </div>
            <ol className="books-grid">
              {searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onShelfChange={handleShelfUpdate}
                />
              ))}
            </ol>
          </div>
        )}
        {noResultsFound && (
          <div>
            <h3>No books found. Try again!</h3>
          </div>
        )}
      </div>
    </div>
  );
};
