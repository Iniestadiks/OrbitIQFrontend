import React, { useState } from 'react';
import NewsletterSignup from './NewsletterSignup';

function Newsletter() {
    const [showSignupForm, setShowSignupForm] = useState(false);

    const handleSignupClick = () => {
        setShowSignupForm(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Newsletter</h1>
            <p>Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.</p>
            {showSignupForm ? (
                <NewsletterSignup />
            ) : (
                <a href="#inscription-newsletter" onClick={handleSignupClick} style={{ textDecoration: 'none', backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', display: 'inline-block' }}>S'inscrire à la newsletter</a>
            )}
        </div>
    );
}

export default Newsletter;


// export default Newsletter;