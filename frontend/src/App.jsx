import { Routes, Route } from 'react-router-dom';

import Books from './components/Books';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import AddBook from './components/AddBook';

import './App.css';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Books />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/add" element={<AddBook />} />
            </Routes>
        </div>
    );
};

export default App;
