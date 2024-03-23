import React, { useState } from 'react';
import NewsletterSignup from './NewsletterSignup';

function Newsletter() {
    const [showSignupForm, setShowSignupForm] = useState(false);

    const handleSignupClick = (e) => {
        e.preventDefault(); // Prévenir le comportement par défaut du lien
        setShowSignupForm(true);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Newsletter</h1>
            <p>Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.</p>
            {showSignupForm ? (
                <NewsletterSignup />
            ) : (
                <button onClick={handleSignupClick} style={{ 
                    textDecoration: 'none', 
                    backgroundColor: 'grey', // Couleur grise pour respecter la charte
                    color: 'white', 
                    padding: '15px 30px', // Plus grand bouton
                    borderRadius: '5px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '18px', // Police plus grande pour une meilleure lisibilité
                    marginTop: '10px' // Ajoutez un peu d'espace au-dessus du bouton
                }}>S'inscrire à la newsletter</button>
            )}
        </div>
    );
}

export default Newsletter;


// export default Newsletter;