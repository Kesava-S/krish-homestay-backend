import React from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaParking, FaMountain, FaUtensils, FaShieldAlt, FaLeaf, FaWhatsapp } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1>Stay in a traditional Kerala home where tranquility and cleanliness come first.</h1>
                        <p>With soothing mountain views and a naturally calm atmosphere, it’s the perfect retreat for travellers seeking an immersive, genuine Munnar experience.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
                            <Link to="/booking" className="btn btn-secondary">Book Your Stay</Link>
                            <a
                                href="https://wa.me/917305395094"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                            >
                                <FaWhatsapp /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                    <div className="hero-booking">
                        <BookingForm />
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="section amenities-section">
                <div className="container">
                    <h2 className="text-center">Experience Comfort & Nature</h2>
                    <div className="amenities-grid">
                        <div className="amenity-card">
                            <FaMountain className="amenity-icon" />
                            <h3>Mountain Views</h3>
                            <p>Wake up to breathtaking views of the Munnar hills.</p>
                        </div>
                        <div className="amenity-card">
                            <FaLeaf className="amenity-icon" />
                            <h3>Tranquil Atmosphere</h3>
                            <p>A peaceful retreat away from the city noise.</p>
                        </div>
                        <div className="amenity-card">
                            <FaShieldAlt className="amenity-icon" />
                            <h3>Safe & Secure</h3>
                            <p>24/7 security and a safe environment for families.</p>
                        </div>
                        <div className="amenity-card">
                            <FaUtensils className="amenity-icon" />
                            <h3>Home Cooked Meals</h3>
                            <p>Authentic Kerala cuisine available on request.</p>
                        </div>
                        <div className="amenity-card">
                            <FaWifi className="amenity-icon" />
                            <h3>Free Wi-Fi</h3>
                            <p>Stay connected with high-speed internet.</p>
                        </div>
                        <div className="amenity-card">
                            <FaParking className="amenity-icon" />
                            <h3>Free Parking</h3>
                            <p>Ample parking space for your vehicles.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="section about-preview">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Welcome to Krish Homestay</h2>
                            <p>
                                Nestled in the heart of Munnar, Krish Homestay offers a unique blend of traditional Kerala architecture and modern comforts.
                                Our home is designed to provide you with a serene and authentic experience of the hill station.
                            </p>
                            <Link to="/about" className="btn btn-primary">Read Our Story</Link>
                        </div>
                        <div className="about-image">
                            {/* Placeholder for an actual image */}
                            <div className="img-placeholder">Traditional Kerala Home Image</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section map-section">
                <div className="container">
                    <h2 className="text-center">Find Us</h2>
                    <div className="map-container text-center" style={{ padding: '40px', background: '#f9f9f9' }}>
                        <p style={{ marginBottom: '20px', fontSize: '1.2rem' }}>
                            We are located in the heart of Munnar's scenic landscape.
                        </p>
                        <a
                            href="https://maps.app.goo.gl/FMKLfibFQagTwttU7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            View on Google Maps
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
