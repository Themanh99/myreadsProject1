import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

export default function Shelf({ shelves, books, onShelfChange }) {
  return (
    <div className="bookshelf-books" key={shelves}>
      <ol className="books-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} onShelfChange={onShelfChange} />
        ))}
      </ol>
    </div>
  );
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
