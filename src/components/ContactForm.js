import React, { useState } from 'react';
import './ContactForm.css';
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ajoutez ici la logique pour envoyer les données du formulaire de contact
        console.log(formData);
        alert('Message envoyé !');
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <div className="contact-form-container">
            <h1>Contactez-nous</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adresse e-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Téléphone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default ContactForm;

// je garde ce logique pour le connecter avec le backend mais en premier temps nous utilisons seule la ligique du frontend.

// import React, { useState } from 'react';
// import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP

// function ContactForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         message: ''
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         try {
//             // Envoyez les données du formulaire au backend Laravel
//             const response = await axios.post('http://localhost:8000/api/contact', formData);
//             console.log(response.data); // Affiche la réponse du serveur
//             alert('Message envoyé avec succès !');
//             // Réinitialise le formulaire après l'envoi réussi
//             setFormData({
//                 name: '',
//                 email: '',
//                 phone: '',
//                 message: ''
//             });
//         } catch (error) {
//             console.error('Une erreur s\'est produite lors de l\'envoi du formulaire :', error);
//             alert('Une erreur s\'est produite lors de l\'envoi du formulaire.');
//         }
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//             <h1 style={{ textAlign: 'center' }}>Contactez-nous</h1>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <label style={{ marginBottom: '10px', width: '100%' }}>
//                     Nom 
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         style={{ marginTop: '5px', width: '100%' }}
//                     />
//                 </label>
//                 <label style={{ marginBottom: '10px', width: '100%' }}>
//                     Adresse e-mail 
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         style={{ marginTop: '5px', width: '100%' }}
//                     />
//                 </label>
//                 <label style={{ marginBottom: '10px', width: '100%' }}>
//                     Téléphone 
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                         style={{ marginTop: '5px', width: '100%' }}
//                     />
//                 </label>
//                 <label style={{ marginBottom: '10px', width: '100%' }}>
//                     Message 
//                     <textarea
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                         rows="4"
//                         style={{ marginTop: '5px', width: '100%' }}
//                     ></textarea>
//                 </label>
//                 <button type="submit" style={{ marginTop: '10px', width: '150px', backgroundColor: 'blue', color: 'white' }}>Envoyer</button>
//             </form>
//         </div>
//     );
// }

// export default ContactForm;
