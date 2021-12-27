import * as THREE from "three";
import scene from "../scene";

const material = new THREE.MeshStandardMaterial({
  color: 0x787a12,
});

const geometry = new THREE.PlaneGeometry(20, 50);

const path = new THREE.Mesh(geometry, material);

path.receiveShadow = true;
path.rotateX(-Math.PI / 2);
path.position.setY(0.1);
path.position.setZ(75);

scene.add(path);

export default path;
