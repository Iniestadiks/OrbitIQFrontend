import React, { useState } from 'react';

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
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Inscription</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                    <label style={{ marginBottom: '10px' }}>
                        Nom
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
                        />
                    </label>
                    <label style={{ marginBottom: '10px' }}>
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
                </div>
                <label style={{ marginBottom: '10px' }}>
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
                <label style={{ marginBottom: '10px' }}>
                    Confirmer le mot de passe
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
                    />
                </label>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>S'inscrire</button>
            </form>
        </div>
    );
}

export default RegisterForm;
