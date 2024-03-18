import React from 'react';

function Socials() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Suivez-nous sur les réseaux sociaux</h1>
            <p>Retrouvez-nous sur Twitter, Facebook, Instagram...</p>
            <a href="https://www.facebook.com/votre-page-facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
            <span> | </span>
            <a href="https://twitter.com/votre-compte-twitter" target="_blank" rel="noopener noreferrer">Twitter</a>
            <span> | </span>
            <a href="https://www.instagram.com/votre-compte-instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
            {/* Ajoute les liens vers les réseaux sociaux ici */}
        </div>
    );
}

export default Socials;