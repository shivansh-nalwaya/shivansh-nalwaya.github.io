import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.setZ(0);
camera.position.setY(525);

export default camera;
