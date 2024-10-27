import PropTypes from 'prop-types';

import './Book.css';

const Book = ({ book }) => {
    return (
        <div className="book-container">
            <div className="img">
                <img src={book.image} alt={book.title} />
            </div>
            <h3 className="title">{book.title}</h3>
            <p className="author">{book.author}</p>
            <p className="category">{book.category}</p>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        category: PropTypes.string,
        image: PropTypes.string
    })
};

export default Book;
