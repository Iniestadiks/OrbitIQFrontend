import React, { useState } from 'react';

function CGU() {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
        // Vous pouvez ajouter d'autres actions ici, comme rediriger l'utilisateur après l'acceptation
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Conditions Générales d'Utilisation (CGU)</h1>

            <h2>Bienvenue sur OrbitIQ</h2>
            <p>Ces conditions générales régissent votre utilisation de notre application OrbitIQ et de toutes les fonctionnalités associées. En utilisant notre application, vous acceptez ces conditions dans leur intégralité; si vous êtes en désaccord avec ces conditions ou une partie de ces conditions, vous ne devez pas utiliser cette application.</p>

            <h2>Propriété intellectuelle</h2>
            <p>Le contenu publié sur OrbitIQ, y compris les textes, graphiques, images, vidéos, informations et tout autre matériel est protégé par le droit d'auteur et les autres droits de propriété intellectuelle appartenant à OrbitIQ ou à ses partenaires. Sauf autorisation expresse, aucun de ces éléments ne peut être reproduit ou utilisé de quelque manière que ce soit.</p>

            <h2>Utilisation acceptable</h2>
            <p>Vous vous engagez à ne pas utiliser OrbitIQ de manière à causer des dommages à l'application ou une altération de la disponibilité ou de l'accessibilité de celle-ci. L'utilisation abusive de l'application sous toute forme est strictement interdite.</p>

            <h2>Exactitude de l'information</h2>
            <p>Tous les efforts ont été faits pour s'assurer de l'exactitude des informations présentées sur OrbitIQ. Cependant, nous ne pouvons garantir que toutes les informations sont complètes, précises ou à jour.</p>

            <h2>Limitation de responsabilité</h2>
            <p>Dans la mesure maximale permise par la loi applicable, nous excluons toutes les représentations, garanties et conditions relatives à notre application et à l'utilisation de cette application.</p>

            <h2>Modifications</h2>
            <p>Nous nous réservons le droit de réviser ces conditions générales d'utilisation à tout moment sans préavis. Vous êtes censé avoir accepté la version la plus récente de ces conditions générales chaque fois que vous utilisez l'application.</p>

            <h2>Contact</h2>
            <p>Pour toutes questions ou demandes de renseignements, veuillez nous contacter via notre formulaire de contact disponible sur l'application.</p>

            <h2>Loi et juridiction</h2>
            <p>Ces conditions générales seront régies et interprétées conformément aux lois de France, et tout litige relatif à ces conditions générales sera soumis à la juridiction exclusive des tribunaux de France.</p>

            {!accepted && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleAccept} style={{ backgroundColor: 'grey', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>J'accepte les conditions</button>
                </div>
            )}
            {accepted && (
                <p style={{ marginTop: '20px', color: 'green' }}>Merci d'avoir accepté les conditions d'utilisation.</p>
            )}
        </div>
    );
}

export default CGU;