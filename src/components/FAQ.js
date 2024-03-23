import React, { useState } from 'react';
import './FAQ.css'; 

// Exemple de données pour la FAQ avec plus de questions
const faqData = [
    { question: "Qu'est-ce que OrbitIQ ?", answer: "OrbitIQ est une application éducative dédiée à l'exploration spatiale. Elle permet aux utilisateurs de tous âges de découvrir l'univers de manière interactive et ludique." },
    { question: "Qui peut utiliser OrbitIQ ?", answer: "Tout le monde ! OrbitIQ est conçue pour être accessible et facile à utiliser pour les personnes de tous âges, des enfants aux adultes." },
    { question: "Comment puis-je accéder à OrbitIQ ?", answer: "OrbitIQ est accessible en ligne. Vous pouvez y accéder via un navigateur web sur un ordinateur, une tablette ou un smartphone." },
    { question: "OrbitIQ est-elle gratuite ?", answer: "Oui, OrbitIQ est une application gratuite. Nous croyons à la démocratisation de l'éducation spatiale pour tous." },
    { question: "Puis-je contribuer à OrbitIQ ?", answer: "Absolument, nous accueillons les contributions de la communauté. Si vous souhaitez contribuer, veuillez nous contacter via notre formulaire de contact." },
    { question: "Quelles fonctionnalités offre OrbitIQ ?", answer: "OrbitIQ propose des explorations interactives en 3D de l'espace, des quizz, des fiches de connaissances, et bien plus encore." },
    { question: "Comment OrbitIQ met-elle à jour ses informations ?", answer: "Nous collaborons avec des organismes de recherche pour vous fournir les informations les plus récentes et précises sur l'espace." },
    { question: "Puis-je utiliser OrbitIQ pour des projets éducatifs ?", answer: "Oui, OrbitIQ est une excellente ressource pour l'éducation et peut être utilisée en salle de classe ou à la maison pour des projets éducatifs." },
    { question: "OrbitIQ propose-t-elle des activités pour les enfants ?", answer: "Oui, nous proposons des activités et des quizz conçus spécialement pour les enfants, afin de les aider à apprendre tout en s'amusant." },
    { question: "Comment puis-je obtenir de l'aide si je rencontre des problèmes avec OrbitIQ ?", answer: "Si vous avez besoin d'aide, n'hésitez pas à consulter notre section d'aide ou à nous contacter directement via notre formulaire de contact." },
    { question: "OrbitIQ est-elle disponible dans plusieurs langues ?", answer: "Pour l'instant, OrbitIQ est principalement disponible en français, mais nous travaillons à l'ajouter d'autres langues prochainement." },
    { question: "Puis-je partager des contenus trouvés sur OrbitIQ ?", answer: "Oui, vous pouvez partager des contenus éducatifs, mais assurez-vous de mentionner OrbitIQ comme source." },
    { question: "Comment puis-je suivre les mises à jour d'OrbitIQ ?", answer: "Vous pouvez nous suivre sur les réseaux sociaux ou vous inscrire à notre newsletter pour rester informé des dernières mises à jour." },
    { question: "OrbitIQ a-t-elle une application mobile ?", answer: "Nous travaillons sur le développement d'une application mobile pour rendre OrbitIQ encore plus accessible." },
    { question: "Comment puis-je soutenir OrbitIQ ?", answer: "Le meilleur soutien est de parler d'OrbitIQ autour de vous ! Nous apprécions également les dons pour aider à maintenir et développer l'application." },
    { question: "Puis-je proposer des suggestions ou des idées pour OrbitIQ ?", answer: "Oui, vos retours sont précieux ! N'hésitez pas à nous envoyer vos suggestions via notre formulaire de contact." }
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1 className="faq-title">Foire aux questions (FAQ)</h1>
            <div className="faq-content">
                {faqData.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <h3 className="faq-question">
                            {faq.question}
                            <span className="faq-icon">{activeIndex === index ? '▲' : '▼'}</span>
                        </h3>
                        <p className="faq-answer">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;