import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePricing, updateAvailability } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');

    // Mock data for demo
    const [bookings, setBookings] = useState([
        { id: 'BK001', name: 'John Doe', checkIn: '2023-11-01', checkOut: '2023-11-03', amount: 5000, status: 'Confirmed' },
        { id: 'BK002', name: 'Jane Smith', checkIn: '2023-11-05', checkOut: '2023-11-07', amount: 5000, status: 'Pending' },
    ]);

    const [pricing, setPricing] = useState({
        date: '',
        price: ''
    });

    const [availability, setAvailability] = useState({
        date: '',
        status: 'Available'
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handlePricingUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePricing(pricing);
            alert('Pricing updated successfully (Simulated)');
            setPricing({ date: '', price: '' });
        } catch (err) {
            alert('Failed to update pricing');
        }
    };

    const handleAvailabilityUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateAvailability(availability);
            alert('Availability updated successfully (Simulated)');
            setAvailability({ date: '', status: 'Available' });
        } catch (err) {
            alert('Failed to update availability');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="container header-content">
                    <h1>Admin Dashboard</h1>
                    <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
                </div>
            </div>

            <div className="container section">
                <div className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        Update Pricing
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
                        onClick={() => setActiveTab('availability')}
                    >
                        Manage Availability
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'bookings' && (
                        <div className="bookings-view">
                            <h2>Recent Bookings</h2>
                            <div className="table-responsive">
                                <table className="bookings-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Check-In</th>
                                            <th>Check-Out</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.name}</td>
                                                <td>{booking.checkIn}</td>
                                                <td>{booking.checkOut}</td>
                                                <td>₹{booking.amount}</td>
                                                <td>
                                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className="update-form-container">
                            <h2>Update Daily Pricing</h2>
                            <form onSubmit={handlePricingUpdate}>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={pricing.date}
                                        onChange={(e) => setPricing({ ...pricing, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input
                                        type="number"
                                        value={pricing.price}
                                        onChange={(e) => setPricing({ ...pricing, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Price</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'availability' && (
                        <div className="update-form-container">
                            <h2>Manage Availability</h2>
                            <form onSubmit={handleAvailabilityUpdate}>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={availability.date}
                                        onChange={(e) => setAvailability({ ...availability, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        value={availability.status}
                                        onChange={(e) => setAvailability({ ...availability, status: e.target.value })}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Update Status</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
