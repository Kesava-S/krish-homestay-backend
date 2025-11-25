import React from 'react';
import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
    return (
        <div className="booking-page">
            <div className="booking-header">
                <div className="container">
                    <h1>Book Your Stay</h1>
                    <p>Secure your dates for a peaceful getaway in Munnar.</p>
                </div>
            </div>

            <div className="container section">
                <div className="booking-layout">
                    <div className="booking-info">
                        <h2>Why Book With Us?</h2>
                        <ul className="booking-benefits">
                            <li>✓ Best Price Guarantee</li>
                            <li>✓ Instant Confirmation</li>
                            <li>✓ No Hidden Fees</li>
                            <li>✓ Flexible Cancellation (up to 5 days before)</li>
                            <li>✓ Secure payment via Razorpay</li>
                        </ul>

                        <div className="room-preview">
                            <h3>Our Rooms</h3>
                            <p>Spacious, clean, and well-ventilated rooms with modern amenities and attached bathrooms.</p>
                            {/* Placeholder for room image */}
                            <div className="room-img-placeholder">Room Image</div>
                        </div>
                    </div>

                    <div className="booking-form-wrapper">
                        <BookingForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
