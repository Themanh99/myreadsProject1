import React from "react";
import PropTypes from "prop-types";

export default function Book(props) {
  const { book, shelfChange } = props;
  const handleShelfChange = (event) => {
    shelfChange(book, event.target.value);
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : "none",
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={handleShelfChange}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want To Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((author, i) => (
            <div className="book-authors" key={i}>
              {author}
            </div>
          ))}
      </div>
    </li>
  );
}
Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfChange: PropTypes.func.isRequired,
};