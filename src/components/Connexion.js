import React, { useState } from 'react';

function ConnexionForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Insérez ici la logique pour traiter les données du formulaire (par exemple, vérifier les informations de connexion)
        alert('Connexion réussie !');
        // Réinitialiser les valeurs des champs après la connexion réussie
        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
                    />
                </label>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    Mot de passe
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
                    />
                </label>
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Se connecter</button>
            </form>
        </div>
    );
}

export default ConnexionForm;
