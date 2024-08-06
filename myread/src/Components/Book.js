import React from "react";
import PropTypes from "prop-types";

const ACTION_LIST = [
  { title: "Move to...", id: "moveTo" },
  { title: "Currently Reading", id: "currentlyReading" },
  { title: "Want To Read", id: "wantToRead" },
  { title: "Read", id: "read" },
  { title: "None", id: "none" },
];

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
        {
          ACTION_LIST.map((item, index) =>
            <option key={index} value={item.id} disabled={item.id === "moveTo"}>{item.title}</option>
          )
        }
      </select>
    </div >
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
