import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Get in touch with us for any queries.</p>
                </div>
            </div>

            <div className="container section">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2>Get In Touch</h2>
                        <div className="info-item">
                            <FaPhone className="contact-icon" />
                            <div>
                                <h3>Phone</h3>
                                <p><a href="tel:+917305395094">+91 73053 95094</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaWhatsapp className="contact-icon" />
                            <div>
                                <h3>WhatsApp</h3>
                                <p><a href="https://wa.me/917305395094" target="_blank" rel="noopener noreferrer">Chat with us</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaEnvelope className="contact-icon" />
                            <div>
                                <h3>Email</h3>
                                <p><a href="mailto:krishhomestays@gmail.com">krishhomestays@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FaMapMarkerAlt className="contact-icon" />
                            <div>
                                <h3>Location</h3>
                                <p>Munnar, Kerala</p>
                                <a href="https://maps.app.goo.gl/3GWQnNLLQniAej9t8" target="_blank" rel="noopener noreferrer" className="map-link">View on Google Maps</a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <h2>Send a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="How can we help you?" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>

                <div className="map-full-width mt-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.868892994806!2d77.0595!3d10.0889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0799794d099a6d%3A0x63250e55530d21!2sMunnar%2C%20Kerala!5e0!3m2!1sen!2sin!4v1635763200000!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
