import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

export default function Shelf(props) {
  const { compartmentIndex, books, shelfChange } = props;
  return (
    <div>
      <div className="bookshelf-books" key={compartmentIndex}>
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} shelfChange={shelfChange} />
          ))}
        </ol>
      </div>
    </div>
  );
}

// PropTypes are used to make sure the datatype receive is valid
Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfChange: PropTypes.func.isRequired,
};