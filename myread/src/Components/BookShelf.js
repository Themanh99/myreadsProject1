import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

const shelves = [
  { title: "Currently Reading", id: "currentlyReading" },
  { title: "Want To Read", id: "wantToRead" },
  { title: "Read", id: "read" },
];

export default function BookShelf() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBookList(books);
    });
  }, []);

  const updateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      setBookList((prevBooks) =>
        prevBooks.filter((b) => b.id !== book.id).concat([book])
      );
    });
  };

  return (
    <div>
      <div className="list-books-content">
        {bookList.length > 0 && (
          <div>
            {shelves.map((shelf, index) => {
              const booksOnShelf = bookList.filter(
                (book) => book.shelf === shelf.id
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <Shelf
                    books={booksOnShelf}
                    shelves={shelves}
                    onShelfChange={updateShelf}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="open-search">
        <Link
          to={{
            pathname: "/search",
            state: {
              booksFromLibrary: bookList,
            },
          }}
        >
          Add a book
        </Link>
      </div>
    </div>
  );
}
