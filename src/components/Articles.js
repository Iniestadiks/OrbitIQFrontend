import React, { useState } from 'react';
import './Articles.css'; // Assurez-vous que ce fichier existe dans votre dossier de styles

function Articles() {
    const [articles, setArticles] = useState([
        { id: 1, title: "La Planète Jupiter", summary: "Jupiter est la plus grande planète du système solaire...", link: "https://fr.wikipedia.org/wiki/Jupiter_(plan%C3%A8te)" },
        { id: 2, title: "Exploration de Mars", summary: "Mars a toujours fasciné l'humanité...", link: "https://www.asc-csa.gc.ca/fra/astronomie/systeme-solaire/mars.asp" },
        { id: 3, title: "Les Mystères de Saturne", summary: "Saturne est connue pour ses magnifiques anneaux...", link: "https://www.nationalgeographic.fr/espace/saturne-cette-planete-faite-de-gaz-et-de-mysteres" },
        { id: 4, title: "Voyage vers Neptune", summary: "Neptune, une planète lointaine et mystérieuse...", link: "https://www.maxisciences.com/sciences/astronomie/neptune_art47376.html" },
        { id: 5, title: "La lumineuse Vénus", summary: "Vénus, notre voisine brillante et sulfureuse...", link: "https://www.numerama.com/sciences/623008-pourquoi-venus-semble-t-elle-si-brillante-en-ce-moment.html" },
    ]);

    return (
        <div className="articles-container">
            <h1>Articles sur l'espace</h1>
            <div className="articles-list">
                {articles.map(article => (
                    <div key={article.id} className="article-item">
                        <h2>{article.title}</h2>
                        <p>{article.summary}</p>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">Lire la suite</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Articles;