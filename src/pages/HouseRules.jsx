import React from 'react';
import './HouseRules.css';

const HouseRules = () => {
    return (
        <div className="rules-page">
            <div className="page-header">
                <div className="container">
                    <h1>House Rules & Policies</h1>
                    <p>To ensure a pleasant stay for everyone, please observe the following guidelines.</p>
                </div>
            </div>

            <div className="container section">
                <div className="rules-grid">
                    <div className="rule-category">
                        <h3>Check-in & Check-out</h3>
                        <ul>
                            <li><strong>Check-in:</strong> 2:00 PM – 3:00 PM</li>
                            <li><strong>Check-out:</strong> 10:00 AM – 11:00 AM</li>
                            <li>Early check-in or late check-out is subject to availability and must be requested in advance.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Cancellation Policy</h3>
                        <ul>
                            <li><strong>Up to 3–5 days before check-in:</strong> Free cancellation.</li>
                            <li><strong>Within 3–5 days:</strong> 50–75% of the booking amount will be charged.</li>
                            <li><strong>No-show:</strong> Full booking amount will be charged.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Silence & Tranquility</h3>
                        <ul>
                            <li>Please observe quiet hours after <strong>9:00 PM</strong>.</li>
                            <li>Avoid loud music or noise that might disturb other guests or neighbors.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Cleanliness & Hygiene</h3>
                        <ul>
                            <li>Please remove shoes before entering the house.</li>
                            <li>Respect linens and amenities provided.</li>
                            <li>Help us keep the environment clean and green.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Cultural Respect</h3>
                        <ul>
                            <li>Please dress modestly in common areas.</li>
                            <li>Respect local customs and traditions.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Smoking & Alcohol</h3>
                        <ul>
                            <li><strong>No smoking</strong> inside the house.</li>
                            <li>Alcohol consumption is allowed only in private areas with prior notice.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Visitors & Pets</h3>
                        <ul>
                            <li>Only registered guests are allowed on the property.</li>
                            <li><strong>Pets:</strong> Not allowed unless pre-approved by management.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Security & Liability</h3>
                        <ul>
                            <li>Please lock your rooms when leaving.</li>
                            <li>Supervise children at all times.</li>
                            <li>Management is not responsible for the loss of personal items.</li>
                        </ul>
                    </div>

                    <div className="rule-category">
                        <h3>Food</h3>
                        <ul>
                            <li>Home-cooked meals are available on request. Please inform us in advance.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseRules;
