import React from 'react';

const Privacy = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="container">
                    <h1>Privacy Policy</h1>
                </div>
            </div>
            <div className="container section">
                <div className="policy-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p>Krish Homestays respects your privacy. We collect personal data only to provide services:</p>

                    <ul style={{ marginTop: '20px' }}>
                        <li className="mb-2"><strong>Information Collected:</strong> We collect your name, contact information (email, phone number), and booking details necessary to process your reservation.</li>
                        <li className="mb-2"><strong>Usage:</strong> This information is used to process bookings, communicate updates regarding your stay, and improve our services.</li>
                        <li className="mb-2"><strong>Sharing:</strong> We do not share your personal data with third parties except for service fulfillment (e.g., payment processing) or if required by law.</li>
                        <li className="mb-2"><strong>Security:</strong> Your data is stored securely and protected from unauthorized access.</li>
                    </ul>

                    <p className="mt-4">For questions, contact <a href="mailto:krishhomestays@gmail.com">krishhomestays@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
