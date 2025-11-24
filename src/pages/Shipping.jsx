import React from 'react';

const Shipping = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="container">
                    <h1>Service Delivery Policy</h1>
                </div>
            </div>
            <div className="container section">
                <div className="policy-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p>Krish Homestays provides accommodation bookings. All services are digital confirmations and on-site experiences.</p>

                    <ul style={{ marginTop: '20px' }}>
                        <li className="mb-2"><strong>Booking Confirmation:</strong> A confirmation email will be sent to your registered email address immediately after successful payment.</li>
                        <li className="mb-2"><strong>Check-in Instructions:</strong> Detailed check-in instructions, including location and contact details, will be provided in your booking confirmation.</li>
                        <li className="mb-2"><strong>Changes:</strong> Any requests to change dates or guest details must be made at least <strong>5 days</strong> in advance and are subject to availability.</li>
                    </ul>

                    <p className="mt-4">For support, contact <a href="mailto:krishhomestays@gmail.com">krishhomestays@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
