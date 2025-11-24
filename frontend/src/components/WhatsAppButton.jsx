import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/917305395094"
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="whatsapp-icon" />
        </a>
    );
};

export default WhatsAppButton;
