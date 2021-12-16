import * as THREE from "three";
import Loaders from "./loaders";

const scene = new THREE.Scene();

scene.background = Loaders.TextureLoader.load("/assets/images/sky-bg.jpeg");
scene.fog = new THREE.Fog(0xa0a0a0, 0, 200);

export default scene;
