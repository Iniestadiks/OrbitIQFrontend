import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Socials() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Suivez-nous sur les réseaux sociaux</h1>
            <p>Retrouvez-nous sur Twitter, Facebook, Instagram...</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <a href="https://www.facebook.com/votre-page-facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF style={{ fontSize: '24px', color: '#3b5998' }} />
                </a>
                <a href="https://twitter.com/votre-compte-twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter style={{ fontSize: '24px', color: '#00acee' }} />
                </a>
                <a href="https://www.instagram.com/votre-compte-instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram style={{ fontSize: '24px', color: '#C13584' }} />
                </a>
                {/* Ajoute d'autres icônes de réseaux sociaux ici */}
            </div>
        </div>
    );
}

export default Socials;