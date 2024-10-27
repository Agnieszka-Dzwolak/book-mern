import axios from 'axios';

import { useState, useEffect } from 'react';

import Book from './Book';

import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5004/api/books');
                if (res.status === 200) {
                    setBooks(res.data);
                }
            } catch (err) {
                console.error(`Error fetching data: ${err}`);
            }
        };
        getBooks();
        setEmail(localStorage.getItem('email'));
    }, []);
    return (
        <>
            {email && <div className="welcome-message">Welcome {email}</div>}
            <div className="all-books">
                {books.map((book) => (
                    <Book key={book._id} book={book} />
                ))}
            </div>
        </>
    );
};

export default Books;
