import React from 'react';
import BookShelf from '../../Components/BookShelf';

const HomePage = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <BookShelf />
        </div>
    );
}

export default HomePage;