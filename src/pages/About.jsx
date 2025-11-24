import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="page-header">
                <div className="container">
                    <h1>About Krish Homestay</h1>
                </div>
            </div>

            <div className="container section">
                <div className="about-story">
                    <div className="story-text">
                        <h2>Our Story</h2>
                        <p>
                            Krish Homestay is more than just a place to stay; it's a reflection of the warm hospitality and rich culture of Kerala.
                            Located in the picturesque hills of Munnar, our homestay was built with a vision to provide travellers with an authentic
                            experience of life in the high ranges.
                        </p>
                        <p>
                            We believe in the philosophy of "Atithi Devo Bhava" (The guest is God). Our home is open to those who seek peace,
                            tranquility, and a connection with nature. We take pride in maintaining a clean, silent, and respectful environment
                            where you can unwind and rejuvenate.
                        </p>
                        <p>
                            From the moment you step in, you'll be greeted by the fresh mountain air and the soothing sounds of nature.
                            Whether you're here for a weekend getaway or a long retreat, we ensure that your stay is comfortable and memorable.
                        </p>
                    </div>
                    <div className="story-image">
                        <div className="img-placeholder-large">Homestay Exterior View</div>
                    </div>
                </div>

                <div className="values-section mt-4">
                    <h2 className="text-center">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Tranquility</h3>
                            <p>We maintain a quiet atmosphere to ensure all guests can relax without disturbance.</p>
                        </div>
                        <div className="value-card">
                            <h3>Cleanliness</h3>
                            <p>Hygiene is our top priority. We ensure that our rooms and common areas are spotless.</p>
                        </div>
                        <div className="value-card">
                            <h3>Authenticity</h3>
                            <p>Experience the true essence of Kerala culture and hospitality.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
