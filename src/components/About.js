import React from 'react';

function About() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h1>À propos de nous</h1>
            <p>Notre équipe est dédiée à rendre l'exploration spatiale accessible et passionnante pour tous.</p>
            <div className="team-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                {/* Le porteur et chef de projet */}
                <div className="team-member" style={{ maxWidth: '340px', margin: '0 auto' }}>
                    <img src="/images/personnel/Romain MICHALEX.png" alt="Romain" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                    <h3>Romain (CP)</h3>
                    <p>Porteur et Chef de projet - Passionné par les nouvelles technologies et l'espace, Romain aime transformer les concepts complexes en créations accessibles.</p>
                </div>
                
                {/* Les trois chargés de projet */}
                <div className="team-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    <div className="team-member" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <img src="/images/personnel/Sebastien PRIETO.png" alt="Sebastien" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <h3>Sebastien (CP)</h3>
                        <p>Chargé de projet - Avec une grande attention aux détails, Sebastien assure que chaque partie de notre projet répond aux plus hauts standards.</p>
                    </div>
                    <div className="team-member" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <img src="/images/personnel/Wissal EL ALAMI.png" alt="Wissal" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <h3>Wissal (CP)</h3>
                        <p>Chargé de projet - Wissal apporte sa curiosité et son énergie à l'équipe, inspirant de nouvelles idées et perspectives.</p>
                    </div>
                    <div className="team-member" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <img src="/images/personnel/Duckens DOS.png" alt="Duckens" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <h3>Duckens (CP)</h3>
                        <p>Chargé de projet - Duckens est le moteur créatif de l'équipe, toujours prêt à explorer de nouveaux horizons et à repousser les limites.</p>
                    </div>
                </div>

                {/* Les développeurs */}
                <div className="team-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    <div className="team-member" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <img src="/images/personnel/Madicke GUEYE.png" alt="Madicke" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <h3>Madicke (AW)</h3>
                        <p>Développeur Front-End - Madicke combine son amour pour le design et la programmation web pour créer des expériences utilisateur inoubliables.</p>
                    </div>
                    <div className="team-member" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <img src="/images/personnel/Jospin M KAMBEMBA.png" alt="Jospin" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <h3>Jospin (AW)</h3>
                        <p>Développeur Back-End - Jospin est passionné par le codage et aime résoudre des problèmes complexes pour rendre le web plus beau et fonctionnel.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;