import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css'; // We'll add specific styles here or use inline/modules

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Rooms & Booking', path: '/booking' },
        { name: 'House Rules', path: '/rules' },
        { name: 'Attractions', path: '/attractions' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    Krish Homestay
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) => isActive ? 'nav-links active-link' : 'nav-links'}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <li className="nav-item">
                        <Link to="/booking" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>
                            Book Now
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
