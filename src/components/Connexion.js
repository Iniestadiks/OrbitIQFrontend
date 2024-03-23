import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // N'oubliez pas d'importer Link de 'react-router-dom'

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
        alert('Connexion réussie !');
        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Connexion</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ display: 'block', marginBottom: '20px' }}>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }} />
                </label>
                <label style={{ display: 'block', marginBottom: '20px' }}>
                    Mot de passe
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '8px' }} />
                </label>
                <button type="submit" style={{ backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', padding: '12px 20px', cursor: 'pointer', fontSize: '18px' }}>Se connecter</button>
            </form>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                Vous n'avez pas encore de compte? <Link to="/register" style={{ color: '#007bff' }}>Inscrivez-vous</Link>
            </div>
        </div>
    );
}

export default ConnexionForm;