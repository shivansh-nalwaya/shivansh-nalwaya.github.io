import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.setZ(80);
camera.position.setY(10);

export default camera;
