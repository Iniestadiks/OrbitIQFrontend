import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

function SpaceExplorer() {
  const mountRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);
  // Ajout d'un nouvel état pour stocker les informations des diamètres
  const [diametersInfo, setDiametersInfo] = useState([]);
  const [rotationSpeed, setRotationSpeed] = useState(1); // Pour la vitesse de rotation
  const [diameterScale, setDiameterScale] = useState(1); // Pour l'échelle des diamètres
  const [selectedPlanet, setSelectedPlanet] = useState(null);
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

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(lensflareImgPath, (texture) => {
      const lensflare = new Lensflare();
      lensflare.addElement(new LensflareElement(texture, 700, 0));
      sun.add(lensflare);
    });

    camera.position.set(0, 0, 150);
    new OrbitControls(camera, renderer.domElement);

      const planetInfo = [];
      const loader = new FontLoader();
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

        planetNames.forEach((name, index) => {
          const radius = 20 + index * 5;
          const angle = Math.random() * Math.PI * 2; // Angle initial aléatoire pour chaque planète
          const orbitSpeed = planetSpeeds[name] * 0.0001;
        
        const points = [];
        for (let i = 0; i <= 360; i += 1) {
          const radians = THREE.MathUtils.degToRad(i);
          points.push(new THREE.Vector3(Math.cos(radians) * radius, Math.sin(radians) * radius, 0));
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa })));

        const textGeometry = new TextGeometry(name, { font, size: 3, height: 0.1 });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        scene.add(textMesh);
      
        const scale = (planetDiameters[name] / 12742) * 0.1; // Ajustez cette échelle au besoin
        const planetGeometry = new THREE.SphereGeometry(scale, 32, 32);
        const planetMaterial = new THREE.MeshBasicMaterial({ color: THREE.MathUtils.randInt(0x555555, 0xffffff) });
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        // Lors de la création de chaque planète et texte
        planetMesh.name = `Planet_${name}`;
    textMesh.name = `Text_${name}`;
        planetMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        scene.add(planetMesh);
      
        // Affichage du diamètre de la planète dans la console (cela sera exécuté une seule fois)
        console.log(`${name}: Diamètre = ${planetDiameters[name]} km`);
      
        planetInfo.push({
          textMesh,
          planetMesh,
          radius,
          angle,
          speed: orbitSpeed, // Assurez-vous que cette vitesse est ajustée selon votre logique
        });
      
        // Ajout de l'info de diamètre pour l'affichage UI
        const diameterInfo = `${name}: Diamètre = ${planetDiameters[name]} km`;
        diametersArray.push(diameterInfo);
      });
        // Mise à jour de l'état avec les informations des diamètres
        setDiametersInfo(diametersArray);
      });
        

  
      // la fonction d'animation pour utiliser rotationSpeed et diameterScale
  const animate = () => {
    requestAnimationFrame(animate);
    // Utilisation de rotationSpeed pour ajuster la vitesse de rotation
    sun.rotation.y += 0.004 * rotationSpeed;
    planetInfo.forEach(planet => {
        if (isAnimating) {
          planet.angle += planet.speed * rotationSpeed;
          const x = Math.cos(planet.angle) * planet.radius;
          const y = Math.sin(planet.angle) * planet.radius;
          planet.textMesh.position.set(x, y, 0);
          planet.planetMesh.position.set(x, y, 0);
        }
        planet.planetMesh.scale.set(diameterScale, diameterScale, diameterScale); // Ajustement de l'échelle en fonction de diameterScale
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
    
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.name.startsWith('Planet_') || object.name.startsWith('Text_')) {
          const planetName = object.name.replace('Planet_', '').replace('Text_', '');
          setSelectedPlanet(planetName);
          break;
        }
      }
    }
  window.addEventListener('click', onMouseClick);

      animate();
  
      return () => {
        mountRef.current.removeChild(renderer.domElement);
        window.removeEventListener('click', onMouseClick);
      };
    }, [isAnimating, rotationSpeed, diameterScale]); // Ajoutez `rotationSpeed` et `diameterScale` aux dépendances

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
    {/* Affichage des informations des diamètres */}
    <div style={{ position: "absolute", top: 50, left: 20, zIndex: 100, color: "white" }}>
      {diametersInfo.map((info, index) => (
        <p key={index}>{info}</p>
      ))}
    </div>
    {/* Nouvelle section pour les informations détaillées de la planète sélectionnée */}
    {selectedPlanet && (
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 105, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', width: '300px', textAlign: 'center' }}>
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
      </div>
    )}
  </div>
);
    }
    

export default SpaceExplorer;

