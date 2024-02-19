import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

function SpaceExplorer() {
  const mountRef = useRef(null);

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
    const sunGeometry = new THREE.SphereGeometry(10, 32, 32); // Augmentation de la taille du soleil
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffa500, // Couleur orange pour le soleil
      emissive: 0xffa500, // Emissive imite la luminosité du matériau
      shininess: 100 // Augmente la brillance pour un effet plus lumineux
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Ajout d'une lumière pour accentuer l'effet lumineux du soleil
    const sunlight = new THREE.PointLight(0xffd700, 5, 1000); // Augmentation de l'intensité et de la portée
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    // Ajout de LensFlare pour un effet de lumière plus dramatique
    const lensflareImgPath = `${process.env.PUBLIC_URL}/images/lensflare.png`;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(lensflareImgPath, (texture) => {
      const lensflare = new Lensflare();
      lensflare.addElement(new LensflareElement(texture, 700, 0));
      sun.add(lensflare); // Attachement du Lensflare au soleil pour qu'il suive la rotation
    });

    camera.position.set(0, 0, 150); // Ajustement de la position de la caméra
    new OrbitControls(camera, renderer.domElement);

    // Création des orbites, des textes, et des petits globes pour chaque planète
    const planetInfo = [];
    const loader = new FontLoader();
    const planetNames = ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune", "Pluton"];
    loader.load('fonts/Sixty_Regular.json', (font) => {
      planetNames.forEach((name, index) => {
        const radius = 20 + index * 5;
        // Création des orbites
        const points = [];
        for (let i = 0; i <= 360; i += 1) {
          const radians = THREE.MathUtils.degToRad(i);
          points.push(new THREE.Vector3(Math.cos(radians) * radius, Math.sin(radians) * radius, 0));
        }
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        scene.add(new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({ color: 0xaaaaaa })));

        // Ajout des textes pour les noms des planètes
        const textGeometry = new TextGeometry(name, { font, size: 3, height: 0.1 });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(radius + 2, 0, 0); // Ajustez selon l'orbite
        scene.add(textMesh);

        // Ajout des petits globes pour chaque planète
        const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Taille réduite pour les planètes
        const planetMaterial = new THREE.MeshBasicMaterial({ color: THREE.MathUtils.randInt(0x555555, 0xffffff) });
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        planetMesh.position.set(radius, 0, 0);
        scene.add(planetMesh);

        // Stockage des informations pour l'animation
        planetInfo.push({ textMesh, planetMesh, radius, angle: 0, speed: 0.02 - index * 0.002 });
      });
    });

    // Animation des planètes et de leurs noms
    function animate() {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.004; // Rotation du soleil
      planetInfo.forEach((planet) => {
        planet.angle += planet.speed;
        const x = Math.cos(planet.angle) * planet.radius;
        const y = Math.sin(planet.angle) * planet.radius;
        planet.textMesh.position.set(x, y, 0);
        planet.planetMesh.position.set(x, y, 0); // Déplacement avec le même angle que le texte
      });
      renderer.render(scene, camera);
    }
    animate();

    return () => mountRef.current && mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default SpaceExplorer;