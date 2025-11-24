import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>Krish Homestay</h3>
                    <p>
                        Stay in a traditional Kerala home where tranquility and cleanliness come first.
                        Experience the genuine Munnar.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/booking">Book Now</a></li>
                        <li><a href="/rules">House Rules</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <p><FaPhone className="icon" /> +91 73053 95094</p>
                    <p><FaEnvelope className="icon" /> krishhomestays@gmail.com</p>
                    <p><FaMapMarkerAlt className="icon" /> Munnar, Kerala</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Krish Homestay. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
