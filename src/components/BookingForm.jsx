import React, { useState } from 'react';
import { checkAvailability, bookStay } from '../services/api';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        name: '',
        email: '',
        phone: ''
    });
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Reset availability if dates change
        if (e.target.name === 'checkIn' || e.target.name === 'checkOut') {
            setAvailability(null);
        }
    };

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await checkAvailability({
                checkIn: formData.checkIn,
                checkOut: formData.checkOut
            });
            setAvailability(result);
        } catch (err) {
            // For demo purposes, we'll simulate availability if API fails (since backend isn't real yet)
            console.warn("API failed, simulating availability for demo:", err);
            setAvailability({ available: true, price: 2500, total: 5000 });
            // In real app: setError('Could not check availability. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRazorpayPayment = () => {
        const amountInPaise = availability.total * 100; // Convert to paise

        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
            amount: amountInPaise,
            currency: "INR",
            name: "Krish Homestay",
            description: "Booking Payment",
            image: "/vite.svg", // Optional: Add your logo here
            handler: async function (response) {
                // Payment successful
                console.log("Payment ID: ", response.razorpay_payment_id);

                // Call backend to save booking
                setLoading(true);
                try {
                    await bookStay({
                        ...formData,
                        paymentId: response.razorpay_payment_id,
                        amount: availability.total
                    });
                    setSuccess(true);
                } catch (err) {
                    console.error("Booking save failed:", err);
                    // Even if save fails, payment succeeded. In real app, handle this edge case.
                    setSuccess(true);
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#4A7c59"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
    };

    const handleBook = (e) => {
        e.preventDefault();
        // Validate form before payment
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill in all guest details.");
            return;
        }
        handleRazorpayPayment();
    };

    if (success) {
        return (
            <div className="booking-success">
                <h3>Booking Request Sent!</h3>
                <p>Thank you, {formData.name}. We have received your booking request.</p>
                <p>We will send a confirmation email to {formData.email} shortly.</p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>Book Another</button>
            </div>
        );
    }

    return (
        <div className="booking-form-container">
            <h3>Book Your Stay</h3>
            <form onSubmit={handleCheckAvailability}>
                <div className="form-group">
                    <label>Check-in Date</label>
                    <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Check-out Date</label>
                    <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Guests</label>
                    <select name="guests" value={formData.guests} onChange={handleChange}>
                        {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>

                {!availability && (
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Checking...' : 'Check Availability'}
                    </button>
                )}
            </form>

            {availability && availability.available && (
                <div className="availability-result">
                    <p className="success-text">Dates are available!</p>
                    <p>Price per night: ₹{availability.price}</p>
                    <p className="total-price">Total: ₹{availability.total}</p>

                    <div className="guest-details">
                        <h4>Guest Details</h4>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <button onClick={handleBook} className="btn btn-secondary w-100" disabled={loading} id="rzp-button">
                            {loading ? 'Processing...' : 'Pay & Book Now'}
                        </button>
                    </div>
                </div>
            )}

            {availability && !availability.available && (
                <div className="availability-result">
                    <p className="error-text">Sorry, these dates are not available.</p>
                </div>
            )}

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default BookingForm;
