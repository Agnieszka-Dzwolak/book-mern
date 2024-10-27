import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './AddBook.css';

const AddBook = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        if (title && author && category && image) {
            const res = await axios.post(
                'http://localhost:5004/api/books',
                { title, author, category, image },
                { withCredentials: true }
            );

            if (res.status === 201) {
                navigate('/');
                window.location.reload();
            }
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                {error && <div className="error-message">{error}</div>}
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
