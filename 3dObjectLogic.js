import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Create a Three.JS Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;
let isHovered = true;
const originalRotationSpeed = 0.01; // Original rotation speed
let rotationSpeed = 0.01; // Initial rotation speed

const objToRender = 'TP Website logo';
const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    object.scale.set(20, 23, 20);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(100, 150);
document.getElementById('3DObject').appendChild(renderer.domElement);

camera.position.z = 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'dino' ? 5 : 1);
scene.add(ambientLight);

document.getElementById('3DObject').addEventListener('mouseenter', function () {
  isHovered = true;
});

document.getElementById('3DObject').addEventListener('mouseleave', function () {
  isHovered = false;
});

function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === 'TP Website logo') {
    if (isHovered) {
      // Gradually increase rotation speed when hovered
      rotationSpeed = THREE.MathUtils.lerp(rotationSpeed, 0.55, 0.2); // Adjust the lerp factor
      isHovered = false;
    } else {
      // Gradually slow down to original speed when not hovered
      rotationSpeed = THREE.MathUtils.lerp(rotationSpeed, originalRotationSpeed, 0.05); // Adjust the lerp factor
    }

    // Apply the rotation
    object.rotation.y += rotationSpeed;
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

animate();
