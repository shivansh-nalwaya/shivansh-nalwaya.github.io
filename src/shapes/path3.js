import * as THREE from "three";
import Loaders from "../loaders";
import scene from "../scene";

const map = Loaders.TextureLoader.load("/assets/images/path-texture.jpeg", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);
});
const normalMap = Loaders.TextureLoader.load("/assets/maps/normal-map.jpeg", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);
});
const displacementMap = Loaders.TextureLoader.load("/assets/maps/height-map.png", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 5);
});

const material = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  map,
  normalMap,
  displacementMap,
  displacementScale: 0.2,
});

const geometry = new THREE.PlaneGeometry(20, 100, 256, 256);

const path = new THREE.Mesh(geometry, material);

path.receiveShadow = true;
path.rotateX(-Math.PI / 2);
path.position.setY(0.1);
path.position.setZ(0);
path.position.setX(-110);

scene.add(path);

export default path;
