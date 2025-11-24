import React from 'react';

const CancellationRefund = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="container">
                    <h1>Cancellation & Refund Policy</h1>
                </div>
            </div>
            <div className="container section">
                <div className="policy-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p>At Krish Homestays, we value our customers and aim to provide a hassle-free experience.</p>

                    <h3 className="mt-4">Booking Cancellation</h3>
                    <ul>
                        <li>You can cancel your booking up to <strong>5 days</strong> before your check-in date for a full refund.</li>
                        <li>Cancellations made less than <strong>5 days</strong> before check-in may incur a cancellation fee of up to 50-75% of the booking amount.</li>
                        <li>No-shows will be charged the full booking amount.</li>
                    </ul>

                    <h3 className="mt-4">Refunds</h3>
                    <ul>
                        <li>Refunds for eligible cancellations will be processed within <strong>7-10 business days</strong>.</li>
                        <li>Refunds will be credited to the original payment method used during booking.</li>
                    </ul>

                    <p className="mt-4">For any queries, contact us at <a href="mailto:krishhomestays@gmail.com">krishhomestays@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default CancellationRefund;
