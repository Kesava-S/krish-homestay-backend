import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // In a real app, we'd get a token back.
            // For this demo, we'll simulate success if password is "admin123" (or whatever backend expects)
            // But since we are mocking the API call in api.js (or rather, it will fail),
            // we'll just simulate the redirect for now if we catch an error but want to show the UI.

            // await adminLogin({ password }); 

            // Simulating simple client-side check for demo purposes since backend isn't ready
            if (password === 'admin123') {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
