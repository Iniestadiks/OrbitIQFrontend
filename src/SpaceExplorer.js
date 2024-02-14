import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SpaceExplorer() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scène, caméra, et renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Contrôles de la caméra
    const controls = new OrbitControls(camera, renderer.domElement);

    // Lumière
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Planètes
    const planets = [
      { name: 'Mars', color: 0xff5733, radius: 2, distance: 5 },
      { name: 'Jupiter', color: 0xa569bd, radius: 3.5, distance: 10 },
      { name: 'Saturne', color: 0xf7dc6f, radius: 3, distance: 15 },
    ];

    planets.forEach((planet, index) => {
      const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: planet.color });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = planet.distance * Math.cos(index * 2 * Math.PI / planets.length);
      sphere.position.z = planet.distance * Math.sin(index * 2 * Math.PI / planets.length);
      scene.add(sphere);

      // Texte
      const loader = new THREE.FontLoader();
      loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new THREE.TextGeometry(planet.name, {
          font: font,
          size: 0.5,
          height: 0.1,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.copy(sphere.position);
        mesh.position.y += 2;
        scene.add(mesh);
      });
    });

    camera.position.z = 30;

    // Animation
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default SpaceExplorer;