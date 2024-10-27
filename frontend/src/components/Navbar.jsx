import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('_id')) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <nav>
            <ul>
                <li className="nav-books">
                    <NavLink to="/">Books</NavLink>
                </li>

                {!isLoggedIn ? (
                    <>
                        <li className="nav-register">
                            <NavLink to="/register">Register</NavLink>
                        </li>

                        <li className="nav-login">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-logout">
                            <NavLink to="/logout">Logout</NavLink>
                        </li>

                        <li className="nav-add">
                            <NavLink to="/add">Add Book</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
