import React from 'react';

const Terms = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="container">
                    <h1>Terms and Conditions</h1>
                </div>
            </div>
            <div className="container section">
                <div className="policy-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p>Welcome to Krish Homestays. By using our services, you agree to the following terms:</p>

                    <ol style={{ marginLeft: '20px', marginTop: '20px' }}>
                        <li className="mb-2"><strong>Booking:</strong> All bookings are subject to availability and confirmation by the management.</li>
                        <li className="mb-2"><strong>Payments:</strong> Payments are made through secure gateways. Full payment or a deposit may be required to secure your booking.</li>
                        <li className="mb-2"><strong>Liability:</strong> Krish Homestays is not responsible for the loss of personal belongings or any accidents that occur on the property. Guests are advised to take care of their valuables.</li>
                        <li className="mb-2"><strong>Changes:</strong> We reserve the right to modify these terms at any time without prior notice.</li>
                        <li className="mb-2"><strong>House Rules:</strong> Guests must adhere to the house rules regarding silence, cleanliness, and conduct.</li>
                    </ol>

                    <p className="mt-4">For full details, contact <a href="mailto:krishhomestays@gmail.com">krishhomestays@gmail.com</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
