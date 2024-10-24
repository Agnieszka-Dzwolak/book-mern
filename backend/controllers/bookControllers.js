import Book from '../models/book.js';

const bookControllers = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getBook: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findById({ _id: id });
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createBook: async (req, res) => {
        const { title, author, category, image } = req.body;
        try {
            if (title && author && category && image) {
                const newBook = new Book({
                    title,
                    author,
                    category,
                    image
                });
                await newBook.save();
                res.status(201).json(newBook);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, author, category, image } = req.body;
        try {
            if (title && author && category && image) {
                const updatedBook = await Book.updateOne(
                    { _id: id },
                    { title, author, category, image }
                );
                res.status(200).json(updatedBook);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteBook: async (req, res) => {
        const { id } = req.params;
        try {
            await Book.deleteOne({ _id: id });
            res.status(200).json({
                message: 'Book deleted successfully'
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default bookControllers;
