import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            padding: '20px',
            zIndex: 10
        }}>
            <div style={{ marginBottom: '10px' }}>
                <a href="https://www.facebook.com/votre-page-facebook" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                    <FaFacebookF />
                </a>
                <a href="https://twitter.com/votre-compte-twitter" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                    <FaTwitter />
                </a>
                <a href="https://www.instagram.com/votre-compte-instagram" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                    <FaInstagram />
                </a>
            </div>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Nous contacter</Link> | 
            <Link to="/faq" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>FAQ</Link> | 
            <Link to="/cgu" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>CGU</Link> | 
            <Link to="/newsletter" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Newsletter</Link> | 
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>À propos</Link> | 
            <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link>
            <div>
                <p style={{ fontSize: '14px', margin: '0' }}>© {currentYear} ORBITIQ. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer;