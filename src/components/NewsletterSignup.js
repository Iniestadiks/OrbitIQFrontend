import React, { useState } from 'react';

function NewsletterSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logique d'envoi des données du formulaire
        alert(`Inscription réussie pour ${formData.name} avec l'e-mail : ${formData.email}`);
        setFormData({
            name: '',
            email: ''
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Inscription à la Newsletter</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label style={{ marginBottom: '10px', width: '100%' }}>
                    Nom :
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ marginTop: '5px', width: '100%', padding: '10px' }}
                    />
                </label>
                <label style={{ marginBottom: '10px', width: '100%' }}>
                    E-mail :
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ marginTop: '5px', width: '100%', padding: '10px' }}
                    />
                </label>
                <button type="submit" style={{ 
                    marginTop: '20px', 
                    alignSelf: 'center', 
                    width: '200px', 
                    backgroundColor: 'grey',  // Change to fit your color scheme
                    color: 'white', 
                    padding: '15px 30px', 
                    border: 'none', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'  // Larger font size
                }}>S'inscrire</button>
            </form>
        </div>
    );
}

export default NewsletterSignup;