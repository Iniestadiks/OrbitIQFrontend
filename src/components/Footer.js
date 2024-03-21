import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            padding: '20px', // Ajuste le padding si nécessaire
            zIndex: 10 // Assure-toi que le z-index est approprié pour que le footer reste sous les éléments interactifs
        }}>
            {/* Autres éléments du footer */}
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Nous contacter</Link> | 
            <Link to="/faq" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>FAQ</Link> | 
            <Link to="/cgu" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>CGU</Link> | 
            <Link to="/newsletter" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Newsletter</Link> | 
            <Link to="/socials" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Réseaux Sociaux</Link> | 
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>À propos</Link>  | 
            <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link> 
        </footer>
    );
}

export default Footer;