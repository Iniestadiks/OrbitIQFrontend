import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
        } else {
            // Insérez ici la logique pour envoyer les données du formulaire au backend
            console.log(formData);
            alert('Inscription réussie !');
            // Réinitialiser le formulaire après soumission
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            setErrorMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,.2)' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Inscription</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '15px' }}>
                    Nom
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>
                <label style={{ marginBottom: '15px' }}>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>
                <label style={{ marginBottom: '15px' }}>
                    Mot de passe
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>
                <label style={{ marginBottom: '20px' }}>
                    Confirmer le mot de passe
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" style={{ backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', padding: '15px 30px', cursor: 'pointer', display: 'block', width: '100%' }}>S'inscrire</button>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                Vous avez déjà un compte? <Link to="/connexion" style={{ color: '#007bff' }}>Se connecter</Link>
            </div>
            </form>
        </div>
    );
}

export default RegisterForm;
