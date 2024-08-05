import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

export default function BookShelf() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      setBooks((prevBooks) =>
        prevBooks.filter((b) => b.id !== book.id).concat([book])
      );
    });
  };

  //Self title
  const compartments = [
    { title: "Currently Reading", value: "currentlyReading" },
    { title: "Want To Read", value: "wantToRead" },
    { title: "Read", value: "read" },
  ];

  return (
    <div>
      {/* list books */}
      <div className="list-books-content">
        {books.length > 0 && (
          <div>
            {compartments.map((compartment, index) => {
              const compartmentBooks = books.filter(
                (book) => book.shelf === compartment.value
              );
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{compartment.title}</h2>
                  <Shelf
                    key={index}
                    books={compartmentBooks}
                    compartmentsList={compartments}
                    shelfChange={handleShelfChange}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* page search */}
      <div className="open-search">
        <Link
          to={{
            pathname: "/search",
            state: {
              booksFromHome: books,
            },
          }}
        />
      </div>
    </div>
  );
}