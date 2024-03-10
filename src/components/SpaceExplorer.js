import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
import { gsap } from 'gsap';


function SpaceExplorer() {
    const mountRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(true);
    // Ajout d'un nouvel état pour stocker les informations des diamètres
    const [diametersInfo, setDiametersInfo] = useState([]);
    const [rotationSpeed, setRotationSpeed] = useState(1); // Pour la vitesse de rotation
    const [diameterScale, setDiameterScale] = useState(1); // Pour l'échelle des diamètres
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [camera, setCamera] = useState(null); // Ajouté pour maintenir une référence à la caméra
    const infoBoxRef = useRef(null); // Référence pour accéder à la boîte d'informations

      // État pour contrôler l'opacité et l'échelle de la boîte d'informations
  const [infoBoxStyle, setInfoBoxStyle] = useState({
    opacity: 0,
    transform: 'scale(0)'
  });

// Fonction pour réinitialiser la vue
const resetView = () => {
    if (!camera) return; // Assurez-vous que la caméra est initialisée

    setSelectedPlanet(null); // Efface la planète sélectionnée
    // Cache la boîte d'informations
    setInfoBoxStyle({
    opacity: 0,
    transform: 'scale(0)'
  });
    // Réinitialise la position de la caméra et le FOV avec animation
    gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 150, // Retour à la position initiale
        duration: 1,
        onComplete: () => {
          camera.fov = 75; // FOV initial
          camera.updateProjectionMatrix();
        }
    });

  };

    const planetDetails = {
      Mercure: {
        type: "Planète rocheuse",
        taille: "4,879 km",
        composition: "Roches et métaux",
        masse: "3.30 × 10^23 kg",
        distance: "57.9 million km",
        apparence: "Surface grise criblée de cratères",
        rotation: "58.6 jours terrestres",
        orbite: "88 jours terrestres"
      },
      Vénus: {
        type: "Planète rocheuse",
        taille: "12,104 km",
        composition: "Atmosphère de dioxyde de carbone avec des nuages d'acide sulfurique",
        masse: "4.87 × 10^24 kg",
        distance: "108.2 million km",
        apparence: "Couvert de nuages jaunes denses",
        rotation: "243 jours terrestres (rétrograde)",
        orbite: "225 jours terrestres"
      },
      Terre: {
        type: "Planète rocheuse",
        taille: "12,742 km",
        composition: "Azote et oxygène avec une surface d'eau et de terre",
        masse: "5.97 × 10^24 kg",
        distance: "149.6 million km",
        apparence: "Planète bleue avec des océans et des continents",
        rotation: "24 heures",
        orbite: "365.25 jours"
      },
      Mars: {
        type: "Planète rocheuse",
        taille: "6,779 km",
        composition: "Dioxyde de carbone, azote, et argon",
        masse: "6.39 × 10^23 kg",
        distance: "227.9 million km",
        apparence: "Surface rouge avec des calottes polaires de glace",
        rotation: "1.03 jours terrestres",
        orbite: "687 jours terrestres"
      },
      Jupiter: {
        type: "Géante gazeuse",
        taille: "139,820 km",
        composition: "Hydrogène et hélium",
        masse: "1.90 × 10^27 kg",
        distance: "778.5 million km",
        apparence: "Planète rayée avec une grande tache rouge",
        rotation: "9.9 heures",
        orbite: "11.86 années terrestres"
      },
      Saturne: {
        type: "Géante gazeuse",
        taille: "116,460 km",
        composition: "Hydrogène, hélium, et méthane",
        masse: "5.68 × 10^26 kg",
        distance: "1.43 milliard km",
        apparence: "Planète jaune avec des anneaux distinctifs",
        rotation: "10.7 heures",
        orbite: "29.5 années terrestres"
      },
      Uranus: {
        type: "Géante de glace",
        taille: "50,724 km",
        composition: "Hydrogène, hélium, et eau",
        masse: "8.68 × 10^25 kg",
        distance: "2.87 milliard km",
        apparence: "Planète bleu-vert sans caractéristiques de surface distinctes",
        rotation: "17.2 heures",
        orbite: "84 années terrestres"
      },
      Neptune: {
        type: "Géante de glace",
        taille: "49,244 km",
        composition: "Hydrogène, hélium, et méthane",
        masse: "1.02 × 10^26 kg",
        distance: "4.5 milliard km",
        apparence: "Planète bleue avec des nuages blancs rapides",
        rotation: "16 heures",
        orbite: "164.8 années terrestres"
      }
    };
    const planetTextures = {
        Mercure: '/images/Planètes/8k_mercury.jpg',
        Vénus: '/images/Planètes/8k_venus_surface.jpg',
        Terre: '/images/Terre/8k_earth_daymap.jpg',
        Mars: '/images/Planètes/8k_mars.jpg',
        Jupiter: '/images/Planètes/8k_jupiter.jpg',
        Saturne: '/images/Planètes/8k_saturn.jpg',
        Uranus: '/images/Planètes/2k_uranus.jpg',
        Neptune: '/images/Planètes/2k_neptune.jpg'
      };
      
      
    useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      setCamera(camera); // Stocke la caméra dans l'état
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
      const textureLoader = new THREE.TextureLoader(); // Déclarez textureLoader ici
      const loader = new FontLoader();
      // Création du fond étoilé
      const createStars = () => {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.5 });
        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
          starsVertices.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        scene.add(new THREE.Points(starsGeometry, starsMaterial));
      };
      createStars();
  
      // Amélioration du Soleil avec un effet lumineux comme une lampe
      const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
      const sunMaterial = new THREE.MeshPhongMaterial({
        color: 0xffa500,
        emissive: 0xffa500,
        shininess: 100
      });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);
  
      // Ajout d'une lumière pour accentuer l'effet lumineux du soleil
      const sunlight = new THREE.PointLight(0xffd700, 5, 1000);
      sunlight.position.set(0, 0, 0);
      scene.add(sunlight);
  
      // Ajout de LensFlare pour un effet de lumière plus dramatique
      const lensflareImgPath = `${process.env.PUBLIC_URL}/images/lensflare.png`;
      textureLoader.load(lensflareImgPath, (texture) => {
        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(texture, 700, 0));
        sun.add(lensflare);
      });
  
      camera.position.set(0, 0, 150);
      new OrbitControls(camera, renderer.domElement);
  
        const planetInfo = [];
        loader.load('fonts/Sixty_Regular.json', (font) => {
          const planetNames = ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune"];
          const planetSpeeds = {"Mercure": 4.74, "Vénus": 3.5, "Terre": 2.98, "Mars": 2.41, "Jupiter": 1.31, "Saturne": 0.97, "Uranus": 0.68, "Neptune": 0.54};
          const planetDiameters = {
              "Mercure": 4879,
              "Vénus": 12104,
              "Terre": 12742,
              "Mars": 6779,
              "Jupiter": 139820,
              "Saturne": 116460,
              "Uranus": 50724,
              "Neptune": 49244,
            };
          const diametersArray = []; // Pour stocker les informations des diamètres pour l'affichage
          
          // Assurez-vous que textureLoader est bien défini quelque part dans votre code
        const textureLoader = new THREE.TextureLoader();

        planetNames.forEach((name, index) => {
    const radius = 20 + index * 5; // Définit la distance de chaque planète par rapport au centre
    const angle = Math.random() * Math.PI * 2; // Crée un angle aléatoire pour chaque planète
    const orbitSpeed = planetSpeeds[name] * 0.0001;

    // Crée une orbite circulaire pour chaque planète
    const points = [];
    for (let i = 0; i <= 360; i++) {
        const radians = THREE.MathUtils.degToRad(i);
        points.push(new THREE.Vector3(Math.cos(radians) * radius, Math.sin(radians) * radius, 0));
    }
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa })));

    // Crée un texte pour chaque planète
    const textGeometry = new TextGeometry(name, { font, size: 3, height: 0.1 });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    textMesh.name = `Text_${name}`; // Important pour la détection de clic
    scene.add(textMesh);

    // Création de la sphère de la planète
    const scaledDiameter = (planetDiameters[name] / 12742) * diameterScale;
    const planetGeometry = new THREE.SphereGeometry(scaledDiameter, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x555555, 
        transparent: true, 
        opacity: 0 // Initialement transparent, deviendra visible lors de la sélection
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    planetMesh.name = `Planet_${name}`;
    scene.add(planetMesh);
    
    planetInfo.push({
        textMesh,
        planetMesh,
        radius,
        angle,
        speed: orbitSpeed,
        originalDiameter: scaledDiameter // Stockez le diamètre initial pour les références futures
    });
});

        // Met à jour le state avec les informations des diamètres des planètes
        setDiametersInfo(diametersArray);
        });
          
  
    
        // Fonction d'animation
const animate = () => {
    requestAnimationFrame(animate);

    // Rotation du soleil
    sun.rotation.y += 0.004 * rotationSpeed;

    planetInfo.forEach(planet => {
    if (isAnimating) {
        planet.angle += planet.speed * rotationSpeed;
        const x = Math.cos(planet.angle) * planet.radius;
        const y = Math.sin(planet.angle) * planet.radius;
        planet.textMesh.position.set(x, y, 0);
        planet.planetMesh.position.set(x, y, 0);
    }

    // Appliquez l'échelle basée sur diameterScale tout en maintenant la possibilité de zoom personnalisé
    if (!planet.customZoom) { // Assurez-vous que cette propriété est définie lors du zoom
        const scale = diameterScale * (planet.initialScale || 1);
        planet.planetMesh.scale.set(scale, scale, scale);
    }
});

    renderer.render(scene, camera);
};

      
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onMouseClick(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
    
        for (let intersect of intersects) {
            // Nous vérifions si l'objet cliqué est le texte associé à une planète
            if (intersect.object.name.startsWith('Text_')) {
                const planetName = intersect.object.name.split('_')[1];
                setSelectedPlanet(planetName);  // Mise à jour de l'état avec le nom de la planète sélectionnée
    
                // Récupération de la sphère de la planète associée au texte cliqué
                const selectedPlanetMesh = scene.getObjectByName(`Planet_${planetName}`);
                if (selectedPlanetMesh) {
                    // Appliquer la texture à la planète sélectionnée
                    const texture = new THREE.TextureLoader().load(planetTextures[planetName]);
                    selectedPlanetMesh.material.map = texture;
                    selectedPlanetMesh.material.opacity = 1;  // Rendre la texture visible
                    selectedPlanetMesh.material.needsUpdate = true;
    
                    // Animation de la caméra pour le zoom sur la planète
                    gsap.to(camera.position, {
                        x: selectedPlanetMesh.position.x,
                        y: selectedPlanetMesh.position.y,
                        z: 50,  // Plus près de la planète
                        duration: 2,
                        onComplete: () => {
                            // Activation des contrôles d'Orbit après le zoom
                            const controls = new OrbitControls(camera, renderer.domElement);
                            controls.target.set(selectedPlanetMesh.position.x, selectedPlanetMesh.position.y, selectedPlanetMesh.position.z);
                            controls.update();
                        }
                    });
    
                    // Animation pour agrandir la planète sélectionnée
                    gsap.to(selectedPlanetMesh.scale, {
                        x: 5,  // Ajustez pour un meilleur effet de zoom
                        y: 5,
                        z: 5,
                        duration: 2,
                        onComplete: () => {
                            // Retard pour l'affichage des informations de la planète
                            setTimeout(() => {
                                setInfoBoxStyle({
                                    opacity: 1,
                                    transform: 'scale(1)',
                                    transition: 'opacity 2s, transform 2s'
                                });
                            }, 2000);  // Delai avant d'afficher les informations
                        }
                    });
                }
                break;  // Sortie de la boucle une fois la planète trouvée
            }
        }
    }
    
    window.addEventListener('click', onMouseClick);
  
        animate();
    
        return () => {
            if (mountRef.current && renderer.domElement) {
              mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('click', onMouseClick);
          };
      }, [isAnimating, rotationSpeed, diameterScale]); 

      return (
    <div style={{ position: "relative", width: '100vw', height: '100vh' }}>
      {/* Wrapper pour les contrôles avec fond semi-transparent pour une meilleure visibilité */}
      <div style={{
        position: "absolute",
        bottom: 20, // Placé en bas de la vue
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0,0,0,0.7)", // Fond plus sombre pour une meilleure visibilité
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}>
        {/* Bouton pour contrôler l'animation */}
        <button onClick={() => setIsAnimating(!isAnimating)} style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
          {isAnimating ? 'Stopper le Temps' : 'Reprendre le Temps'}
        </button>
        {/* Contrôles pour ajuster la vitesse et le diamètre des planètes */}
        <div>
          <label htmlFor="speedSlider" style={{ marginRight: "10px" }}>Varier la vitesse</label>
          <input id="speedSlider" type="range" min="250" max="500" step="0.1" value={rotationSpeed} onChange={e => setRotationSpeed(parseFloat(e.target.value))} />
        </div>
        <div>
          <label htmlFor="diameterSlider" style={{ marginRight: "10px" }}>Varier le diamètre</label>
          <input id="diameterSlider" type="range" min="1" max="10" step="0.1" value={diameterScale} onChange={e => setDiameterScale(parseFloat(e.target.value))} />
        </div>
      </div>
      {/* Zone d'affichage de la scène 3D */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    
     {/* Nouvelle section pour les informations détaillées de la planète sélectionnée */}
    {/* Nouvelle section pour les informations détaillées de la planète sélectionnée */}
{selectedPlanet && (
  <div className="planet-details" style={{
    ...infoBoxStyle, // Applique les styles dynamiques
    position: 'absolute',
    top: '10%',
    left: '10px', // Modifiez ceci pour déplacer la boîte vers la gauche
    transform: infoBoxStyle.transform, // Supprimez le 'translateX(-50%)' pour ne pas centrer la boîte
    zIndex: 105,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'left', // Alignez le texte à gauche
    transition: 'opacity 1s, transform 1s' // Assurez-vous d'ajouter la transition pour l'animation
  }}>
    <h2>{selectedPlanet}</h2>
    {planetDetails[selectedPlanet] && (
      <>
        <p>Type: {planetDetails[selectedPlanet].type}</p>
        <p>Taille: {planetDetails[selectedPlanet].taille}</p>
        <p>Composition: {planetDetails[selectedPlanet].composition}</p>
        <p>Masse: {planetDetails[selectedPlanet].masse}</p>
        <p>Distance: {planetDetails[selectedPlanet].distance}</p>
        <p>Apparence: {planetDetails[selectedPlanet].apparence}</p>
        <p>Orbite: {planetDetails[selectedPlanet].orbite}</p>
      </>
    )}
    <button onClick={resetView} style={{
      marginTop: '20px',
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Réinitialiser la vue
    </button>
  </div>
      )}
    </div>
  );
      }
      
  
  export default SpaceExplorer;