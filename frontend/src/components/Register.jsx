import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        //check if password and rePassword match
        const isMatchPasswords = password === rePassword;

        if (email && password && rePassword && isMatchPasswords) {
            const res = await axios.post(
                'http://localhost:5004/api/register',
                { email, password, rePassword },
                { withCredentials: true }
            );
            if (res.status === 201) {
                setEmail('');
                setPassword('');
                setRePassword('');
                setError('');
                navigate('/login');
            } else {
                setError('Invalid inputs');
            }
        } else {
            setError('Invalid inputs');
        }
    };
    return (
        <div>
            <h1 className="title-form">Register Form</h1>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="rePassword">Confirm Password: </label>
                <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    required
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
