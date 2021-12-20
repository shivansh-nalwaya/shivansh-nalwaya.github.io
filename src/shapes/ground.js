import * as THREE from "three";
import Loaders from "../loaders";
import scene from "../scene";

const geometry = new THREE.PlaneGeometry(400, 200);

var map = Loaders.TextureLoader.load("/assets/images/grass-texture.jpeg", function (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
});

const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map, color: 0x454545 });

const Ground = new THREE.Mesh(geometry, material);
Ground.rotateX(-Math.PI / 2);
Ground.receiveShadow = true;

scene.add(Ground);

export default Ground;
