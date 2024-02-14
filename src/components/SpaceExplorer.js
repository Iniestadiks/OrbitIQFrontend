import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

function SpaceExplorer() {
  const mountRef = useRef(null);
  const sunRef = useRef(); // Création d'une référence pour le Soleil

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Fond étoilé
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

    // Soleil
     // Soleil
     const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
     const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
     const sun = new THREE.Mesh(sunGeometry, sunMaterial);
     sunRef.current = sun; // Stocker le mesh du Soleil dans la référence
     scene.add(sunRef.current);
    
    camera.position.z = 100;
    new OrbitControls(camera, renderer.domElement);

    // Orbites et textes des planètes
    const planetTexts = [];
    const loader = new FontLoader();
    ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune", "Pluton"].forEach((name, index) => {
      const radius = 20 + index * 5;
      const points = [];
      for (let i = 0; i <= 360; i += 1) {
        const radians = THREE.MathUtils.degToRad(i);
        points.push(new THREE.Vector3(Math.cos(radians) * radius, Math.sin(radians) * radius, 0));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      scene.add(new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({ color: THREE.MathUtils.randInt(0x555555, 0xffffff) })));

      loader.load('fonts/Sixty_Regular.json', (font) => {
        const textGeometry = new TextGeometry(name, { font, size: 1, height: 0.1 });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        const angle = Math.random() * Math.PI * 2;
        textMesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        scene.add(textMesh);
        planetTexts.push({ mesh: textMesh, radius, angle: 0, speed: 0.02 - index * 0.002 });
      });
    });

    function animate() {
        requestAnimationFrame(animate);
      
       // Utiliser la référence pour la rotation du Soleil
      if (sunRef.current) {
        sunRef.current.rotation.y += 0.00;
        sunRef.current.rotation.x += 0.;
        sunRef.current.rotation.z += 0.30;
      }
      
        // Rotation des noms des planètes autour du Soleil
        planetTexts.forEach((planet) => {
          planet.angle += planet.speed;
          planet.mesh.position.x = Math.cos(planet.angle) * planet.radius;
          planet.mesh.position.y = Math.sin(planet.angle) * planet.radius;
        });
      
        renderer.render(scene, camera);
      }
      
      animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default SpaceExplorer;