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
        const planetNames = ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune", "Pluton"];
        const planetSpeeds = {"Mercure": 4.74, "Vénus": 3.5, "Terre": 2.98, "Mars": 2.41, "Jupiter": 1.31, "Saturne": 0.97, "Uranus": 0.68, "Neptune": 0.54, "Pluton": 0.47};
        const planetDiameters = {
            "Mercure": 4879,
            "Vénus": 12104,
            "Terre": 12742,
            "Mars": 6779,
            "Jupiter": 139820,
            "Saturne": 116460,
            "Uranus": 50724,
            "Neptune": 49244,
            "Pluton": 2376, // Pour l'exemple
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
      animate();
  
      return () => {
        mountRef.current.removeChild(renderer.domElement);
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
  </div>
);
    }
    

export default SpaceExplorer;