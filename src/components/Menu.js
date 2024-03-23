import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Hook de React Router pour naviguer programmablement

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const goToHome = () => {
        closeMenu(); // Ferme le menu
        navigate('/'); // Navigue programmablement à la page d'accueil
        window.location.reload(); // Rafraîchit la page pour simuler une navigation complète
    };
    // Style pour le menu vertical
    const menuStyle = {
        position: 'fixed',
        top: '50%', // Déplace le menu au milieu de l'écran verticalement
        right: 0,
        width: menuOpen ? '250px' : '0', // Augmente la largeur lorsque le menu est ouvert
        transform: 'translateY(-50%)', // Centre le menu verticalement
        backgroundColor: 'gray',
        overflowX: 'hidden',
        transition: 'width 0.5s',
        padding: menuOpen ? '20px' : '0px',
        zIndex: 100
    };

    // Style pour le bouton du menu (hamburger)
    const hamburgerStyle = {
        position: 'fixed',
        top: '15px',
        right: '15px',
        cursor: 'pointer',
        backgroundColor: 'white', // Ajoute une couleur de fond
        color: 'black',
        fontSize: '50px', // Augmente la taille de l'icône hamburger
        zIndex: 201
    };

    // Style pour chaque élément du menu
    const linkStyle = {
        display: 'block', // Rend chaque lien sur une nouvelle ligne
        backgroundColor: '#f0f0f0', // Fond clair pour chaque lien
        color: 'black',
        padding: '10px', // Augmente le padding pour un meilleur toucher
        margin: '5px 0', // Espacement entre les liens
        textDecoration: 'none',
        borderRadius: '5px', // Bords arrondis pour les liens
        textAlign: 'center' // Centrer le texte dans le lien
    };

    return (
        <div>
            <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <div style={menuStyle}>
                <div style={linkStyle} onClick={goToHome}>Accueil</div>
                <Link to="/articles" style={linkStyle} onClick={closeMenu}>Articles</Link>
                <Link to="/contact" style={linkStyle} onClick={closeMenu}>Contactez-nous</Link>
                <Link to="/quiz" style={linkStyle} onClick={closeMenu}>Quiz</Link>
                <Link to="/register" style={linkStyle} onClick={closeMenu}>Inscription</Link>
                <Link to="/connexion" style={linkStyle} onClick={closeMenu}>Connexion</Link>
                <Link to="/about" style={linkStyle} onClick={closeMenu}>À propos</Link> {/* Ajoutez cette ligne pour inclure "À propos" dans le menu */}
                {/* Ajoutez d'autres liens au besoin */}
            </div>
        </div>
    );
}

export default Menu;