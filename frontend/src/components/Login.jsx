import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                const res = await axios.post(
                    'http://localhost:5004/api/login',
                    { email, password },
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    // console.log(res.data);
                    localStorage.setItem('_id', res.data.userExists._id);
                    localStorage.setItem('email', res.data.userExists.email);
                    setEmail('');
                    setPassword('');
                    setError('');
                    navigate('/');
                    window.location.reload();
                }
            } else {
                setError('Invalid inputs');
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h1 className="title-login"></h1>
            <form
                onSubmit={(e) => {
                    submitForm(e);
                }}
            >
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
