import React from "react";
import PropTypes from "prop-types";

export default function Book({ book, onShelfChange }) {
  const handleShelfChange = (event) => {
    onShelfChange(book, event.target.value);
  };

  const renderAuthors = (authors) =>
    authors && authors.map((author, i) => (
      <div className="book-authors" key={i}>
        {author}
      </div>
    ));

  const renderBookCover = (imageLinks) => (
    <div
      className="book-cover"
      style={{
        width: 128,
        height: 193,
        backgroundImage:
          imageLinks && imageLinks.thumbnail
            ? `url(${imageLinks.thumbnail})`
            : "none",
      }}
    ></div>
  );

  const renderShelfChanger = (shelf) => (
    <div className="book-shelf-changer">
      <select onChange={handleShelfChange} value={shelf ? shelf : "none"}>
        <option value="moveTo" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want To Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );

  return (
    <li>
      <div className="book">
        <div className="book-top">
          {renderBookCover(book.imageLinks)}
          {renderShelfChanger(book.shelf)}
        </div>
        <div className="book-title">{book.title}</div>
        {renderAuthors(book.authors)}
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
