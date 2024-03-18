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
        // Ajoutez ici la logique pour envoyer les données du formulaire à votre service de newsletter
        alert(`Inscription réussie avec le nom : ${formData.name} et l'adresse e-mail : ${formData.email}`);
        setFormData({
            name: '',
            email: ''
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Inscription à la Newsletter</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px' }}>
                    Nom :
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ marginTop: '5px' }}
                    />
                </label>
                <label style={{ marginBottom: '10px' }}>
                    e-mail :
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ marginTop: '5px' }}
                    />
                </label>
                <button type="submit" style={{ marginTop: '10px', alignSelf: 'center', width: '150px', backgroundColor: 'blue', color: 'white' }}>S'inscrire</button>
            </form>
        </div>
    );
}

export default NewsletterSignup;
